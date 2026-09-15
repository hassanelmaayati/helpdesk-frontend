import { useEffect, useState } from 'react';
import api from '../services/api';

function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.get('/categories').then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await api.post('/categories', { name });
    setCategories((current) => [...current, res.data]);
    setName('');
  };

  const handleDelete = async (id) => {
    await api.delete(`/categories/${id}`);
    setCategories((current) => current.filter((c) => c._id !== id));
  };

  const handleUpdate = async (id) => {
    const res = await api.put(`/categories/${id}`, { name });
    setCategories((current) => current.map((c) => (c._id === id ? res.data : c)));
    setName('');
    setEditId(null);
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit">Add Category</button>
      </form>
      {categories.map((category) => (
        <div key={category._id}>
          {editId === category._id ? (
            <input value={name} onChange={(event) => setName(event.target.value)} />
          ) : (
            <p>{category.name}</p>
          )}
          <button onClick={() => handleDelete(category._id)}>Delete</button>
          {editId === category._id ? (
            <button onClick={() => handleUpdate(category._id)}>Save</button>
          ) : (
            <button
              onClick={() => {
                setEditId(category._id);
                setName(category.name);
              }}
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ManageCategories;