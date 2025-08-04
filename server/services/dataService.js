import fs from 'fs/promises'

const DB_FILE = './db.json'

export async function loadData() {
    try {
        const data = await fs.readFile(DB_FILE, 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        // If db.json doesn’t exist yet, return empty arrays
        return { projects: [], todos: [] }
    }
}

export async function saveData(projects, todos) {
    await fs.writeFile(DB_FILE, JSON.stringify({ projects, todos }, null, 2))
}
