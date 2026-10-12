using UnityEngine;

// Put on any part that should be clickable. The part needs a Collider.
public class PartInfo : MonoBehaviour
{
    public string id = "part";
    public string title = "Part";
    [TextArea] public string description = "";
}
