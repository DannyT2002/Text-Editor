import { getDb, putDb } from './database';

// Get the editor element
const editor = document.querySelector('#editor');

// Save content to IndexedDB when the DOM window is unfocused
window.addEventListener('blur', async () => {
  const content = editor.value;
  await putDb(content);
});

// Load content from IndexedDB when the editor is opened
window.addEventListener('load', async () => {
  const content = await getDb();
  if (content) {
    editor.value = content;
  }
});
