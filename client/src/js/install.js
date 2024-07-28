const butInstall = document.getElementById('buttonInstall');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  butInstall.classList.toggle('hidden', false);
});

// Handle the install button click
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

// Listen for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  window.deferredPrompt = null;
});
