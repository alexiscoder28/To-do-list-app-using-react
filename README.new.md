# Full-Stack Todo List App

A modern todo list application with user authentication, built with React, Node.js, Express, Prisma, and Neon PostgreSQL.

## Features

- ✅ User authentication (Register/Login)
- ✅ JWT token-based authorization
- ✅ User-specific todo lists
- ✅ Create, read, update, delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Cloud PostgreSQL database (Neon)
- ✅ Secure password hashing with bcrypt
- ✅ Beautiful UI with authentication screens

## Tech Stack

### Frontend
- React (Vite)
- JavaScript

### Backend
- Node.js
- Express
- Prisma ORM
- JWT for authentication
- Bcrypt for password hashing

### Database
- Neon PostgreSQL (Cloud)

## Setup Instructions

### 1. Set up Neon PostgreSQL Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up or log in
3. Create a new project
4. Copy your connection string (it looks like: `postgresql://user:password@host.neon.tech/dbname`)

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
```

Edit `.env` and add your Neon database URL:
```
DATABASE_URL="postgresql://your-connection-string-here"
JWT_SECRET="your-secret-key-here"
PORT=5000
```

Run Prisma migrations:
```bash
npx prisma migrate dev --name init
```

Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# In the root directory
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (requires Bearer token)

### Todos (All require authentication)
- `GET /api/todos` - Get all todos for current user
- `POST /api/todos` - Create new todo
  ```json
  {
    "title": "Buy groceries",
    "completed": false
  }
  ```
- `PUT /api/todos/:id` - Update todo
  ```json
  {
    "title": "Buy groceries",
    "completed": true
  }
  ```
- `DELETE /api/todos/:id` - Delete todo

## Project Structure

```
To-do-list-app-using-react/
├── server/                  # Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js       # Prisma client
│   │   ├── middleware/
│   │   │   └── auth.js     # JWT authentication
│   │   ├── routes/
│   │   │   ├── auth.js     # Auth endpoints
│   │   │   └── todos.js    # Todo CRUD endpoints
│   │   └── index.js        # Express server
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── .env
│   └── package.json
│
└── src/                     # Frontend
    ├── components/
    │   ├── Auth.jsx        # Login/Register component
    │   ├── Auth.css
    │   ├── TodoForm.jsx    # Add todo form
    │   └── TodoList.jsx    # Todo list display
    ├── App.jsx             # Main app component
    └── styles.css

```

## Database Schema

### User
- id (UUID)
- email (unique)
- password (hashed)
- name (optional)
- createdAt
- updatedAt

### Todo
- id (UUID)
- title
- completed (default: false)
- userId (foreign key)
- createdAt
- updatedAt

## Development

### Backend
```bash
cd server
npm run dev  # Runs with nodemon for auto-restart
```

### Frontend
```bash
npm run dev  # Runs Vite dev server
```

## Security Features

- Passwords are hashed with bcrypt (10 rounds)
- JWT tokens for stateless authentication
- Protected API routes with authentication middleware
- Secure database connection with SSL
- User-specific data isolation

## Future Enhancements

- [ ] Edit todo functionality
- [ ] Due dates for todos
- [ ] Priority levels
- [ ] Categories/Tags
- [ ] Search and filter
- [ ] Dark mode toggle
- [ ] Share lists with other users
- [ ] Email verification
- [ ] Password reset

## License

MIT
