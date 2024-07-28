import { openDB } from 'idb';

// Initialize the IndexedDB database
const initDB = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) return;
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
    },
  });
};

// Method to save content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method to get content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  result ? console.log('🚀 - data retrieved from the database', result.content) : console.log('🚀 - data not found in the database');
  return result?.content;
};

initDB();
