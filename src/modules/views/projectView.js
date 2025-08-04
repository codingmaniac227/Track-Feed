export const projectView = {
  render(projects = []) {
    console.log("🖌 projectView.render CALLED", new Date().toLocaleTimeString())
    console.log("   Projects passed in:", projects)

    const projectList = document.querySelector('#project-list');
    if (!projectList) return;

    projectList.innerHTML = ''; // Clear container before rendering

    projects.forEach(project => {
      const li = document.createElement('li');

      // Add span for the project name
      const nameSpan = document.createElement('span');
      console.log("🎯 Setting text for project:", project.name)
      nameSpan.textContent = project.name;
      console.log("✅ Final span after text set:", nameSpan)
      li.appendChild(nameSpan);

      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-project-btn');
      deleteBtn.dataset.projectId = project.id;
      li.appendChild(deleteBtn);

      projectList.appendChild(li);
    });
  }
};
