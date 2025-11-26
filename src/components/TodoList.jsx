export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
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
  );
}
