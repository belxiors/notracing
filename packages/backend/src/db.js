import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// File path
const file = 'db.json'

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file)
const defaultData = { users: [], raceEntries: [] }
const db = new Low(adapter, defaultData)

// Read data from JSON file, this will set db.data content
await db.read()

export default db
