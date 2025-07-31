# Jest Tests Explained

## todo.test.js
- **Why?** Tests Todo class for correct initialization and toggleComplete method.
- **What it covers:**
  1. Todo constructor assigns title, description, dueDate, default priority, default completed = false.
  2. toggleComplete() flips completed from false → true.

## project.test.js
- **Why?** Tests Project class for basic functionality.
- **What it covers:**
  1. Project initializes with name and empty todos.
  2. Project can add valid Todo instances.
  3. Project rejects invalid data (throws error).
