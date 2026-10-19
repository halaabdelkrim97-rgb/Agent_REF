using UnityEngine;

// Simulation model: input -> motor speed with first-order lag -> moving part.
// Replace the model with the product's real behavior. Inputs change the model, the model drives the meshes.
public class ProductController : MonoBehaviour
{
    public static ProductController Instance;
    public Transform spinner;
    public Vector3 spinAxis = Vector3.up;
    public float maxRpm = 1200f, tau = 0.8f;
    float rpm, speed = 0.5f; bool on;

    public float Rpm { get { return rpm; } }
    void Awake() { Instance = this; }
    public void SetSpeed(float v) { speed = Mathf.Clamp01(v); }
    public void SetPower(bool v) { on = v; }

    void FixedUpdate()
    {
        float dt = Time.fixedDeltaTime;
        float target = on ? speed * maxRpm : 0f;
        rpm += (target - rpm) * (1f - Mathf.Exp(-dt / tau));
        if (spinner != null) spinner.Rotate(spinAxis, rpm * 6f * dt, Space.Self); // rpm * 360 / 60 degrees per second
    }
}
