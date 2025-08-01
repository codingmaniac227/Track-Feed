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
    // Add Project
    document.querySelector('#add-project-btn')?.addEventListener('click', () => {
      const projectName = prompt('Project name:')
      if (projectName) {
        projectController.createProject(projectName)
        projectView.render(projectController.getAllProjects())
      }
    })

    // Delete project
    document.querySelector('#project-list')?.addEventListener('click', (e) => {
        const target = e.target
        if (target instanceof HTMLButtonElement && target.classList.contains('delete-project-btn')) {
            const projectId = target.dataset.projectId
            if (projectId) {
            projectController.deleteProject(projectId)
            projectView.render(projectController.getAllProjects())
        }
      }
    })
  }
}   
