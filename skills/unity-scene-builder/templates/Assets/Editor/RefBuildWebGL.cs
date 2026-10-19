#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.Build.Reporting;
using UnityEngine;

// Menu: REF > Build WebGL. Verify the PlayerSettings names against your Unity version.
public static class RefBuildWebGL
{
    [MenuItem("REF/Build WebGL")]
    public static void Build()
    {
        PlayerSettings.WebGL.compressionFormat = WebGLCompressionFormat.Brotli;
        PlayerSettings.WebGL.decompressionFallback = true; // works without special server headers, but is slower
        var options = new BuildPlayerOptions
        {
            scenes = new[] { "Assets/Scenes/Showcase.unity" },
            locationPathName = "Builds/WebGL",
            target = BuildTarget.WebGL,
            options = BuildOptions.None
        };
        BuildReport report = BuildPipeline.BuildPlayer(options);
        Debug.Log("[REF] WebGL build: " + report.summary.result + ", size " + (report.summary.totalSize / 1048576) + " MB");
    }
}
#endif
