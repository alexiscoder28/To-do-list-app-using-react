const express = require('express');
const prisma = require('../config/db');

const router = express.Router();

// Get all todos for current user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ todos });
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  try {
    const { title, userId, completed = false } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ error: 'Title and userId are required' });
    }

    // Auto-create user if doesn't exist (for Clerk users)
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: { 
        id: userId,
        email: `${userId}@clerk.user`,
        password: 'clerk-auth',
        name: 'Clerk User'
      }
    });

    const todo = await prisma.todo.create({
      data: {
        title,
        completed,
        userId
      }
    });

    res.status(201).json({ todo });
  } catch (error) {
    console.error('Create todo error:', error);
    console.error('Error details:', error.message);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Check if todo exists and belongs to user
    const existingTodo = await prisma.todo.findFirst({
      where: { id, userId }
    });

    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed })
      }
    });

    res.json({ todo });
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Check if todo exists and belongs to user
    const existingTodo = await prisma.todo.findFirst({
      where: { id, userId }
    });

    if (!existingTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    await prisma.todo.delete({
      where: { id }
    });

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
