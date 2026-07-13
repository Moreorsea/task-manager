import { openDB } from 'idb'

const dbPromise = openDB('offlineQueue', 1, {
  upgrade(db) {
    db.createObjectStore('requests', { autoIncrement: true })
  }
})

export const saveRequest = async (request) => {
  const db = await dbPromise
  await db.add('requests', {
    ...request,
    timestamp: Date.now()
  })
}

export const getPendingRequests = async () => {
  const db = await dbPromise
  return db.getAll('requests')
}