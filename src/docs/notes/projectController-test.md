# ✅ ProjectController Test Suite Documentation

## 📌 Purpose
The `projectController.test.js` file verifies that **Project Controller functions** behave correctly.  

Where:
- **Model tests** (like `project.test.js`) ensure the `Project` class itself works.
- **Controller tests** confirm the **business logic** in `projectController.js` properly uses the model and enforces rules.

By separating these tests, we can quickly tell:
- If the **Project model** is broken → Fix `project.js`.
- If the **controller logic** is wrong → Fix `projectController.js`.

---

## 🗂 File Location
```js
test/projectController.test.js
```

This file sits alongside:
- `_test_/todoController.test.js` → Tests for Todo controllers  
- `_test_/project.test.js` → Tests for the Project model itself

---

## 🧪 What Does This File Test?

### 🔹 **1. `createProject()`**
✅ **What’s tested:**
- Ensures `createProject('Work')` returns a **Project** instance.
- Verifies:
  - `name` is set correctly.
  - `todos` property is an **empty array** at initialization.

---

### 🔹 **2. `addTodoToProject()`**
✅ **What’s tested:**
- Adds a `Todo` object to the project’s `todos` array.
- Confirms:
  - Array length increases by 1.
  - The newly added `Todo` has the correct `title`.

✅ **Error handling test:**
- Passing **anything other than a `Todo` instance** (e.g., a string) throws:

```js
Only Todo instances can be added
```


---

### 🔹 **3. `removeTodoFromProject()`**
✅ **What’s tested:**
- Starts by adding two `Todo` objects to a project.
- Removes one by index (0).
- Confirms:
  - Only one `Todo` remains in the array.
  - The correct `Todo` (Task 2) is the one that remains.

---

### 🔹 **4. `renameProject()`**
✅ **What’s tested:**
- Renames a project using `renameProject(project, 'New Name')`.
- Confirms the name is **updated** without breaking other properties.

---

### 🔹 **5. `deleteProject()`**
✅ **What’s tested:**
- Works with an **array of projects** (`projectList`).
- Deletes the project at a given index.
- Confirms:
  - The array shrinks by 1.
  - The correct project (e.g., **Work**) is removed and **Personal** remains.

---

## 📘 Why Is This Test Suite Important?

✅ **Ensures business rules are enforced**
- Controllers prevent invalid data (e.g., no adding strings as Todos).

✅ **Protects project data integrity**
- Validates add/remove behavior before the UI layer is built.

✅ **Provides a safety net for future features**
- When features like **saving projects to localStorage or a database** are added, we can extend these tests to cover new logic without touching model tests.

---

## 🏆 Best Practice Reminder
- **Models** define what data looks like.
- **Controllers** enforce how that data is used.
- **Tests** for controllers make sure logic is enforced before data hits your UI or backend.

This file represents **controller-level testing** for Projects — the “middle layer” between raw models and the eventual frontend.
