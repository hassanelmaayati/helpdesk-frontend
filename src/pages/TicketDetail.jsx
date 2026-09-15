import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getTicket, deleteTicket } from '../services/ticketService';
import { useAuth } from '../context/useAuth';
import CommentList from '../components/CommentList/CommentList';

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    getTicket(id).then((res) => setTicket(res.data));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Delete this ticket?')) {
      await deleteTicket(id);
      navigate('/employee-dashboard');
    }
  };

  if (!ticket) return <div>Loading...</div>;

  const isOwner = ticket.createdBy._id === user._id;

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>Status: {ticket.status}</p>
      <p>Category: {ticket.category.name}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Description: {ticket.description}</p>
      <p>Contact Info: {ticket.contactInfo}</p>

      {isOwner && (
        <div>
          <Link to={`/tickets/${id}/edit`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <CommentList ticketId={id} token={token} />
    </div>
  );
}

export default TicketDetail;