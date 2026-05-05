# SmartClass Backend (Node + Express + MongoDB)

Run this backend locally on your machine. The Lovable preview only runs the frontend.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and paste your MongoDB connection string
npm run dev
```

Server runs on `http://localhost:5000`.

## Environment Variables (`.env`)

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/edupulse
JWT_SECRET=replace_with_a_long_random_string
QR_WINDOW_MS=8500
CORS_ORIGIN=http://localhost:5173
```

## API Endpoints

### Auth
- `POST /api/auth/register` — `{ name, email, password, role }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`

### Students
- `GET  /api/students`
- `POST /api/students` — `{ name, roll, email, branch }`

### Attendance
- `POST /api/attendance/session` — teacher creates session → `{ sessionId, qrToken, expiresAt }`
- `POST /api/attendance/rotate/:sessionId` — rotate token (call every 8s)
- `POST /api/attendance/mark` — `{ qrToken, roll, name }` (validates 8s window)
- `GET  /api/attendance/:sessionId` — list of marked students

### Seating
- `POST /api/seating/allocate` — `{ lab, rows, cols, prefix, startRoll, count }` → assigned seats
- `GET  /api/seating/:lab` — current plan

## Connect frontend
In the React app, set the API base URL via `VITE_API_URL` (e.g. `http://localhost:5000`)
and replace local state in attendance/seating with `fetch` calls to these endpoints.
