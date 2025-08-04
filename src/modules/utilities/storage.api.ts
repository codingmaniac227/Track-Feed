import { Project } from '../models/project'
import { Todo } from '../models/todo'

const API_URL = import.meta.env.VITE_API_URL // Swapped from JSON to Express

// Save Data To API
export async function saveData(projects: Project[], todos: Todo[]): Promise<void> {
    // Clear API first so we don’t duplicate items
    await fetch(`${API_URL}/reset`, { method: 'DELETE' })

    // Post each project individually
    for (const project of projects) {
        await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)   // send ONE project
        })
    }

    // Post each todo individually
    for (const todo of todos) {
        await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)   // send ONE todo
        })
    }
}

// Load Data From API
export async function loadData(): Promise<{ projects: Project[], todos: Todo[] }> {
    const projectsResponse = await fetch(`${API_URL}/projects`)
    const todosResponse = await fetch(`${API_URL}/todos`)

    // Tells TS these are arrays of raw objects
    const rawProjects: any[] = await projectsResponse.json()
    const rawTodos: any[] = await todosResponse.json()

    return {
        projects: rawProjects.map((p: any) =>
            Object.assign(new Project(p.name), p)
        ),
        todos: rawTodos.map((t: any) =>
            Object.assign(
                new Todo(
                    t.title,
                    t.description || '',
                    t.dueDate ? new Date(t.dueDate) : new Date(),
                    t.priority || 'low',
                    t.completed || false
                ),
                t
            )
        )
    }
}



// Clear All Data From API
export async function clearData(): Promise<void> {
    await fetch(`${API_URL}/reset`, { method: 'DELETE' })
}
