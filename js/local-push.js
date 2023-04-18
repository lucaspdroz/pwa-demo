document.addEventListener("DOMContentLoaded", () => {
  const callPush = document.querySelector("#callPush-btn");

  callPush.addEventListener("click", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification("Vamos gritar Uhuu!🎊", {
          body: "Por uma vida com mais Uhuu! \n 🥳🥳🥳🎊",
          icon: "../images/favicon-192x192px.png",
          data: {
            url: "https://www.google.com",
          },
        });
      });
    }
  });
});
