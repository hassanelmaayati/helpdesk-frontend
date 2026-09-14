import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories, createTicket, getTicket, updateTicket } from '../services/ticketService';

function TicketForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (isEdit) {
      getTicket(id).then((res) => {
        const t = res.data;
        setTitle(t.title);
        setDescription(t.description);
        setPriority(t.priority);
        setCategory(t.category._id);
        setContactInfo(t.contactInfo);
      });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = { title, description, priority, category, contactInfo };
    try {
      if (isEdit) {
        await updateTicket(id, payload);
        navigate(`/tickets/${id}`);
      } else {
        const res = await createTicket(payload);
        navigate(`/tickets/${res.data._id}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Ticket' : 'New Ticket'}</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />

        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>

        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />

        <input value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="Contact Info" required />

        <button type="submit">{isEdit ? 'Update' : 'Submit'}</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default TicketForm;