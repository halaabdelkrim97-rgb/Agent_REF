#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

// One menu click builds the showcase scene from the assets YOU installed.
// Paid Asset Store assets stay in your local project and out of git.
public static class RefSceneBuilder
{
    // Edit to the prefab you installed (or leave: a placeholder is created).
    const string ProductPrefabPath = "Assets/ClientAssets/Product.prefab";
    const string SceneOut = "Assets/Scenes/Showcase.unity";

    [MenuItem("REF/Build Showcase Scene")]
    public static void Build()
    {
        var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

        // Ambient + one soft key light (add a rim light and baked lighting after the blockout reads well)
        RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Trilight;
        RenderSettings.ambientSkyColor = new Color(0.62f, 0.72f, 0.85f);
        RenderSettings.ambientEquatorColor = new Color(0.30f, 0.34f, 0.40f);
        RenderSettings.ambientGroundColor = new Color(0.10f, 0.11f, 0.14f);
        var lightGo = new GameObject("Key Light");
        var light = lightGo.AddComponent<Light>();
        light.type = LightType.Directional; light.intensity = 1.2f; light.shadows = LightShadows.Soft;
        lightGo.transform.rotation = Quaternion.Euler(50f, -30f, 0f);

        // Ground
        var ground = GameObject.CreatePrimitive(PrimitiveType.Plane);
        ground.name = "Ground"; ground.transform.localScale = new Vector3(3f, 1f, 3f);

        // Product: your prefab, or a placeholder so the scene always builds
        var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(ProductPrefabPath);
        GameObject product;
        if (prefab != null) product = (GameObject)PrefabUtility.InstantiatePrefab(prefab);
        else
        {
            Debug.LogWarning("[REF] Prefab not found at " + ProductPrefabPath + ". Using a placeholder cube.");
            product = GameObject.CreatePrimitive(PrimitiveType.Cube);
            product.AddComponent<PartInfo>().id = "placeholder";
        }
        product.name = "Product"; product.transform.position = new Vector3(0f, 0.5f, 0f);
        var controller = product.AddComponent<ProductController>();
        controller.spinner = product.transform; // point this at the real moving part

        // Camera with orbit controls
        var camGo = new GameObject("Main Camera") { tag = "MainCamera" };
        var cam = camGo.AddComponent<Camera>();
        cam.fieldOfView = 40f; cam.clearFlags = CameraClearFlags.SolidColor;
        cam.backgroundColor = new Color(0.06f, 0.10f, 0.17f);
        var orbit = camGo.AddComponent<OrbitCamera>(); orbit.target = product.transform;
        camGo.AddComponent<HotspotPicker>();

        // Bridge object for web <-> Unity messages (name must stay "WebBridge")
        new GameObject("WebBridge").AddComponent<WebBridge>();

        System.IO.Directory.CreateDirectory("Assets/Scenes");
        EditorSceneManager.SaveScene(scene, SceneOut);
        EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(SceneOut, true) };
        Debug.Log("[REF] Scene saved to " + SceneOut);
    }
}
#endif
