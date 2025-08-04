export class Todo {
    id: string
    title: string
    description: string
    dueDate: Date
    priority: 'low' | 'medium' | 'high'
    completed: boolean
        
    constructor(
        title: string,
        description: string,
        dueDate: Date,
        priority: 'low' | 'medium' | 'high' = 'low',
        completed: boolean = false
    ) {
        this.id = crypto.randomUUID()
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.completed = completed
    }

    toggleComplete(): void {
        this.completed = !this.completed
    }
}