# ✅ Project Controller Documentation

## 📌 Purpose
The `projectController.js` file manages **Projects** and how they interact with **Todos**.  
It acts as the “brain” that decides what happens to Projects, while keeping all the actual data structure inside the `Project` model.

---

## 📂 Functions Overview

### 🔹 `createProject(name)`
- **What it does:** Creates a new Project instance.
- **Why:** Keeps all creation logic in one place for easy validation or expansion later (e.g., disallowing duplicate names).

---

### 🔹 `addTodoToProject(project, todo)`
- **What it does:** Adds a `Todo` object to a given `Project`.
- **How:**  
  - First checks if `project` is an actual `Project` object.
  - Then checks if `todo` is a valid `Todo`.
  - Calls `project.addTodo(todo)` from the model.

✅ **Why this matters:**  
- Keeps invalid data from being added (e.g., a random string instead of a Todo).
- Centralizes “how” Todos are added to Projects.

---

### 🔹 `removeTodoFromProject(project, index)`
- **What it does:** Removes a Todo from the project’s `todos` array by index.
- **Why:** Allows UI or backend logic to “unlink” a Todo cleanly.

---

### 🔹 `renameProject(project, newName)`
- **What it does:** Changes the name of a Project.
- **Why:** Keeps renaming rules in one place. Later we could enforce:
  - “No duplicate names”
  - “Name can’t be empty”

---

### 🔹 `deleteProject(projectList, index)`
- **What it does:** Removes a Project from an array of Projects.
- **Why:** Temporary helper for early phases.  
  - Later, deletion might sync with localStorage, a database, or ask for confirmation.

---

## 🎯 Why Have This Controller?

- Keeps **models clean** — models just define “what a Project is.”
- Adds **rules** (validation, safety checks) before any changes happen.
- Provides a **single point of control** for:
  - Adding/removing Todos.
  - Renaming/deleting Projects.

---

## 🏆 Future Additions

- **LocalStorage or DB Sync:** When a Project is renamed, added, or deleted, this controller will handle saving changes.
- **Project-specific rules:** Like “don’t delete a Project if it has open Todos.”
- **Error handling for the UI:** Controller can throw helpful errors or return structured responses for Views to display.
