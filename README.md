# MERN Task Management Dashboard

A full-stack task management application built with MongoDB, Express, React, and Node.js. Users can register, log in, and manage their own tasks through a clean, dark-themed dashboard with a three-column board (Pending, In Progress, Completed).

## Features

- User authentication (register/login) secured with JWT and bcrypt password hashing
- Full task CRUD: create, read, update, and delete tasks
- Each task supports a title, description, status, priority, due date, and tags
- Tasks are scoped per user — each account only sees and manages its own tasks
- Three-column board view (Pending / In Progress / Completed) with live status updates
- Responsive, dark-themed UI built with custom CSS (no UI framework dependency)

## Tech Stack

- **Frontend:** React (Vite), React Router, Axios, plain CSS;
- **Backend:** Node.js, Express, Mongoose;
- **Database:** MongoDB Atlas;
- **Auth:** JSON Web Tokens (JWT), bcryptjs;
- **Deployment:** Vercel (frontend), Render (backend)

## Project Structure

```
MERN-Task-Dashboard/
├── backend/
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── models/
│   │   ├── Task.js
│   │   └── user.js
│   ├── routes/
│   │   ├── auth.js          # /api/auth — register, login
│   │   └── tasks.js         # /api/tasks — CRUD, protected
│   └── server.js
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js     # Axios instance with auth interceptor
        ├── context/
        │   └── AuthContext.jsx
        ├── components/
        │   ├── ProtectedRoute.jsx
        │   ├── TaskCard.jsx
        │   └── TaskForm.jsx
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Dashboard.jsx
        ├── App.jsx
        └── main.jsx
```

## Running Locally

### Prerequisites
- Node.js installed
- A MongoDB Atlas connection string (or a local MongoDB instance)

### Backend setup
```bash
cd backend
npm install
```
Create a `.env` file in `backend/` with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the server:
```bash
node server.js
```
The API runs on `http://localhost:5000`.

### Frontend setup
```bash
cd frontend
npm install
npm run dev
```
The app runs on `http://localhost:5173` and expects the backend at `http://localhost:5000/api` by default. To point it at a different backend, set `VITE_API_URL` in a `.env` file inside `frontend/`.

## API Endpoints

| Method | Endpoint              | Description                  | Auth required |
|--------|------------------------|-------------------------------|----------------|
| POST   | /api/auth/register     | Create a new account          | No             |
| POST   | /api/auth/login        | Log in and receive a JWT      | No             |
| GET    | /api/tasks             | List the logged-in user's tasks | Yes          |
| POST   | /api/tasks             | Create a new task              | Yes            |
| PUT    | /api/tasks/:id         | Update a task                  | Yes            |
| DELETE | /api/tasks/:id         | Delete a task                  | Yes            |

## Future Enchancements

- Task filtering and search by status, priority, or tag
- Drag-and-drop between board columns
- Team/multi-user task assignment using the existing `assignedUser` field
- Email verification on signup
- Dark/light theme toggle

## Live Demo

- **App:** [mern-task-dashboard-nu.vercel.app](https://mern-task-dashboard-nu.vercel.app)
- **API:** [mern-task-dashboard-9dod.onrender.com](https://mern-task-dashboard-9dod.onrender.com)

> Note: the backend is hosted on Render's free tier, which spins down after periods of inactivity. The first request after idle time may take 30–60 seconds to respond while the server wakes up.
