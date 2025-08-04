export const todoView = {
  render(todos = []) {
    console.log("🖌 todoView.render CALLED", new Date().toLocaleTimeString())
    console.log("   Todos passed in:", todos)

    const todoList = document.querySelector('#todo-list')
    if (!todoList) return

    todoList.innerHTML = '' // Clear previous todos

    todos.forEach(todo => {
      const li = document.createElement('li')

      // Add span for the todo title
      const titleSpan = document.createElement('span')
      console.log("🎯 Setting text for todo:", todo.title)
      titleSpan.textContent = todo.title
      console.log("✅ Final span after text set:", titleSpan)
      li.appendChild(titleSpan)

      if (todo.completed) {
        li.classList.add('completed')
      }

      // Delete button
      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete'
      deleteBtn.classList.add('delete-todo-btn')
      deleteBtn.dataset.todoId = todo.id
      li.appendChild(deleteBtn)

      // Complete button
      const completeBtn = document.createElement('button')
      completeBtn.textContent = todo.completed ? 'Undo' : 'Complete'
      completeBtn.classList.add('complete-todo-btn')
      completeBtn.dataset.todoId = todo.id
      li.appendChild(completeBtn)

      todoList.appendChild(li)
    })
  }
};
