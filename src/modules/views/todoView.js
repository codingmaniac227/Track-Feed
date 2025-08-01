export const todoView = {
    /**
     * Renders all todos for the currently active project
     * @param {Array} todos - Array of todo objects from the controller
     */
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
                
                
                const deleteBtn = document.createElement('button') // Create the delete button
                deleteBtn.textContent = 'Delete'
                deleteBtn.classList.add('delete-todo-btn')
                deleteBtn.dataset.todoId = todo.id // Store the ID for later
                li.appendChild(deleteBtn)

                
                const completeBtn = document.createElement('button')
                completeBtn.textContent = todo.completed ? 'Undo' : 'Complete'
                completeBtn.classList.add('complete-todo-btn')
                completeBtn.dataset.todoId = todo.id
                li.appendChild(completeBtn)


                todoList.appendChild(li) // Add the todo item to the list
            })
    }
}