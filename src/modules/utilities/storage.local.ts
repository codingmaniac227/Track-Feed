import { Project } from '../models/project'
import { Todo } from '../models/todo'


export async function saveData(projects: Project[], todos: Todo[]): Promise<void> { // noImplicityAny set to true in tsconfig.json, requiring Type Annotation
    return Promise.resolve()
        .then(() => {
            localStorage.setItem('projects,', JSON.stringify(projects))
            localStorage.setItem('todo', JSON.stringify(todos))
        })
}

export async function loadData(): Promise<{ projects: Project[], todos: Todo[] }> {
    return Promise.resolve()
        .then(() => {
            const projects = JSON.parse(localStorage.getItem('projects') || '[]')
            const todos = JSON.parse(localStorage.getItem('todos') || '[]')
            return { projects, todos }
        })
}

export async function clearData(): Promise<void> {
    return Promise.resolve()
        .then(() => {
            localStorage.clear()
        })
}


