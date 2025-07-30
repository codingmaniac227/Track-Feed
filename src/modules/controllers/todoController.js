import Todo from '../models/todo.js'


/**
* Create a new Todo item
* @param {string} title - short description of the task
* @param {string} description - details about the task
* @param {string} dueDate - date string (YYYY-MM-DD)
* @param {string} priority - low, medium, or high
* @returns {Todo} - returns a new Todo instance
*/ 


export function createTodo(title, description, dueDate, priority = 'low') {
    return new Todo(title, description, dueDate, priority) // Returns a new instance of a todo to be exported
}

/** 
 * Toggle the completed state of a Todo
 * @param {Todo} todo - the Todo instance to toggle
*/


export function toggleTodo(todo) {
    if (!(todo instanceof Todo)) {
        throw new Error('Only Todo instances can be toggled')
    }
    todo.toggleComplete()
}

/**
 * Edit an existing Todo (title, description, due date, priority)
 * @param {Todo} todo - the Todo instance to toggle
 * @param {Object} updates - { title?, description?, dueDate?, priority? }
 */

export function editToto(todo, updates) {
    if (!(todo instanceof Todo)) {
        throw new Error('Only Todo instances can be edited')
    }

    if (updates.title) todo.title = updates.title
    if (updates.description) todo.description = updates.description
    if (updates.dueDate) todo.dueDate = updates.dueDate
    if (updates.priority) todo.priority = updates.priority
}

/**
 * Delete a Todo from an array of Todos (just for now until I build projectController.js)
 * @param {Array} todoList - array of Todo instances
 * @param {number} index - index of Todo to remove
 */

export function deleteTodo(todoList, index) {
    todoList.splice(index, 1)
}