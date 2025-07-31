import {
    createProject,
    addTodoToProject,
    removeTodoFromProject,
    renameProject,
    deleteProject
} from '../src/modules/controllers/projectController.js'


import Project from '../src/modules/models/project.js'
import Todo from '../src/modules/models/todo.js'


describe('ProjectController', () => { // groups related tests together
    test('createProject should return a valid Project instance', () => { 
        const project = createProject('Work') // Creates Project
        expect(project).toBeInstanceOf(Project) // Expects this to be a Project instance

        expect(project.name).toBe('Work') // Expects the Project's name to be correct
        expect(Array.isArray(project.todos)).toBe(true) // Expects todos property to be an array
        expect(project.todos.length).toBe(0) // Expects new project start empty on initialization
    })

    test('addTodoToProject should add a Todo to the project', () => {
        const project = createProject('Work') // Creates Project instance
        const todo = new Todo('Task 1', 'Desc', '2025-07-30') // Creates Todo instance

        addTodoToProject(project, todo) // Adds a todo to a project using controller function

        // Expects the length to become 1 after adding a todo and 
        expect(project.todos.length).toBe(1)
        expect(project.todos[0].title).toBe('Task 1')
    })

    test('addTodoToProject should throw if non-Todo is passed', () => {
        const project = createProject('Work') // Creates Project

        expect(() => addTodoToProject(project, 'notATodo')).toThrow('Only Todo instances can be added') // Expects non projects to throw an error
    })

    test('removeTodoFromProject should remove correct Todo', () => {
        const project = createProject('Work') // Creates Project

        // Initializes two new todos
        const todo1 = new Todo('Task 1', 'Desc', '2025-07-30') 
        const todo2 = new Todo('Task 2', 'Desc', '2025-07-30')
        addTodoToProject(project, todo1)
        addTodoToProject(project, todo2)

        removeTodoFromProject(project, 0) // Removes project at first index
        
        expect(project.todos.length).toBe(1) // Expects after the removal for the todos array to only have one element left('Task 2')
        expect(project.todos[0].title).toBe('Task 2') // Expects remaining element to be 'Task 2'
    })

    test('renameProject should update project name', () => {
        const project = createProject('Old Name') // Creates Project

        renameProject(project, 'New Name') // Renames Project to 'New Name'
        expect(project.name).toBe('New Name') // Expects the name switch to validate
    })

    test('deleteProject should remove project from project list', () => {
        const projectList = [
            createProject('Work'),
            createProject('Personal')
        ]

        deleteProject(projectList, 0) // Deletes Project at the 0 index

        // Expects there to be only 1 remaining Project after deletion, and the name of the 0 index's Project is the then, 1 index 'Personal'
        expect(projectList.length).toBe(1)
        expect(projectList[0].name).toBe('Personal')
    })

})