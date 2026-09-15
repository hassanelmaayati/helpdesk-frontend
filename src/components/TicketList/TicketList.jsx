import { Link } from 'react-router-dom';

function TicketList({ tickets }) {
  return (
    <div>
      <h2>Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket._id}>
          <Link to={`/tickets/${ticket._id}`}>
            <h3>{ticket.title}</h3>
          </Link>
          <p>{ticket.status}</p>
          <p>{ticket.priority}</p>
        <p>{ticket.category ? ticket.category.name : 'No category'}</p>
        </div>
      ))}
    </div>
  )
}

export default TicketList