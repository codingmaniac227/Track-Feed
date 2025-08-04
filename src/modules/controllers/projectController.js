import { Project } from '../models/project'
import { Todo } from '../models/todo'


/**
 * Create a new Project
 * @param {string} name - The name of the todo project(e.g. "School", "Work")
 * @returns {Project} - Returns new instance of Project
 */

export function createProject(name) {
    return new Project(name)
}

/**
 * Add a Todo to a Project
 * @param {Project} project - The project instance
 * @param {Todo} todo - The Todo to add
 */

export function addTodoToProject(project, todo) {
    if (!(project instanceof Project)) {
        throw new Error('Only Project instances can be modified')
    }
    if (!(todo instanceof Todo)) {
        throw new Error('Only Todo instances can be added')
    }
    project.addTodo(todo)
}

/**
 * Remove a Todo from a Project by indexing
 * @param {Project} project - The project instance
 * @param {number} index - The index of the Todo to remove
 */

export function removeTodoFromProject(project, index) {
    if (!(project instanceof Project)) {
        throw new Error('Only Project instances can be modified')
    }
    project.removeTodo(index)
}

/**
 * Rename a Project
 * @param {Project} project - The project instance
 * @param {string} newName - New nae for the project
 */

export function renameProject(project, newName) {
    if (!(project instanceof Project)) {
        throw new Error('Only Project instances can be renamed')
    }
    project.name = newName
}

/**
 * Delete a Project from an array of Projects(helper func for now)
 * @param {Array} projectList - Array of Project instances
 * @param {number} index - Index of the project to delete
 */

export function deleteProject(projectList, index) {
    projectList.splice(index, 1)
}

/**
 * Complete a Project from an array
 * @param {Array} projectList - Array of Project instances
 * @param {number} projectId - ID of the project
 */

export function completeProject(projectList, projectId) {
    const project = projectList.find(p => p.id === projectId)
    if (project) {
        project.completed = !project.completed
    }
}

/**
 * Get all projects
 * @param {Array} projectList - array of project instances
 * @returns {Array} - returns all projects
 */
export function getAllProjects(projectList) {
    return projectList
}

export const projectController = {
    createProject,
    addTodoToProject,
    removeTodoFromProject,
    renameProject,
    deleteProject,
    completeProject,
    getAllProjects
}