# ✅ To‑Do List App

Welcome to **To‑Do List** — a **modular and scalable task management application** built with **JavaScript** and **Webpack**.  
This project starts as a front‑end architecture showcase but is designed to evolve into a **full‑stack application** with Express, databases, authentication, and deployment.

---

## ⚙️ Tech Stack

- **JavaScript (ES6+)** – Modern language features for app logic
- **Webpack 5** – Module bundler for JavaScript, CSS, and assets
- **Babel** – Transpiles modern JS for broader browser support
- **Webpack Dev Server** – Live reloading during development
- **Node.js + npm** – Dependency management and scripting

---

## ✨ Features (Current Phase)

✅ **Webpack Configuration**
- Bundles JavaScript, CSS, and future assets into an optimized build.

✅ **Babel Setup**
- Enables ES6+ features (imports, async/await) while maintaining browser compatibility.

✅ **Live Reload Development**
- Webpack Dev Server opens your browser automatically and reloads on save.

✅ **Scaffolded Architecture**
- `models`, `controllers`, `views`, and `utilities` directories created for clean, modular code as the app grows.

✅ **Clean Git & Ignore Rules**
- `.gitignore` excludes `node_modules`, build junk, and sensitive files (e.g. `.env`), keeping the repo professional.

---

## 📂 Current File Structure

```js
src/
│
├── index.js # Entry point for Webpack
├── style.css # Base stylesheet
│
└── modules/
├── models/ # Data structures (e.g. Todo, Project)
│ ├── todo.js
│ └── project.js
│
├── controllers/ # Business logic for models
│ ├── todoController.js
│ └── projectController.js
│
├── views/ # UI rendering and DOM control
│ ├── domController.js
│ ├── todoView.js
│ └── projectView.js
│
└── utilities/ # Helper functions & storage
├── storage.js
└── helpers.js

dist/
└── index.html # HTML template
```

---

## 🚀 How to Run Locally

### 🔧 **Development (Live Reload)**

```bash
npm install
npm start
```

✅ **Opens browser automatically at http://localhost:8080**

✅ **Auto reloads when you save files**

### 📦 Production Build

```bash
npm run build
```
➡ **Bundles optimized JS & CSS into /dist**


## 📝 Documentation (Quick Guide)
  -  **Add a new script**: Edit package.json under "scripts".

   - **Add a new module**: Place in src/modules/<folder> and import it where needed.

  -  **Ignore files**: Add to .gitignore (node_modules, dist builds already covered).

   - **Run Dev Server**: npm start for live reload or npm run dev for watch mode.


## Future Implementations

### Planned Phases
1️⃣ **Todo Model & Project Model** – Implement core classes (title, due date, completion).
2️⃣ **Controllers** – Add logic for creating, editing, and deleting todos and projects.
3️⃣ **DOM Rendering** – Implement dynamic rendering via domController and views.
4️⃣ **Persistence Layer** – Add storage.js to save data in localStorage.
5️⃣ **Express Backend** – Transition to full‑stack with REST API endpoints.
6️⃣ **Authentication & Security** – JWT auth, rate limiting, and secure middleware.
7️⃣ **Deployment** – Dockerize and deploy to cloud platforms like Render or Railway.