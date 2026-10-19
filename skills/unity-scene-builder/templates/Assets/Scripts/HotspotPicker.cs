using UnityEngine;

// Click or tap (not drag) on a part with PartInfo and report it to the web page.
public class HotspotPicker : MonoBehaviour
{
    Vector2 downPos;

    void Update()
    {
        if (Input.GetMouseButtonDown(0)) downPos = Input.mousePosition;
        if (Input.GetMouseButtonUp(0) && (downPos - (Vector2)Input.mousePosition).magnitude < 6f)
        {
            var cam = Camera.main; if (cam == null) return;
            if (Physics.Raycast(cam.ScreenPointToRay(Input.mousePosition), out RaycastHit hit))
            {
                var info = hit.collider.GetComponentInParent<PartInfo>();
                if (info != null) WebBridge.Send("partClicked", info.id);
            }
        }
    }
}
