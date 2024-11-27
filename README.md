# TaskMate

TaskMate is a task management application that helps users to organize their tasks and improve productivity. It features user authentication using JWT (JSON Web Tokens) and bcrypt for secure password hashing, ensuring a secure experience for every user.

## Website
https://taskmate.aadish.tech/

## Features

- User authentication using JWT for secure login and registration.
- Passwords are securely stored using bcrypt hashing.
- Create, read, update, and delete tasks.
- Mark tasks as completed or pending.
- Set task deadlines and priorities.
- User-specific task management (each user sees only their tasks).
- Responsive UI for both desktop and mobile devices.

## Technologies Used

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token) & bcrypt
- **State Management:** Recoil

## Setup

### Prerequisites

- Node.js and npm
- MongoDB installed
- JWT secret key for authentication

### Install Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/aadishj23/taskmate.git
   cd taskmate
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

### Configure Environment Variables

1. Create a `.env` file in the backend directory with the following variables:

   ```
   JWT_SECRET=your_jwt_secret_key
   DATABASE_URL=your_MongoDB_connection_string
   ```

   Replace `your_jwt_secret_key` with a strong secret key and `your_MongoDB_connection_string` with your MongoDB connection string.

2. Create a `.env` file in the frontend directory with:

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

   Replace the URL with your backend API URL if it's different.

### Run the Application

1. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

The application should now be running on `http://localhost:3000` (frontend) and `http://localhost:5000` (backend).

## Authentication

TaskMate uses JWT for user authentication. When users log in, they receive a JWT token that must be included in the header of requests that require authentication.

### API Endpoints

- **POST /api/auth/register**: Register a new user.
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "message": "User registered successfully" }`

- **POST /api/auth/login**: Login with an existing user.
  - Request body: `{ "email": "user@example.com", "password": "password123" }`
  - Response: `{ "token": "your_jwt_token" }`

Include the JWT token in the Authorization header as `Bearer <token>` for protected routes.