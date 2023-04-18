// check if the browser supports the Web Push API - SERVICE EXAMPLE

if ("serviceWorker" in navigator && "PushManager" in window) {
  // register the service worker
  navigator.serviceWorker
    .register("../service-worker.js")
    .then(function (registration) {
      // subscribe to the push service
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("YOUR_PUBLIC_KEY_HERE"),
      });
    })
    .then(function (subscription) {
      console.log("Subscribed to push notifications:", subscription);

      // send a test push notification
      fetch("/send-push-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: subscription,
        }),
      });
    })
    .catch(function (error) {
      console.error("Service worker registration failed:", error);
    });
}

// utility function to convert a base64 string to a Uint8Array
function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);
  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
