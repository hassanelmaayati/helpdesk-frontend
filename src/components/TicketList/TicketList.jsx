import React from 'react';
import { Link } from 'react-router-dom';
import './TicketList.css';

function TicketList({ tickets = [] }) {
  return (
    <div className="inbox-container">
      <div className="inbox-toolbar">
        <input type="checkbox" className="select-all-checkbox" />

        <select className="toolbar-select">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>

      <div className="inbox-ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => {
            const ticketId = ticket._id || ticket.id || '';
            const shortId = ticketId
              ? ticketId.slice(-6).toUpperCase()
              : `00000${index + 1}`;

            const subject =
              ticket.subject || ticket.title || 'Ticket Subject';

            const status = ticket.status || 'Open';

            const creator =
              ticket.createdBy?.name ||
              ticket.user?.name ||
              ticket.createdByName ||
              'User';

            const assignedTo =
              ticket.assignedTo?.name ||
              ticket.assignedTo ||
              'Unassigned';

            const department =
              ticket.department || 'Support';

            const messageCount =
              ticket.messages?.length || 1;

            return (
              <Link
                to={`/tickets/${ticketId}`}
                key={ticketId || index}
                className="inbox-ticket-card"
              >
                <div className="card-left-section">
                  <input
                    type="checkbox"
                    className="ticket-checkbox"
                    onClick={(event) => event.stopPropagation()}
                  />

                  <div className="user-avatar">
                    {creator.charAt(0).toUpperCase()}
                  </div>

                  <div className="ticket-details">
                    <div className="ticket-title-row">
                      <span className="ticket-ref-id">
                        (#{shortId})
                      </span>

                      <span className="ticket-subject">
                        {subject}
                      </span>

                      <span className="ticket-message-count">
                        ({messageCount})
                      </span>

                      <span className="ticket-unread-dot"></span>
                    </div>

                    <div className="ticket-meta">
                      <span>From:</span>
                      <strong>{creator}</strong>

                      <span className="meta-separator">•</span>

                      <span>Assigned To:</span>
                      <strong
                        className={
                          assignedTo === 'Unassigned'
                            ? 'unassigned'
                            : ''
                        }
                      >
                        {assignedTo}
                      </strong>

                      <span className="meta-separator">•</span>

                      <span>Department:</span>
                      <strong>{department}</strong>
                    </div>
                  </div>
                </div>

                <div className="card-right-section">
                  <span
                    className={`status-badge ${status
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    {status}
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