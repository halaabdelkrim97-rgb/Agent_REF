using System.Runtime.InteropServices;
using UnityEngine;

// Keep this object named "WebBridge". The page calls, for example:
//   unityInstance.SendMessage("WebBridge", "SetSpeed", 0.6)
//   unityInstance.SendMessage("WebBridge", "SetPower", 1)
public class WebBridge : MonoBehaviour
{
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")] static extern void RefSendEvent(string name, string payload);
#endif

    public static void Send(string name, string payload)
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        RefSendEvent(name, payload);
#else
        Debug.Log("[WebBridge] " + name + ": " + payload);
#endif
    }

    public void SetSpeed(float v) { if (ProductController.Instance != null) ProductController.Instance.SetSpeed(v); }
    public void SetPower(int on) { if (ProductController.Instance != null) ProductController.Instance.SetPower(on != 0); }
}
