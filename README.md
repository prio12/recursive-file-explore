# 📁 Mini File Explorer

A simple virtual file explorer built with Next.js where you can create folders, files, navigate through a nested structure, rename, delete, and edit file content — all stored in localStorage.

This project is mainly focused on practicing recursive tree handling, state updates, and building a clean UI for a file-system-like experience in the browser.

---

## 🔗 Live Demo

https://your-project-link.vercel.app  
_(replace this after deployment)_

---

## 🚀 Features

- Create folders and files
- Rename and delete items
- Nested folder navigation (recursive structure)
- Breadcrumb-style path navigation
- File editor with save functionality
- Persistent storage using localStorage
- Mobile responsive sidebar
- Clean grid-based file view

---

## 🧠 What I focused on while building this

- Managing a nested tree structure in React state
- Writing clean recursive utility functions for:
  - finding nodes
  - inserting items
  - renaming and deleting nodes
- Keeping state updates immutable
- Separating logic into utility functions
- Making navigation feel smooth and predictable

---

## 🛠 Tech Stack

- Next.js (App Router)
- TypeScript
- React Hooks
- Tailwind CSS
- Lucide Icons
- localStorage for persistence

---

## 📦 Getting Started

Clone the project:

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
npm run dev
```

```
Then Open:

http://localhost:3000

```

---

## 📌 Notes

- **Data persistence** — All data is stored in the browser's `localStorage`. No backend or database is involved.
- **Refresh-safe** — Refreshing the page keeps your file structure intact.
- **Scope** — Designed as a lightweight file system simulation, not a real database system.

---
