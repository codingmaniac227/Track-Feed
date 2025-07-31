import {
    createTodo,
    toggleTodo,
    editTodo,
    deleteTodo
} from '../src/modules/controllers/todoController'

import { Todo } from '../src/modules/models/todo'


describe('TodoController', () => {
    
    test('create Todo should return a valid Todo instance', () => { // Test createTodo()
        const todo = createTodo('Learn Jest', 'Study testing library', '2025-07-30')

        expect(todo).toBeInstanceOf(Todo)  // Check if its a Todo object

        expect(todo.title).toBe('Learn Jest');
        expect(todo.description).toBe('Study testing library');
        expect(todo.dueDate).toBe('2025-07-30');
        expect(todo.priority).toBe('low');
        expect(todo.completed).toBe(false); // default state should be false
    })

    test('toggleTodo should flip the compeleted state', () => { // Test toggleTodo()
        const todo = createTodo('Learn Jest', 'Study testing library', '2025-07-30')

        expect(todo.completed).toBe(false) // completed is default to False

        toggleTodo(todo) // toggles once more
        expect(todo.completed).toBe(true)
    })

    test('toggleTodo should throw an error if input is not a Todo', () => { // Test error handling
        expect(() => toggleTodo('NotATodo')).toThrow('Only Todo instances can be toggled')
    })

    test('editTodo should update fields on the Todo', () => { // test
        const todo = createTodo('Learn Jest', 'Study testing library', '2025-07-30')
        editTodo(todo, { title: 'Learn Vite', priority: 'urgent' }) // Edit only title and priority

        expect(todo.title).toBe('Learn Vite')
        expect(todo.priority).toBe('urgent')

        expect(todo.description).toBe('Study testing library') // Test to check if description stays the same
    })

    test('deleteTodo should remove the correct todo from a list', () => { // Test deleteTodo()
        const todos = [
            createTodo('Task 1', 'desc1', '2025-07-30'),
            createTodo('Task 2', 'desc2', '2025-07-30'),
            createTodo('Task 3', 'desc3', '2025-07-30')
        ]

        // Deletes the first todo and expects there to only be 2 todos left(e.g. Task 2/Task3)
        deleteTodo(todos, 1)
        expect(todos.length).toBe(2) 

        expect(todos.find(todo => todo.title === 'Task 2')).toBeUndefined() // Expects Task 2 to be non-existent
    })
})