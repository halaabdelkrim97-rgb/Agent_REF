mergeInto(LibraryManager.library, {
  // Called from C# (WebBridge.Send). The page defines window.onUnityEvent(name, payload).
  RefSendEvent: function (namePtr, payloadPtr) {
    var name = UTF8ToString(namePtr);
    var payload = UTF8ToString(payloadPtr);
    if (typeof window.onUnityEvent === 'function') { window.onUnityEvent(name, payload); }
  }
});
