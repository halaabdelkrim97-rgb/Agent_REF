using UnityEngine;

// Orbit, zoom and pinch with mouse or touch. Uses the old Input Manager:
// set Project Settings > Player > Active Input Handling to "Input Manager (Old)" or "Both".
public class OrbitCamera : MonoBehaviour
{
    public Transform target;
    public float distance = 4f, minDistance = 1.5f, maxDistance = 8f;
    public float yaw = 25f, pitch = 20f, minPitch = 5f, maxPitch = 80f;
    public float damping = 12f;
    float smoothYaw, smoothPitch, smoothDistance;

    void Start() { smoothYaw = yaw; smoothPitch = pitch; smoothDistance = distance; }

    void LateUpdate()
    {
        if (target == null) return;
        if (Input.touchCount == 1 && Input.GetTouch(0).phase == TouchPhase.Moved)
        {
            Vector2 d = Input.GetTouch(0).deltaPosition; yaw += d.x * 0.2f; pitch -= d.y * 0.2f;
        }
        else if (Input.touchCount == 2)
        {
            Touch a = Input.GetTouch(0), b = Input.GetTouch(1);
            float now = (a.position - b.position).magnitude;
            float before = ((a.position - a.deltaPosition) - (b.position - b.deltaPosition)).magnitude;
            distance -= (now - before) * 0.01f;
        }
        else if (Input.GetMouseButton(0))
        {
            yaw += Input.GetAxis("Mouse X") * 3f; pitch -= Input.GetAxis("Mouse Y") * 3f;
        }
        distance -= Input.mouseScrollDelta.y * 0.3f;
        pitch = Mathf.Clamp(pitch, minPitch, maxPitch);
        distance = Mathf.Clamp(distance, minDistance, maxDistance);

        float k = 1f - Mathf.Exp(-damping * Time.deltaTime);
        smoothYaw = Mathf.LerpAngle(smoothYaw, yaw, k);
        smoothPitch = Mathf.Lerp(smoothPitch, pitch, k);
        smoothDistance = Mathf.Lerp(smoothDistance, distance, k);

        Quaternion rot = Quaternion.Euler(smoothPitch, smoothYaw, 0f);
        transform.position = target.position + rot * new Vector3(0f, 0f, -smoothDistance);
        transform.LookAt(target.position);
    }
}
