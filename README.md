# TrackFeed App

Welcome to **TrackFeed** — a **modular and scalable task management application** built with **JavaScript** and **Vite**.  
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

## 📂 Full Project Structure

```plaintext
Project-ToDoList/
│
├── 📁 dist/                   # Production build output (Vite generates)
│   └── index.html             # Bundled entry HTML
│
├── 📁 src/                    # Source code
│   ├── index.js               # Main entry point for Vite
│   ├── style.css              # Base styles
│   │
│   └── 📁 modules/
│       ├── 📁 models/         # Core data structures
│       │   ├── todo.js
│       │   └── project.js
│       │
│       ├── 📁 controllers/    # Business logic
│       │   ├── todoController.js
│       │   └── projectController.js
│       │
│       ├── 📁 views/          # UI & DOM handling (to be expanded)
│       │   ├── domController.js
│       │   ├── todoView.js
│       │   └── projectView.js
│       │
│       └── 📁 utilities/      # Helpers, storage, future API utils
│           ├── storage.js
│           └── helpers.js
│
├── 📁 _test_/                 # (untracked: data integrity)
│   ├── todo.test.js
│   ├── project.test.js
│   ├── todoController.test.js
│   └── projectController.test.js
│
├── 📁 .husky/                 # Git hooks (linting & formatting before commits)
│   └── pre-commit
│
├── .gitignore                 # Git tracking rules
├── eslint.config.js           # ESLint configuration
├── jest.config.cjs            # Jest testing configuration
├── package.json               # Project metadata & scripts
├── package-lock.json          # Dependency lockfile for npm
├── prettier.config.js         # Prettier configuration
├── README.md                  # Project overview (this file)
│
├── 📁 node_modules/           # All npm dependencies (ESLint, Prettier, Husky, Jest, Vite, etc.)
│   └── … (dependencies collapsed for clarity)
│
└── (untracked: data integrity)
    .env                       # Future environment variables
    coverage/                  # Test coverage reports
```

# STILL IN PROGRESS 

