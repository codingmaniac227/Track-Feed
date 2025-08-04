import { Todo } from '../models/todo'


/**
* Create a new Todo item
* @param {string} title - short description of the task
* @param {string} description - details about the task
* @param {string} dueDate - date string (YYYY-MM-DD)
* @param {string} priority - low, medium, or high
* @returns {Todo} - returns a new Todo instance
*/ 
export function createTodo(title, description, dueDate, priority = 'low') {
    const newTodo = new Todo(title, description, dueDate, priority) // Returns a new instance of a todo to be exported
    return newTodo
}



/** 
 * Toggle the completed state of a Todo by its ID
 * @param {string} todoId - the unique ID of the Todo to toggle
 * @param {Array} todoList - the array of the todo instances to search through
*/
export function toggleComplete(todoId, todoList) {
    const todo = todoList.find(todo => todo.id === todoId)
    if (todo) {
        todo.toggleComplete()
    }
}



/**
 * Edit an existing Todo (title, description, due date, priority)
 * @param {Todo} todo - the Todo instance to toggle
 * @param {Object} updates - { title?, description?, dueDate?, priority? }
 */
export function editTodo(todo, updates) {
    if (!(todo instanceof Todo)) {
        throw new Error('Only Todo instances can be edited')
    }

    if (updates.title) todo.title = updates.title
    if (updates.description) todo.description = updates.description
    if (updates.dueDate) todo.dueDate = updates.dueDate
    if (updates.priority) todo.priority = updates.priority
}



/**
 * Delete a Todo by its ID from the provided list
 * @param {string} todoId - the unique ID of the Todo to delete
 * @param {Array} todoList - the array of the Todo instances to remove from
 */
export function deleteTodo(todoId, todoList) {
    const index = todoList.findIndex(todo => todo.id === todoId)
    if (index > -1) {
        todoList.splice(index, 1)
    }
}

export const todoController = {
    createTodo,
    deleteTodo,
    toggleComplete,
    editTodo
}
