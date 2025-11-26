# 🚀 Quick Start Guide

## Step 1: Get Neon Database Connection String

1. Visit [https://console.neon.tech/](https://console.neon.tech/)
2. Sign up or log in
3. Click "Create Project"
4. Copy the connection string shown (save it for Step 3)

## Step 2: Setup Backend

Open terminal in the project root and run:

```bash
cd server
npm install
```

## Step 3: Configure Database

Create `.env` file in the `server` folder:

```bash
# In server folder, create .env with:
DATABASE_URL="your-neon-connection-string-here"
JWT_SECRET="my-super-secret-key-12345"
PORT=5000
```

## Step 4: Initialize Database

```bash
# Still in server folder
npx prisma migrate dev --name init
```

This creates the User and Todo tables in your Neon database.

## Step 5: Start Backend Server

```bash
npm run dev
```

✅ Backend running on http://localhost:5000

## Step 6: Start Frontend (New Terminal)

Open a NEW terminal window, go to project root:

```bash
# Make sure you're in the root folder, not server/
npm install
npm run dev
```

✅ Frontend running on http://localhost:5173

## Step 7: Test It Out!

1. Open http://localhost:5173 in your browser
2. Click "Register" to create an account
3. Add some todos!
4. Your todos are now saved in the cloud database 🎉

## Troubleshooting

### Backend won't start?
- Make sure your `.env` file has the correct DATABASE_URL
- Check that port 5000 is not in use

### Frontend can't connect?
- Make sure backend is running on port 5000
- Check browser console for errors

### Database errors?
- Verify your Neon connection string is correct
- Run `npx prisma migrate reset` to reset database

## Testing the API

You can test the API with curl or Postman:

```bash
# Register a user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

Save the token from login response and use it for todo operations!

## What's Next?

- Add more features from the Future Enhancements list
- Deploy to Vercel (frontend) and Railway/Render (backend)
- Customize the UI styling
- Add dark mode
