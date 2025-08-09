// src/modules/api/storage.api.ts
import { Project } from '../models/project'
import { Todo } from '../models/todo'

const API_URL = import.meta.env.VITE_API_URL // Swapped from JSON to Express

// Helper: ensure date is always string or null
function normalizeDate(date: Date | string | null | undefined): string | null {
  if (!date) return null
  return date instanceof Date ? date.toISOString().slice(0, 10) : date
}

// Save Data To API
export async function saveData(projects: Project[], todos: Todo[]): Promise<void> {
  // Clear API first so we don’t duplicate items
  await fetch(`${API_URL}/reset`, { method: 'DELETE' })

  // Post each project individually (Projects have no dueDate by default)
  for (const project of projects) {
    await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    })
  }

  // Post each todo individually (Todos can have dueDate)
  for (const todo of todos) {
    await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...todo,
        dueDate: normalizeDate(todo.dueDate)
      })
    })
  }
}

// Load Data From API
export async function loadData(): Promise<{ projects: Project[]; todos: Todo[] }> {
  const projectsResponse = await fetch(`${API_URL}/projects`)
  const todosResponse = await fetch(`${API_URL}/todos`)

  const rawProjects: any[] = await projectsResponse.json()
  const rawTodos: any[] = await todosResponse.json()

  return {
    projects: rawProjects.map((p: any) => Object.assign(new Project(p.name), p)),
    todos: rawTodos.map((t: any) => {
      const todo = new Todo({
        title: t.title,
        description: t.description ?? '',
        dueDate: normalizeDate(t.dueDate),
        priority: (t.priority ?? 'low') as any,
        status: t.status ?? 'todo',
        completed: !!t.completed,
        subtasks: t.subtasks ?? []
      })
      ;(todo as any).projectId = t.projectId
      return todo
    })
  }
}

// Clear All Data From API
export async function clearData(): Promise<void> {
  await fetch(`${API_URL}/reset`, { method: 'DELETE' })
}
