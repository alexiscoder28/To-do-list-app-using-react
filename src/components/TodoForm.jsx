export default function TodoForm({ newItem, setNewItem, handleSubmit }) {
  return (
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
  );
}
