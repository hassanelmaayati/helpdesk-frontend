import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getTicket,
  deleteTicket,
  updateTicketStatus
} from '../services/ticketService';
import { useAuth } from '../context/useAuth';
import CommentList from '../components/CommentList/CommentList';
import CommentForm from '../components/CommentForm/CommentForm';
import Sidebar from '../components/Sidebar/Sidebar';
import './TicketDetail.css';

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [editingComment, setEditingComment] = useState(null);
  const [commentsRefresh, setCommentsRefresh] = useState(0);

  useEffect(() => {
    getTicket(id)
      .then((res) => {
        setTicket(res.data);
        setStatus(res.data.status);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Delete this ticket?')) {
      try {
        await deleteTicket(id);
        navigate('/employee-dashboard');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleStatusUpdate = async () => {
    try {
      const res = await updateTicketStatus(id, status);
      setTicket(res.data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCommentAdded = () => {
    setCommentsRefresh((previous) => previous + 1);
  };

  const handleCommentUpdated = () => {
    setEditingComment(null);
    setCommentsRefresh((previous) => previous + 1);
  };

  if (!ticket) {
    return (
      <div className="ticket-detail-loading">
        {error || 'Loading...'}
      </div>
    );
  }

  const createdById =
    ticket.createdBy?._id ||
    ticket.createdBy?.id ||
    ticket.createdBy;

  const userId = user?._id || user?.id;

  const isOwner = createdById === userId;
  const isITStaff = user?.role === 'it-staff';

  const category =
    typeof ticket.category === 'object'
      ? ticket.category?.name || '—'
      : ticket.category || '—';

  const priority =
    typeof ticket.priority === 'object'
      ? ticket.priority?.name || '—'
      : ticket.priority || '—';

  const ticketStatus =
    typeof ticket.status === 'object'
      ? ticket.status?.name || '—'
      : ticket.status || '—';

  const statusClass = ticketStatus
    .toLowerCase()
    .replace(/\s+/g, '-');

  return (
    <div className="ticket-detail-layout">
      <Sidebar />

      <main className="ticket-detail-page">
        <header className="ticket-detail-header">
          <h2>Ticket Details</h2>
          <p>View and manage your support ticket</p>
        </header>

        <div className="ticket-detail-container">
          <div className="ticket-detail-top">
            <div>
              <h1>{ticket.title}</h1>
            </div>

            <span
              className={`ticket-detail-status status-${statusClass}`}
            >
              {ticketStatus}
            </span>
          </div>

          <div className="ticket-detail-info">
            <div className="ticket-info-item">
              <span className="ticket-info-label">
                Category
              </span>
              <span className="ticket-info-value">
                {category}
              </span>
            </div>

            <div className="ticket-info-item">
              <span className="ticket-info-label">
                Priority
              </span>
              <span className="ticket-info-value">
                {priority}
              </span>
            </div>

            <div className="ticket-info-item">
              <span className="ticket-info-label">
                Status
              </span>
              <span className="ticket-info-value">
                {ticketStatus}
              </span>
            </div>

            <div className="ticket-info-item">
              <span className="ticket-info-label">
                Contact
              </span>
              <span className="ticket-info-value">
                {ticket.contactInfo || '—'}
              </span>
            </div>
          </div>

          <div className="ticket-detail-section">
            <h3>Description</h3>
            <p>{ticket.description}</p>
          </div>

          {(isITStaff || isOwner) && (
            <div className="ticket-detail-actions">
              {isITStaff && (
                <>
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="ticket-status-select"
                  >
                    <option value="Open">Open</option>
                    <option value="In-Progress">
                      In progress
                    </option>
                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>

                  <button
                    onClick={handleStatusUpdate}
                    className="ticket-update-button"
                  >
                    Update status
                  </button>
                </>
              )}

              {isOwner && (
                <>
                  <Link
                    to={`/tickets/${id}/edit`}
                    className="ticket-edit-button"
                  >
                    Edit ticket
                  </Link>

                  <button
                    onClick={handleDelete}
                    className="ticket-delete-button"
                  >
                    Delete ticket
                  </button>
                </>
              )}
            </div>
          )}

          {error && (
            <p className="ticket-detail-error">
              {error}
            </p>
          )}
        </div>

        <div className="ticket-comments-container">
          <div className="ticket-comments-header">
            <h3>Comments</h3>
          </div>

          <CommentForm
            key={editingComment?._id || 'new-comment'}
            ticketId={id}
            editingComment={editingComment}
            onCommentAdded={handleCommentAdded}
            onCommentUpdated={handleCommentUpdated}
            onCancelEdit={() => setEditingComment(null)}
          />

          <CommentList
            ticketId={id}
            refresh={commentsRefresh}
            onEdit={setEditingComment}
          />
        </div>
      </main>
    </div>
  );
}

export default TicketDetail;
