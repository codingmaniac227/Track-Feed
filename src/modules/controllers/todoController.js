import { Todo } from '../models/todo'

export function toggleTodo(todoId, todoList) {
  if (!Array.isArray(todoList)) {
    throw new Error('Invalid todo list')
  }
  if (!todoList.every(t => t instanceof Todo)) {
    throw new Error('Only Todo instances can be toggled')
  }
  const todo = todoList.find(t => t.id === todoId)
  if (todo) {
    todo.toggleComplete()
  }
}

export function editTodo(todoId, todoList, updates) {
  if (!Array.isArray(todoList)) {
    throw new Error('Invalid todo list')
  }
  const todo = todoList.find(t => t.id === todoId)
  if (!todo) throw new Error('Todo not found')
  Object.assign(todo, updates)
}

export function deleteTodo(todoId, todoList) {
  if (!Array.isArray(todoList)) {
    throw new Error('Invalid todo list')
  }
  const index = todoList.findIndex(t => t.id === todoId)
  if (index > -1) {
    todoList.splice(index, 1)
  }
}
