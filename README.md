# 📚 Library Management API

A RESTful API for managing books and borrow operations, built using **Express**, **TypeScript**, and **MongoDB (Mongoose)**.

---

## 🚀 Features

- ✅ Create, Read, Update, Delete (CRUD) books
- ✅ Borrow books with availability and quantity check
- ✅ Filtering, sorting, and limit support for GET requests
- ✅ Borrow summary using MongoDB aggregation pipeline
- ✅ Static method and Mongoose middleware (pre/save, post/save)
- ✅ Schema validation and business logic enforcement
- ✅ Proper error response format

---

## 🔧 Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- ESLint + Prettier
- dotenv

---

## 🧪 API Endpoints

### 📘 Book Routes

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/api/books`     | Create a new book          |
| GET    | `/api/books`     | Get all books with filters |
| GET    | `/api/books/:id` | Get a book by ID           |
| PUT    | `/api/books/:id` | Update a book              |
| DELETE | `/api/books/:id` | Delete a book              |


### 🔄 Borrow Routes

| Method | Endpoint       | Description                          |
|--------|----------------|--------------------------------------|
| POST   | `/api/borrow`  | Borrow a book                        |
| GET    | `/api/borrow`  | Borrowed books summary (aggregation) |


### 📘 Get All Books (with Filters)

**GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5**

**Query Parameters:**
| Parameter  | Type   | Description                               |
|------------|--------|-------------------------------------------|
| `filter`   | string | Filter books by genre (e.g., FANTASY)     |
| `sortBy`   | string | Field to sort by (e.g., createdAt)        |
| `sort`     | string | Sort order: `asc` or `desc`               |
| `limit`    | number | Limit the number of results (default: 10)|



## 📁 Folder Structure

📦src
 ┣ 📂app
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜book.controllers.ts
 ┃ ┃ ┗ 📜borrow.controllers.ts
 ┃ ┣ 📂interfaces
 ┃ ┃ ┣ 📜Book.interface.ts
 ┃ ┃ ┗ 📜borrow.interface.ts
 ┃ ┗ 📂models
 ┃ ┃ ┣ 📜book.model.ts
 ┃ ┃ ┗ 📜borrow.model.ts
 ┣ 📜app.ts
 ┗ 📜server.ts


 
---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/safin33221/Library-Management-API.git
cd Library-Management-API

### 1️⃣ Install dependencies
pnpm install

### 3️⃣ Setup Environment Variables

PORT=5000
MONGO_URI=mongodb://localhost:27017/library-management -> Replace yourDB Url


### 4️⃣ Run the Development Server
pnpm dev



