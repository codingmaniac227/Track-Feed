# ✅ TodoController Test Suite Documentation

## 📌 Purpose
The `todoController.test.js` file verifies that **Todo Controller functions** work as expected.  

Where:
- **Model tests** confirm that the `Todo` class itself works (its methods and properties).
- **Controller tests** confirm that the **business logic** in `todoController.js` correctly uses those models and enforces validation.

This separation helps pinpoint issues:
- If a model test fails → The **Todo model** is broken.
- If a controller test fails → The **controller logic** is broken.

---

## 🗂 File Location

test/todoController.test.js


It sits alongside:
- `_test_/todo.test.js` → model tests for `Todo`
- `_test_/project.test.js` → model tests for `Project`

---

## 📂 What Does This File Test?

### 🔹 **1. `createTodo()`**
✅ **Test:** Checks that `createTodo()` returns a valid `Todo` instance.  
- Ensures the object is an actual `Todo`.
- Confirms that title, description, due date, and priority are correctly assigned.
- Verifies `completed` defaults to `false`.

---

### 🔹 **2. `toggleTodo()`**
✅ **Test:** Checks that calling `toggleTodo(todo)` **flips the completed state**.  
- Starts as `false`.
- Flips to `true` after one toggle.
- Flips back to `false` if toggled again (tested indirectly).

✅ **Error handling test:** Ensures it throws an error if you try toggling something that’s **not a Todo**.

---

### 🔹 **3. `editTodo()`**
✅ **Test:** Verifies that only the provided fields get updated.  
- Example: `{ title: 'Learn Vite', priority: 'urgent' }` updates only **title** & **priority**.
- Ensures **description** and other fields stay unchanged.

---

### 🔹 **4. `deleteTodo()`**
✅ **Test:** Removes the correct Todo from an array.  
- Deletes index `1` (the second Todo).
- Confirms the array now has only 2 Todos left.
- Verifies that the deleted Todo can no longer be found.

---

## 🎯 Why This Matters

- **Business logic validation:** Ensures controllers are doing more than just calling model methods blindly.
- **Data safety:** Tests confirm that controllers enforce instance checks and proper validation.
- **Scalability:** When controllers gain more features (e.g., saving to localStorage, calling APIs), these tests will grow with them — without having to rewrite model tests.

---

## 🏆 Best Practice Reminder

- ✅ **Models:** test the “parts.”  
- ✅ **Controllers:** test the “instructions.”  
- ✅ **Integration tests (later):** test the “whole system.”

This file represents **controller-level unit testing** — the middle layer that keeps logic clean and testable.
