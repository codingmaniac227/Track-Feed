import { Todo } from '../src/modules/models/todo' // Pulls the Todo class that was written in todo.js

// First Test

test('Todo initializes with correct properties', () => { // Shows in the teminal what this test checks
    const todo = new Todo('Buy milk', 'Go to store', '2025-07-30') // Creates new instance of Todo
    expect(todo.title).toBe('Buy milk') // "I expect this.title('Buy milk') to be true when called"
    expect(todo.completed).toBe(false) // Default is False
})

// Second Test

test('Todo toggles completion status', () => {
    const todo = new Todo('Buy milk', 'Go to store', '2025-07-30')
    todo.toggleComplete() // Calls method from Todo.js and flips completed from False to True
    expect(todo.completed).toBe(true) // expects completed to be true(we just changed it from False to True earlier)
})