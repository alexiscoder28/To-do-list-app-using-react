# Todo List API - Backend

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Neon PostgreSQL Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy your connection string

### 3. Configure Environment Variables

Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Neon database URL:
```
DATABASE_URL="postgresql://user:password@host.neon.tech:5432/dbname?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
```

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

This will:
- Create the database tables
- Generate Prisma Client

### 5. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Todos
- `GET /api/todos` - Get all todos (requires auth)
- `POST /api/todos` - Create new todo (requires auth)
- `PUT /api/todos/:id` - Update todo (requires auth)
- `DELETE /api/todos/:id` - Delete todo (requires auth)

## Database Schema

### User Model
- id (UUID)
- email (unique)
- password (hashed)
- name (optional)
- todos (relation)

### Todo Model
- id (UUID)
- title
- completed (default: false)
- userId (foreign key)
- createdAt
- updatedAt
