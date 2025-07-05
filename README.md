# 📚 BookNest – Minimal Library Management System

A simple, elegant, and fully functional client-side **Library Management System** built using **React**, **Redux Toolkit Query**, **TypeScript**, and **Tailwind CSS**.  
It enables users to view, add, edit, delete, and borrow books—with a minimalist interface and smooth UX.

---

## 🚀 Features

### 1. Public Routes (No Authentication)

- All pages are accessible without login/signup.
- Focused purely on core library operations.

### 2. 📖 Book Management

- **View Book List**
  - Displayed in a table format with the following columns:
    - Title, Author, Genre, ISBN, Copies, Availability, Actions
- **Actions**
  - 📝 **Edit Book**: Opens form prefilled with book data.
  - ❌ **Delete Book**: Confirmation dialog before deletion.
  - 📚 **Borrow Book**: Opens a form to borrow copies.
- **Add Book**
  - Title, Author, Genre, ISBN, Description, Copies
  - Defaults to Available if copies > 0
  - Redirects to list view on success

### 3. 📥 Borrow Book

- Fields:
  - Quantity (number) — limited to available copies
  - Due Date (date input)
- Business logic:
  - Marks book as unavailable if copies become 0
- Redirects to **Borrow Summary** after success

### 4. 📊 Borrow Summary

- Aggregated summary from borrow data
- Columns:
  - Book Title, ISBN, Total Quantity Borrowed

---

## 🧩 Core Tech Stack

- ⚛️ React
- ⚙️ Redux Toolkit Query
- 🔡 TypeScript
- 🎨 Tailwind CSS + DaisyUI
- 🌐 RESTful API (Vercel-deployed backend)

---

## 🧱 UI Components

- ✅ **Navbar** with navigation links
- ✅ **Books Table/Grid** with all core actions
- ✅ **Add/Edit Book** Forms using React Hook Form
- ✅ **Borrow Form**
- ✅ **Borrow Summary Table**
- ✅ **Footer**

---

## 💡 UX & Design

- Minimalist and modern UI
- Fully responsive layout (mobile, tablet, desktop)
- Accessible buttons and clear actions
- Toast notifications for feedback

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Asadulla1/library-management-client

```
