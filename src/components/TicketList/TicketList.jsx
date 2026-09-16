import React from 'react';
import './TicketList.css';

function TicketList({ tickets = [] }) {
  return (
    <div className="inbox-container">
      {/* Action Toolbar */}
      <div className="inbox-toolbar">
        <input type="checkbox" className="select-all-checkbox" />
        <select className="toolbar-select">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
      </div>

      {/* Ticket List View */}
      <div className="inbox-ticket-list">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <div key={ticket.id || ticket._id || index} className="inbox-ticket-card">
              <div className="card-left-section">
                <input type="checkbox" className="ticket-checkbox" />
                <div className="user-avatar">
                  {ticket.createdByName ? ticket.createdByName.charAt(0) : 'U'}
                </div>
                <div className="ticket-details">
                  <div className="ticket-title-row">
                    <span className="ticket-ref-id">
                      (#{ticket.ticketId || ticket.id || `HOSK-AAA4-00${index + 1}`})
                    </span>
                    <span className="ticket-subject">
                      {ticket.title || ticket.subject || 'Ticket Subject'}
                    </span>
                  </div>
                  <div className="ticket-meta">
                    From: <span className="meta-bold">{ticket.createdByName || 'User'}</span> | 
                    Assigned To: <span className="meta-bold">{ticket.assignedTo || 'Unassigned'}</span> | 
                    Department: <span className="meta-highlight">{ticket.department || 'Support'}</span>
                  </div>
                </div>
              </div>

              <div className="card-right-section">
                <span className={`status-badge ${ticket.priority?.toLowerCase() === 'high' ? 'overdue' : 'due-today'}`}>
                  {ticket.priority?.toLowerCase() === 'high' ? 'Overdue' : 'Due Today'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state-text">No tickets found.</p>
        )}
      </div>
    </div>
  );
}

export default TicketList;