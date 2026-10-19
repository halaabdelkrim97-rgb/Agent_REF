---
name: coding-standards
description: Coding standards and best practices for JavaScript, plus TypeScript, React and Node.js where the project already uses them. Use when writing, reviewing or refactoring code.
metadata:
  author: affaan-m
  version: '1.0'
---

# Coding Standards

Apply existing project conventions and the approved language/stack. Do not convert to TypeScript or add a framework without authorization.

- Prefer clear names and simple control flow. Explain non-obvious reasons in comments, not obvious syntax.
- Keep each module responsible for a coherent behavior. Extract shared code when repetition or independent responsibility warrants it; avoid speculative layers.
- Keep state ownership explicit; avoid hidden mutation, circular imports and new global coupling.
- Validate external inputs, handle errors deliberately and keep credentials out of client code. Preserve accessible UI states.
- Clean up timers, listeners and resources when their owner exits. Avoid unnecessary work in animation loops.
- Make focused changes; preserve other contributors' work and avoid unrelated formatting or refactors.
- Verify observable behavior and relevant failure cases with existing tools. Do not add tests that only mirror the code or repeat passing checks without a reason.

Consult only the relevant headings of [the detailed language examples](references/detailed-standards.md) when a concrete JavaScript, TypeScript, React or Node pattern is needed. The examples do not authorize dependencies or override project conventions.
