
export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'doing' | 'done'
export type Subtask = {
    id: string
    title: string
    completed: boolean
}

export class Todo {
    id: string
    projectId: string
    title: string
    description: string
    dueDate: Date | null
    priority: Priority
    status: Status
    position: number
    completed: boolean
    subtasks: Subtask[]
        
    constructor({
    projectId,
    title,
    description = '',
    dueDate = null,
    priority = 'low',
    status = 'todo',
    position = 100,
    completed = false,
    subtasks = [],
  }: {
    projectId: string
    title: string
    description?: string
    dueDate?: Date | null
    priority?: Priority
    status?: Status
    position?: number
    completed?: boolean
    subtasks?: Subtask[]
  }) {
    this.id = crypto.randomUUID()
    this.projectId = projectId
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.status = status
    this.position = position
    this.completed = completed
    this.subtasks = subtasks
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
        this.completed = this.subtasks.length > 0 && this.subtasks.every(s => s.completed)
    }
}