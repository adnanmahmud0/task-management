Here's your updated README file incorporating the **technologies and dependencies** from your `package.json`:  

```markdown
# Task Management Application

## 📌 Overview

The **Task Management Application** is a powerful tool for organizing tasks efficiently. Users can **add, edit, delete, and reorder** tasks using a **drag-and-drop interface**, with instant database synchronization. The app provides **real-time updates** and a **clean, responsive UI**, making it accessible across desktop and mobile devices.

## 🚀 Live Demo
[Click Here to View the Live App](#) _(Replace with actual link)_

## 📂 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Challenges Faced](#challenges-faced)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [License](#license)

---

## 🌟 Features

### 🔐 Authentication
- Uses **Firebase Authentication** (Google Sign-In).
- Stores user details (User ID, email, display name).

### ✅ Task Management
- **CRUD Operations**: Users can **add, edit, delete** tasks.
- **Drag & Drop**: Move tasks between categories (`To-Do`, `In Progress`, `Done`).
- **Instant Persistence**: Changes saved in **MongoDB** in real-time.
- **Task Details**:
  - **Title** (max 50 characters, required)
  - **Description** (max 200 characters, optional)
  - **Timestamp** (auto-generated)
  - **Category** (`To-Do`, `In Progress`, `Done`)

### 🔄 Real-Time Syncing
- **WebSockets (Socket.io)** for live updates.
- **Optimistic UI Updates** for smooth user experience.

### 🎨 Frontend UI
- **React + Vite.js** for fast performance.
- **Drag-and-drop** via `@hello-pangea/dnd`.
- **Minimalistic & responsive design** using Tailwind CSS.

### 🛠 Backend (Express.js + MongoDB)
- RESTful API for handling task management.
- Uses **WebSockets** for real-time task updates.

### 🔥 Bonus Features (Optional)
- **Dark Mode Toggle**
- **Task Due Dates** with color-coded urgency indicators.
- **Activity Log** to track task changes.

---

## 🛠️ Technologies Used

### **Frontend:**
- **React 19 + Vite.js** (Fast build tool)
- **Firebase Authentication** (Google Sign-In)
- **@hello-pangea/dnd** (Drag-and-Drop UI)
- **Tailwind CSS + DaisyUI** (Responsive UI)
- **React Router Dom** (Navigation)
- **React Query** (Data fetching & caching)
- **Axios** (API requests)
- **SweetAlert2 & React Hot Toast** (Notifications)
- **React Hook Form** (Form handling)

### **Backend:**
- **Node.js + Express.js** (Server-side framework)
- **MongoDB (via Mongoose)** (Database)
- **Socket.io** (Real-time updates)
- **LocalForage** (Offline data storage)
- **Match-Sorter & Sort-By** (Sorting utilities)

### **Development Tools:**
- **ESLint & Prettier** (Code linting & formatting)
- **Vite.js Plugin for React**
- **DaisyUI (Tailwind CSS components)**
- **React Testing Library (for testing)**

---

## ⚙️ Installation

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

### **2️⃣ Install Dependencies**
#### For Frontend:
```bash
cd frontend
npm install
```

#### For Backend:
```bash
cd backend
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the `backend` directory and add:
```
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_api_key
PORT=5000
```

### **4️⃣ Run the Application**
#### Start the Backend Server:
```bash
cd backend
npm start
```

#### Start the Frontend:
```bash
cd frontend
npm run dev
```

The app should now be running at `http://localhost:5173/`.

---

## 🔗 API Endpoints

| Method | Endpoint         | Description                |
|--------|-----------------|----------------------------|
| POST   | `/tasks`        | Create a new task         |
| GET    | `/tasks`        | Retrieve all tasks        |
| PUT    | `/tasks/:id`    | Update task details       |
| DELETE | `/tasks/:id`    | Delete a task             |

---

## 🚧 Challenges Faced

- **Real-Time Updates**: Implementing WebSockets for live synchronization.
- **Drag-and-Drop UX**: Ensuring smooth mobile experience with `@hello-pangea/dnd`.
- **Optimistic UI**: Handling instant updates before backend confirmation.
- **State Management**: Managing large task states efficiently.

---

## 🔮 Future Enhancements

- 📅 **Task Due Dates**: Reminders & deadline indicators.
- 🌙 **Dark Mode**: Light/dark theme toggle.
- 📊 **Task Analytics**: Graphs for task completion rates.
- 🔔 **Notifications**: Real-time alerts for deadlines.
- 📝 **Activity Logs**: Track task modifications.


## 📜 License

This project is licensed under the **adnanmahmud99**.
