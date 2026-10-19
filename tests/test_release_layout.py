"""Release checks for Forge's distributed paths and packaging."""

import importlib.util
import json
import re
import tempfile
import unittest
import zipfile
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent.parent


class ReleaseLayoutTests(unittest.TestCase):
    def test_manifest_versions_and_skill_directory(self):
        plugin = json.loads((ROOT / '.claude-plugin/plugin.json').read_text(encoding='utf-8'))
        marketplace = json.loads((ROOT / '.claude-plugin/marketplace.json').read_text(encoding='utf-8'))
        agent = (ROOT / 'agent/forge.md').read_text(encoding='utf-8')
        version = re.search(r'Agent version: v([\d.]+)', agent).group(1)
        self.assertEqual(plugin['version'], version)
        self.assertEqual(marketplace['plugins'][0]['version'], version)
        self.assertTrue((ROOT / plugin['skills']).is_dir())
        self.assertFalse((ROOT / 'REF').exists())

    def test_plugin_command_resources_exist(self):
        for command in (ROOT / 'commands').glob('*.md'):
            content = command.read_text(encoding='utf-8')
            for target in re.findall(r'\$\{CLAUDE_PLUGIN_ROOT\}/([\w./-]+)', content):
                self.assertTrue((ROOT / target).exists(), f'{command.name}: {target}')

    def test_skill_entry_points_do_not_use_removed_project_paths(self):
        obsolete = ('REF/CONTEXT/', 'REF/SKILLS/', 'REF/TEMPLATES/', '../../TEMPLATES/')
        for document in (ROOT / 'skills').glob('*/SKILL.md'):
            content = document.read_text(encoding='utf-8')
            for path in obsolete:
                self.assertNotIn(path, content, f'{document.relative_to(ROOT)}: {path}')

    def test_readme_relative_links_exist(self):
        readme = (ROOT / 'README.md').read_text(encoding='utf-8')
        for target in re.findall(r'\]\(([^)]+)\)', readme):
            url = urlsplit(target.strip())
            if url.scheme or url.netloc or not url.path:
                continue
            self.assertTrue((ROOT / unquote(url.path)).exists(), target)

    def test_active_document_relative_links_exist(self):
        roots = ('agent', 'commands', 'templates', 'skills', 'docs')
        for folder in roots:
            for document in (ROOT / folder).rglob('*.md'):
                content = document.read_text(encoding='utf-8')
                # Archived source text retains its original path base and is
                # explicitly labeled historical in its own header.
                if content.startswith('# Optional historical reference'):
                    continue
                content = re.sub(r'(?ms)^```.*?^```[^\n]*', '', content)
                for target in re.findall(r'(?<!!)\[[^\]]+\]\(([^)]+)\)', content):
                    target = target.strip().split()[0] if target.strip() else ''
                    url = urlsplit(target)
                    if (not url.path or url.scheme or url.netloc or
                            url.path.startswith('/') or any(c in url.path for c in '{}<>$')):
                        continue
                    self.assertTrue((document.parent / unquote(url.path)).exists(),
                                    f'{document.relative_to(ROOT)}: {target}')

    def test_skill_package_contains_new_instructions(self):
        spec = importlib.util.spec_from_file_location('package_skills', ROOT / 'scripts/package_skills.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        self.assertEqual(module.SKILLS_DIR, ROOT / 'skills')
        with tempfile.TemporaryDirectory() as temporary:
            module.OUT_DIR = Path(temporary)
            archive = module.build_zip(ROOT / 'skills/doc-writer')
            with zipfile.ZipFile(archive) as zipped:
                text = zipped.read('doc-writer/SKILL.md').decode('utf-8')
                self.assertIn('docs/source-of-truth/', text)
                self.assertIn('docs/plans/', text)


if __name__ == '__main__':
    unittest.main()
