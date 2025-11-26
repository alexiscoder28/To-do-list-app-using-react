import { useState, useEffect } from 'react';
import { SignIn, SignUp, UserButton, useUser, useAuth, SignedIn, SignedOut } from '@clerk/clerk-react';
import './styles.css';

const API_URL = 'http://localhost:5000/api';

export default function App() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  // Load todos when user signs in
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      fetchTodos();
    }
  }, [isSignedIn, isLoaded]);

  const fetchTodos = async () => {
    try {
      const userId = user.id;
      
      const response = await fetch(`${API_URL}/todos?userId=${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos || []);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newItem.trim()) return;
    if (!user?.id) {
      console.error('User not loaded');
      return;
    }

    try {
      console.log('Sending todo with userId:', user.id);
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: newItem,
          userId: user.id 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setTodos([data.todo, ...todos]);
        setNewItem('');
      } else {
        const error = await response.json();
        console.error('Server error:', error);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          completed,
          userId: user.id 
        }),
      });

      if (response.ok) {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed } : todo
          )
        );
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}?userId=${user.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <>
      {!isLoaded ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <SignedOut>
            <div className="auth-container">
              <div className="auth-box">
                {showSignUp ? (
                  <>
                    <SignUp routing="hash" />
                    <p className="toggle-auth">
                      Already have an account?{' '}
                      <button
                        className="link-button"
                        onClick={() => setShowSignUp(false)}
                      >
                        Sign In
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <SignIn routing="hash" />
                    <p className="toggle-auth">
                      Don't have an account?{' '}
                      <button
                        className="link-button"
                        onClick={() => setShowSignUp(true)}
                      >
                        Sign Up
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="header-container">
              <h1 className="header">Todo List</h1>
              <div className="user-info">
                <span>Welcome, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!</span>
                <UserButton />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="new-item-form">
              <div className="form-row">
                <label htmlFor="item">New Item</label>
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  type="text"
                  id="item"
                  placeholder="Add a new todo..."
                />
              </div>
              <button className="btn">Add</button>
            </form>

            <ul className="list">
              {todos.length === 0 && <li className="no-todos">No Todos</li>}
              {todos.map((todo) => (
                <li key={todo.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                    />
                    {todo.title}
                  </label>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </SignedIn>
        </>
      )}
    </>
  );
}
