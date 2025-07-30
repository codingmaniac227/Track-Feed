# To‑Do List App

Welcome to **To‑Do List** — a **modular and scalable task management application** built with **JavaScript** and **Vite**.  
This project begins as a **front‑end architecture showcase** but is designed to evolve into a **full‑stack application** with Express, databases, authentication, and deployment.

---

## Tech Stack

- **JavaScript (ES6+)** – Modern language features for app logic  
- **Vite 7** – Lightning‑fast bundler and development server  
- **Babel** – Transpiles modern JavaScript for broader browser support  
- **Prettier + ESLint** – Code formatting and linting for consistent style and error prevention  
- **Node.js + npm** – Dependency management and project scripting

---

## Features

✅ **Vite Configuration**  
- Handles bundling for **JavaScript, CSS, and assets** with minimal setup.

✅ **Super‑Fast Live Development**  
- Built‑in Vite dev server opens the browser instantly and hot‑reloads changes on save.

✅ **Scaffolded Architecture**  
- Organized into `models`, `controllers`, `views`, and `utilities` directories for clean, modular code.

✅ **Code Quality & Standards**  
- ESLint + Prettier enforce formatting rules and catch issues before they reach production.  
- Husky + lint‑staged provide pre‑commit checks to keep the codebase consistent.

✅ **Clean Git & Ignore Rules**  
- `.gitignore` excludes `node_modules`, build output, and sensitive files, keeping the repository professional.

---

## Current File Structure

```plaintext
src/
│
├── index.js            # Entry point for Vite
├── style.css           # Base stylesheet
│
└── modules/
    ├── models/         # Data structures (e.g. Todo, Project)
    │   ├── todo.js
    │   └── project.js
    │
    ├── controllers/    # Business logic for models
    │   ├── todoController.js
    │   └── projectController.js
    │
    ├── views/          # UI rendering and DOM control
    │   ├── domController.js
    │   ├── todoView.js
    │   └── projectView.js
    │
    └── utilities/      # Helper functions & storage
        ├── storage.js
        └── helpers.js

dist/                   # Auto‑generated production build
└── index.html          # HTML template (output)
```

# STILL IN PROGRESS 

