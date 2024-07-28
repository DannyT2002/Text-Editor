const butInstall = document.getElementById('buttonInstall');

// Store the deferred prompt event for later use
let deferredPrompt;

// Logic for handling the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing on mobile
  event.preventDefault();
  // Store the event so it can be triggered later
  deferredPrompt = event;
  // Make the install button visible
  butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  // Ensure the deferredPrompt is not null
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // Clear the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button after the prompt is handled
    butInstall.classList.toggle('hidden', true);
  }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Log or handle the event that the app was installed
  console.log('App was installed');
});
