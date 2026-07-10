# MERN Daily Routine Dashboard

A premium, production-ready MERN stack application designed to manage your daily routines. The dashboard automatically displays tasks based on the current system time, updates in real-time, and features a modern glassmorphism UI.

## Features

- **Real-Time Updates**: Automatically highlights the current task based on system time and updates every minute without page refreshes.
- **Drag-and-Drop**: Easily reorder your tasks using `@dnd-kit`.
- **Theming**: Premium glassmorphism design with automatic dark/light theme detection and manual toggle.
- **Dynamic Greeting**: Welcomes you based on the time of day with a live clock.
- **Task Management**: Full CRUD operations for tasks (Add, Edit, Delete, Mark Completed).
- **Progress Tracking**: Daily completion percentage and progress bar.
- **Categories & Priorities**: Organize tasks with custom colors and priority levels.

## Tech Stack

### Frontend
- **React (Vite)**
- **Tailwind CSS v4** (with Glassmorphism styling)
- **Lucide React** (Icons)
- **Axios** (HTTP Client)
- **React Router**
- **Context API** (State Management)
- **@dnd-kit** (Drag & Drop)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js & Express.js**
- **MongoDB Atlas & Mongoose**
- **Express Validator**
- **Cors, Dotenv, Morgan**

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB server)

### 1. Clone the repository
```bash
git clone <repository-url>
cd Routine
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory (`Routine/.env`) and add:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the `client` directory (`client/.env`) and add:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`.

## Deployment

### Frontend (Vercel)
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Set the Root Directory to `client`.
4. Ensure the Build Command is `npm run build` and Output Directory is `dist`.
5. Add the `VITE_API_URL` environment variable pointing to your deployed backend URL.

### Backend (Render / Railway)
1. Connect your repository to your chosen hosting provider.
2. Set the Root Directory to `server`.
3. Set the Start Command to `node server.js`.
4. Add the necessary environment variables (`MONGODB_URI`, `NODE_ENV=production`).

## License
MIT License
