export const projectView = {
    render(projects) {
        const projectList = document.querySelector('#project-list')
        if (!projectList) return

        projectList.innerHTML = '' // Clears contianer before re-rendering

        projects.forEach(project => {
            const li = document.createElement('li')
            li.textContent = project.name

            const deleteBtn = document.createElement('button') // Creates the delete button
            deleteBtn.textContent = 'Delete'
            deleteBtn.classList.add('delete-project-btn')
            deleteBtn.dataset.projectId = project.id // Store the project ID for later

            li.appendChild(deleteBtn) // Append the delete button to the li
            
            projectList.appendChild(li) // Add the li to the project list
        })
    }
}