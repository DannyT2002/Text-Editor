import { openDB } from 'idb';

// Initialize the database and create an object store if it doesn't exist
const initdb = async () => {
  // Open (or create) the database
  const db = await openDB('jate', 1, {
    upgrade(db) {
      // Check if the object store already exists
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create a new object store with 'id' as the keyPath and autoIncrement set to true
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Add content to the database
export const putDb = async (content) => {
  // Open the database
  const db = await openDB('jate', 1);
  try {
    // Put the content into the database with a key of 1 (since we're using autoIncrement)
    await db.put('jate', { content, id: 1 });
    console.log('Content added to database');
  } catch (error) {
    console.error('Failed to add content to the database', error);
  }
};

// Retrieve content from the database
export const getDb = async () => {
  // Open the database
  const db = await openDB('jate', 1);
  try {
    // Get the content from the database using key 1
    const data = await db.get('jate', 1);
    // Return the content or an empty string if no data is found
    return data ? data.content : '';
  } catch (error) {
    console.error('Failed to get content from the database', error);
  }
};

// Initialize the database when the script loads
initdb();
