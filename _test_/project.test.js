import { Todo } from '../src/modules/models/todo'
import { Project } from '../src/modules/models/project'


test('Project initializes with a name and empty todos array', () => { // Description of what's being tested
    const project = new Project('Work')
    
    expect(project.name)
        .toBe('Work') // Expects the constructor's parameter 'name' property from 'project.js' to be 'Work' from this new instance here
    expect(project.todos.length)
        .toBe(0) // Expects the 'todos' array to be empty when a Project is initialized
})



test('Project can add a Todo', () => { // Checks if adding a Todo works
    const project = new Project('Work')
    const todo = new Todo('Buy milk', 'Go to store', '2025-07-30') // Initializes a Todo instance with test values
    
    project.addTodo(todo) // Calls addTodo() function on todo and checks if todo is an instance of Todo. If true, pushes to todos array
    expect(project.todos.length).toBe(1) // Confirms that after calling addTodo() the project has now 1 todo
    expect(project.todos[0].title)
        .toBe('Buy milk') 
})



test('Project throws error if non-Todo is added', () => { // Makes sure the project rejects invalid data or random objects
    const project = new Project('Work')

    expect(() => project.addTodo('Not a todo'))
        .toThrow('Only Todo instances can be added') // Enforces data integrity
})