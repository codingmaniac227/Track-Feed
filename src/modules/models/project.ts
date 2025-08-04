import { Todo } from './todo'

export class Project {
    id: string
    name: string
    todos: Todo[]
    completed: boolean

    constructor(name: string) {
        this.id = crypto.randomUUID()
        this.name = name
        this.todos = []
        this.completed = false
    }


    addTodo(todo: Todo) {
        if (todo instanceof Todo) {
            this.todos.push(todo)
        } else {
            throw new Error('Only Todo instances can be added')
        }
    }

    removeTodo(index: number): void {
        this.todos.splice(index, 1)
    }

    toggleComplete(): void {
        this.completed = !this.completed
    }
}