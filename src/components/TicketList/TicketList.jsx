import { Link } from 'react-router-dom';
import './TicketList.css';

function TicketList({ tickets = [] }) {
  return (
    <div className="inbox-container">
      <div className="inbox-ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            const ticketId = ticket._id || ticket.id || '';

            const title =
              ticket.title || 'Ticket Title';

            const category =
              ticket.category?.name || 'No Category';

            const priority =
              ticket.priority || 'No Priority';

            const status =
              ticket.status || 'Open';

            const displayStatus =
              status === 'In-Progress'
                ? 'In Progress'
                : status;

            return (
              <Link
                to={`/tickets/${ticketId}`}
                key={ticketId || index}
                className="inbox-ticket-card"
              >
                <div className="card-left-section">
                  <div className="ticket-details">
                    <div className="ticket-title-row">
                      <span className="ticket-subject">
                        {title}
                      </span>
                    </div>

                    <div className="ticket-meta">
                      <span>Category:</span>
                      <strong>{category}</strong>

                      <span className="meta-separator">•</span>

                      <span>Priority:</span>
                      <strong>{priority}</strong>
                    </div>
                  </div>
                </div>

                <div className="card-right-section">
                  <span
                    className={`status-badge ${status
                      .toLowerCase()
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')}`}
                  >
                    {displayStatus}
                  </span>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="empty-state-text">
            No tickets found.
          </p>
        )}
      </div>
    </div>
  );
}

export default TicketList;