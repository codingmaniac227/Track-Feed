# 📘 Models Explained (Private Notes)

## 📂 Why have a `models/` folder?
- Models represent **the data** in your app.
- They are the **blueprints** for the “things” your app works with.
- They separate **data structure** (what a Todo *is*) from **logic** (what you do with it in controllers) and **UI** (how it’s shown in views).

✅ **Think:** Models = Nouns.  
Controllers = Verbs.  
Views = How the nouns look.

---

## 📝 todo.js

### 🔍 Purpose
Defines **one single Todo item** — the core building block of the app.

### 🏗 Structure
```js
export default class Todo {
  constructor(title, description, dueDate, priority = 'low', completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  toggleComplete() {
    this.completed = !this.completed;
  }
}
```