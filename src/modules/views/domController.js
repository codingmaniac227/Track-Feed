import { todoController } from '../controllers/todoController'
import { projectController } from '../controllers/projectController'
import { todoView } from './todoView'
import { projectView } from './projectView'

export const domController = {
    init() {
        projectView.render(projectController.getAllProjects())
        todoView.render(todoController.getTodosForCurrentProject())
        this.bindEvents()
    },
    bindEvents() {
        document.querySelector('#add-todo-btn')?.addEventListener('click', () => {
            const todoTitle = prompt('Todo title:')
            if (todoTitle) {
                todoController.createTodo(todoTitle)
                todoView.render(todoController.getTodosForCurrentProject())
            }
        })
    }

}