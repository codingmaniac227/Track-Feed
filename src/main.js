console.log('VITE FILE CHECK:', import.meta.glob('./views/*'));



// Import the domController from the views folder
import  { domController } from './modules/views/domController.js';

import { todoView } from './modules/views/todoView.js'
import { todos } from './modules/controllers/todoController.js'

// Initialize the app (attach events, load data, render UI)
domController.init();

const filterSelect = document.getElementById('filter-select')
const sortSelect = document.getElementById('sort-select')

if (filterSelect && sortSelect) {
    filterSelect.addEventListener('change', renderFilteredTodos)
    sortSelect.addEventListener('change', renderFilteredTodos)
}

function renderFilteredTodos() {
    let filtered = [...todos] // Pull live state from controller

    const filter = filterSelect.value
    if (filter === 'completed') {
        filtered = filtered.filter(todo => todo.completed)
    } else if (filter === 'incomplete') {
        filtered = filtered.filter(todo => !todo.completed)
    }

    const sort = sortSelect.value
    if (sort === 'alpha') {
        filtered.sort((a, b) => a.title.localCompare(b.title))
    } else if (sort === 'completed') {
        filtered.sort((a, b) => b.completed - a.completed)
    }

    todoView.render(filtered)
}


window.addEventListener('DOMContentLoaded', () => {
    renderFilteredTodos()
})