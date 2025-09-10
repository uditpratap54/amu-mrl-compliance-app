// client/src/services/dataSync.js
// Offline-first sync stub via idb and retry queue

import { openDB } from 'idb';

const DB_NAME = 'amu_mrl_db';
const STORE_NAME = 'pendingSync';

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { autoIncrement: true });
      }
    },
  });
}

export async function queueSync(data) {
  const db = await getDB();
  await db.add(STORE_NAME, data);
}

// Dummy retry logic (should be expanded in real app)
export async function processQueue() {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  let cursor = await store.openCursor();

  while (cursor) {
    try {
      // TODO: send data to backend
      await sendDataToBackend(cursor.value);
      await cursor.delete();
    } catch {
      // Stop retrying on any error to retry later
      break;
    }
    cursor = await cursor.continue();
  }
  await tx.done;
}

async function sendDataToBackend(data) {
  // Placeholder: implement actual sync API call
}
