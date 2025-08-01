import { todoController } from '../controllers/todoController'
import { projectController } from '../controllers/projectController'
import { todoView } from './todoView'
import { projectView } from './projectView'

export const allProjects = []
export const allTodos = []

export const domController = {
  init() {
    projectView.render(projectController.getAllProjects())
    todoView.render(allTodos)
    this.bindEvents()
  },

  bindEvents() {
    // Add Project
    document.querySelector('#add-project-btn')?.addEventListener('click', () => {
      const projectName = prompt('Project name:')
      if (projectName) {
        const newProject = projectController.createProject(projectName)
        allProjects.push(newProject)
        projectView.render(allProjects)
      }
    })

    // Delete project
    document.querySelector('#project-list')?.addEventListener('click', (e) => {
        const target = e.target
        if (target instanceof HTMLButtonElement && target.classList.contains('delete-project-btn')) {
            const projectId = target.dataset.projectId
            if (projectId) {
            projectController.deleteProject(allProjects, projectId)
            projectView.render(allProjects)
        }
      }
    })

    // Complete project
    document.querySelector('#project-list')?.addEventListener('click', (e) => {
        const target = e.target
        if (target instanceof HTMLButtonElement && target.classList.contains('complete-project-btn')) {
            const projectId = target.dataset.projectId
            if (projectId) {
                projectController.completeProject(allProjects, projectId)
                projectView.render(allProjects)
            } 
        }
    })

    // Add Todo
    document.querySelector('#add-todo-btn')?.addEventListener('click', (e) => {
        const todoTitle = prompt('Todo title:')
        if (todoTitle) {
            const newTodo = todoController.createTodo(todoTitle)
            allTodos.push(newTodo) // Pushes the todo into an array 
            todoView.render(allTodos)
        }
    })

    // Delete Todo
    document.querySelector('#todo-list')?.addEventListener('click', (e) => {
        const target = e.target
        if (target instanceof HTMLButtonElement && target.classList.contains('delete-todo-btn')) {
            const todoId = target.dataset.todoId
            if (todoId) {
                todoController.deleteTodo(todoId, allTodos)
                todoView.render(allTodos)
            }
        }
    })

    // Complete Todo
    document.querySelector('#todo-list')?.addEventListener('click', (e) => {
        const target = e.target
        if (target instanceof HTMLButtonElement && target.classList.contains('complete-todo-btn')) {
            const todoId = target.dataset.todoId
            if (todoId) {
                todoController.toggleComplete(todoId, allTodos)
                todoView.render(allTodos)
            }
        }
    })
  }
}   
