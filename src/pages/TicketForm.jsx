import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getCategories,
  createTicket,
  getTicket,
  updateTicket
} from '../services/ticketService';
import Sidebar from '../components/Sidebar/Sidebar';
import './TicketForm.css';

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

    const payload = {
      title,
      description,
      priority,
      category,
      contactInfo
    };

    try {
      if (isEdit) {
        await updateTicket(id, payload);
        navigate(`/tickets/${id}`);
      } else {
        const res = await createTicket(payload);
        navigate(`/tickets/${res.data._id}`);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 'Something went wrong'
      );
    }
  };

  return (
    <div className="ticket-page-layout">
      <Sidebar />

      <main className="ticket-form-page">
        <header className="ticket-form-header">
          <h2>
            {isEdit ? 'EDIT TICKET' : 'CREATE NEW TICKET'}
          </h2>

          <p>
            {isEdit
              ? 'Update the information for your support request'
              : 'Submit a support request to the IT team'}
          </p>
        </header>

        <div className="ticket-form-container">
          <form
            onSubmit={handleSubmit}
            className="ticket-form"
          >
            <div className="ticket-form-field">
              <label htmlFor="ticket-title">
                TITLE
              </label>

              <input
                id="ticket-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a short title for your issue"
                required
              />
            </div>

            <div className="ticket-form-row">
              <div className="ticket-form-field">
                <label htmlFor="ticket-category">
                  CATEGORY
                </label>

                <select
                  id="ticket-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ticket-form-field">
                <label htmlFor="ticket-priority">
                  PRIORITY
                </label>

                <select
                  id="ticket-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="ticket-form-field">
              <label htmlFor="ticket-description">
                DESCRIPTION
              </label>

              <textarea
                id="ticket-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue and provide any relevant details..."
                required
              />
            </div>

            <div className="ticket-form-field">
              <label htmlFor="ticket-contact">
                CONTACT INFORMATION
              </label>

              <input
                id="ticket-contact"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="Enter your preferred contact information"
                required
              />
            </div>

            {error && (
              <p className="ticket-form-error">
                {error}
              </p>
            )}

            <div className="ticket-form-actions">
              <button
                type="button"
                className="ticket-cancel-button"
                onClick={() => navigate(-1)}
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="ticket-submit-button"
              >
                {isEdit ? 'UPDATE TICKET' : 'SUBMIT TICKET'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default TicketForm;