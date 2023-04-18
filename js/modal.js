// Check if the PWA has already been installed
if (!navigator.standalone) {
  // Show the install modal
  let deferredPrompt;
  const modal = document.getElementById("installModal");
  const installBtn = document.getElementById("installBtn");
  const closeBtn = document.querySelector(".close");

  // Check if the beforeinstallprompt event has already been fired
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    modal.style.display = "block";
  });

  // Open the modal if the beforeinstallprompt event has not been fired
  if (deferredPrompt) {
    modal.style.display = "block";
  }

  // Close the modal when the user clicks the close button
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Prompt the user to install the PWA when they click the install button
  installBtn.addEventListener("click", () => {
    modal.style.display = "none";
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  });
}
