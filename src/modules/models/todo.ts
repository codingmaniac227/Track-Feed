// src/modules/models/todo.ts

export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'doing' | 'done'
export type Subtask = { id: string; title: string; completed: boolean }

export class Todo {
  id: string
  projectId: string
  title: string
  description: string
  dueDate: string | null
  priority: Priority
  status: Status
  position: number
  completed: boolean
  subtasks: Subtask[]

  constructor(
    arg1:
      | string
      | {
          projectId?: string
          title: string
          description?: string
          dueDate?: Date | string | null
          priority?: Priority
          status?: Status
          position?: number
          completed?: boolean
          subtasks?: Subtask[]
        },
    description?: string,
    dueDate?: Date | string | null
  ) {
    this.id = crypto.randomUUID()

    if (typeof arg1 === 'string') {
      this.projectId = ''
      this.title = arg1
      this.description = description ?? ''
      this.dueDate =
        dueDate == null
          ? null
          : typeof dueDate === 'string'
          ? dueDate
          : new Date(dueDate).toISOString().slice(0, 10)
      this.priority = 'low'
      this.status = 'todo'
      this.position = 100
      this.completed = false
      this.subtasks = []
    } else {
      this.projectId = arg1.projectId ?? ''
      this.title = arg1.title
      this.description = arg1.description ?? ''
      this.dueDate =
        arg1.dueDate == null
          ? null
          : typeof arg1.dueDate === 'string'
          ? arg1.dueDate
          : new Date(arg1.dueDate).toISOString().slice(0, 10)
      this.priority = arg1.priority ?? 'low'
      this.status = arg1.status ?? 'todo'
      this.position = arg1.position ?? 100
      this.completed = arg1.completed ?? false
      this.subtasks = arg1.subtasks ?? []
    }
  }

  toggleComplete(): void {
    this.completed = !this.completed
  }

  addSubtask(title: string) {
    this.subtasks.push({ id: crypto.randomUUID(), title, completed: false })
  }

  removeSubtask(subtaskId: string) {
    this.subtasks = this.subtasks.filter(s => s.id !== subtaskId)
  }

  toggleSubtask(subtaskId: string) {
    const s = this.subtasks.find(s => s.id === subtaskId)
    if (s) s.completed = !s.completed
    this.completed =
      this.subtasks.length > 0 && this.subtasks.every(s => s.completed)
  }
}
