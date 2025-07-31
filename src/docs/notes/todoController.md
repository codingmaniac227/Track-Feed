# ✅ Todo Controller

## 📌 Purpose
The `todoController.js` file manages **all operations on Todos**.  
Where the `Todo` model only defines the structure of a Todo, this controller defines **what we can do with it**.

---

## 📂 Functions

### 🔹 `createTodo(title, description, dueDate, priority = 'low')`
- **Creates a new Todo instance.**
- Acts as the single “entry point” for generating Todos, so future changes (validation, logging, saving to storage) only need to happen here.

### 🔹 `toggleTodo(todo)`
- **Flips the completion status** of a Todo.
- Uses `todo.toggleComplete()` from the model.
- Includes an `instanceof Todo` check to ensure only real Todo objects can be toggled.

### 🔹 `editTodo(todo, updates)`
- Allows **partial updates** to a Todo’s properties.
- `updates` is an object like:
  ```js
  { title: 'New Title', description: '...' }
