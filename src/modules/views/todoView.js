export const todoView = {
    render(todos) { // Render todos that are from the controller
        const todoList = document.querySelector('#todo-list')
        if (!todoList) return 
            todoList.innerHTML = '' // Clear previous todos

            todos.forEach(todo => {
                const li = document.createElement('li')
                li.textContent = todo.title
                if (todo.completed) {
                    li.classList.add('completed')
                }
                todoList.appendChild(li)
            })
    }
}