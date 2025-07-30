import Todo from './todo.js'

export default class Project {
    constructor(name) {
        this.name = name
        this.todos = []
    }


    addTodo(todo) {
        if (todo instanceof Todo) {
            this.todos.push(todo)
        } else {
            throw new Error('Only Todo instances can be added')
        }
    }

    removeTodo(index) {
        this.todos.splice(index, 1)
    }
}