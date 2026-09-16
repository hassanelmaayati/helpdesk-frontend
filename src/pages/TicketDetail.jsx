import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getTicket,
  deleteTicket,
  updateTicketStatus
} from '../services/ticketService';
import { useAuth } from '../context/useAuth';
import CommentList from '../components/CommentList/CommentList';
import Sidebar from '../components/Sidebar/Sidebar';
import './TicketDetail.css';

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    getTicket(id).then((res) => {
      setTicket(res.data);
      setStatus(res.data.status);
    });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Delete this ticket?')) {
      await deleteTicket(id);
      navigate('/employee-dashboard');
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await updateTicketStatus(id, status);
      setTicket(res.data);
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    }
  };

  if (!ticket) return <div className="ticket-detail-loading">Loading...</div>;

  const isOwner = ticket.createdBy._id === user._id;
  const isITStaff = user?.role === 'it-staff';

  return (
    <div className="ticket-detail-layout">
      <Sidebar />

      <main className="ticket-detail-page">
        <header className="ticket-detail-header">
          <h2>TICKET DETAILS</h2>
          <p>View and manage your support ticket</p>
        </header>

        <div className="ticket-detail-container">
          <div className="ticket-detail-top">
            <div>
              <span className="ticket-detail-id">
                #{ticket.ticketId || id}
              </span>

              <h1>{ticket.title}</h1>
            </div>

            <span
              className={`ticket-detail-status ${ticket.status
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              {ticket.status}
            </span>
          </div>

          <div className="ticket-detail-info">
            <div className="ticket-info-item">
              <span className="ticket-info-label">CATEGORY</span>
              <span className="ticket-info-value">
                {ticket.category.name}
              </span>
            </div>

            <div className="ticket-info-item">
              <span className="ticket-info-label">PRIORITY</span>
              <span className="ticket-info-value">
                {ticket.priority}
              </span>
            </div>

            <div className="ticket-info-item">
              <span className="ticket-info-label">STATUS</span>
              <span className="ticket-info-value">
                {ticket.status}
              </span>
            </div>

            <div className="ticket-info-item">
              <span className="ticket-info-label">CONTACT</span>
              <span className="ticket-info-value">
                {ticket.contactInfo}
              </span>
            </div>
          </div>

          <div className="ticket-detail-section">
            <h3>DESCRIPTION</h3>
            <p>{ticket.description}</p>
          </div>

          <div className="ticket-detail-actions">
            {isITStaff && (
              <>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="ticket-detail-status"
                >
                  <option value="Open">Open</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>

                <button
                  onClick={handleStatusUpdate}
                  className="ticket-edit-button"
                >
                  UPDATE STATUS
                </button>
              </>
            )}

            {isOwner && (
              <>
                <Link
                  to={`/tickets/${id}/edit`}
                  className="ticket-edit-button"
                >
                  EDIT TICKET
                </Link>

                <button
                  onClick={handleDelete}
                  className="ticket-delete-button"
                >
                  DELETE TICKET
                </button>
              </>
            )}
          </div>
        </div>

        <div className="ticket-comments-container">
          <div className="ticket-comments-header">
            <h3>COMMENTS</h3>
          </div>

          <CommentList ticketId={id} token={token} />
        </div>
      </main>
    </div>
  );
}

export default TicketDetail;