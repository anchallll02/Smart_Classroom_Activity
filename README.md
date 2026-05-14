# 🎓 Smart Classroom Activities System

A full-stack Smart Classroom Management System built using the MERN Stack.  
This project helps educational institutions manage classroom activities digitally, including online attendance, programming labs, seating allocation, authentication, and classroom monitoring.

The application consists of both frontend and backend modules with complete API integration and real-time functionality.

---

# 🚀 Features

- Online attendance management
- QR-based attendance system
- Programming lab management
- Student and teacher dashboard
- Authentication & authorization
- Seating allocation system
- Classroom activity tracking
- Real-time updates
- Responsive user interface
- Role-based access control
- Full-stack MERN architecture

---

# 🛠️ Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios

## Backend
- Node.js
- Express.js
- REST API

## Database
- MongoDB

## Other Technologies
- JWT Authentication
- Socket.IO
- QR Token Based Attendance

---

# 📂 Project Structure

```bash
smartclass-system/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── README.md
└── package.json
```

---

# ⚙️ Backend Setup (Node + Express + MongoDB)

Run the backend locally on your machine.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit the `.env` file and paste your MongoDB connection string.

```bash
npm run dev
```

Server runs on:

```bash
http://localhost:5000
```

---

# 🔐 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/edupulse
JWT_SECRET=replace_with_a_long_random_string
QR_WINDOW_MS=8500
CORS_ORIGIN=http://localhost:5173
```

---

# 📦 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

# 🌐 Connect Frontend with Backend

In the React frontend, set the API base URL using:

```env
VITE_API_URL=http://localhost:5000
```

Replace local state management with API `fetch` or `axios` calls for attendance, seating, and authentication modules.

---

# 🔥 API Endpoints

## 🔑 Authentication

### Register User

```http
POST /api/auth/register
```

Request Body:

```json
{
  "name": "Anchal",
  "email": "anchal@gmail.com",
  "password": "123456",
  "role": "student"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request Body:

```json
{
  "email": "anchal@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt_token",
  "user": {}
}
```

---

# 👨‍🎓 Student APIs

## Get All Students

```http
GET /api/students
```

## Add Student

```http
POST /api/students
```

Request Body:

```json
{
  "name": "Anchal",
  "roll": "101",
  "email": "anchal@gmail.com",
  "branch": "CSE"
}
```

---

# 📅 Attendance APIs

## Create Attendance Session

```http
POST /api/attendance/session
```

Teacher creates attendance session.

Response:

```json
{
  "sessionId": "session_id",
  "qrToken": "token",
  "expiresAt": "time"
}
```

---

## Rotate QR Token

```http
POST /api/attendance/rotate/:sessionId
```

Rotates QR token every 8 seconds.

---

## Mark Attendance

```http
POST /api/attendance/mark
```

Request Body:

```json
{
  "qrToken": "token",
  "roll": "101",
  "name": "Anchal"
}
```

Validates attendance within QR expiry window.

---

## Get Attendance List

```http
GET /api/attendance/:sessionId
```

Returns all marked students.

---

# 💻 Seating APIs

## Allocate Seats

```http
POST /api/seating/allocate
```

Request Body:

```json
{
  "lab": "Lab-1",
  "rows": 5,
  "cols": 5,
  "prefix": "PC",
  "startRoll": 1,
  "count": 25
}
```

---

## Get Seating Plan

```http
GET /api/seating/:lab
```

Returns current lab seating arrangement.

---

# 🌟 Modules Included

## 👨‍🏫 Teacher Module
- Mark attendance
- Generate QR attendance
- Manage programming labs
- Monitor student activities
- Allocate seating plans

## 👨‍🎓 Student Module
- Mark attendance
- Access lab activities
- View classroom updates
- Track attendance records

## 🧑‍💼 Admin Module
- Manage users
- Manage classrooms
- System monitoring
- Database management

---

# 📸 Screenshots

Add your screenshots here.

```bash
screenshots/dashboard.png
screenshots/attendance.png
screenshots/lab.png
screenshots/seating.png
```

---

# 📈 Future Improvements

- AI-based face recognition attendance
- Video conferencing integration
- Online examination system
- Notification system
- Cloud deployment
- Performance analytics dashboard

---

# 🧠 Learning Outcomes

Through this project, I learned:

- MERN Stack Development
- Frontend & Backend Integration
- REST API Development
- JWT Authentication
- MongoDB Database Management
- QR-based Attendance System
- Real-Time Features Implementation
- Full-Stack Application Architecture

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👩‍💻 Author

Anchal Maurya  
MERN Stack Developer 🚀
