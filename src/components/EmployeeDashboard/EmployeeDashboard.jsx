import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import api from '../../services/api';
import './EmployeeDashboard.css';


function EmployeeDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets');

        if (Array.isArray(res.data)) {
          setTickets(res.data);
        } else if (res.data && Array.isArray(res.data.tickets)) {
          setTickets(res.data.tickets);
        } else {
          setTickets([]);
        }
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const openTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === 'open'
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) =>
      ticket.status?.toLowerCase() === 'in progress' ||
      ticket.status?.toLowerCase() === 'in-progress'
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) =>
      ticket.status?.toLowerCase() === 'resolved' ||
      ticket.status?.toLowerCase() === 'closed'
  ).length;

  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="employee-dashboard-layout">
      <Sidebar />

      <main className="employee-dashboard-content">
        <header className="employee-dashboard-header">
          <div>
            <h1>EMPLOYEE DASHBOARD</h1>
            <p>Overview of your support requests</p>
          </div>
        </header>

        {/* Stats Section */}
        <section className="employee-stats">
          <div className="employee-stat-card">
            <span className="stat-label">OPEN TICKETS</span>
            <strong>{openTickets}</strong>
            <span className="stat-description">Requests currently open</span>
          </div>

          <div className="employee-stat-card">
            <span className="stat-label">IN PROGRESS</span>
            <strong>{inProgressTickets}</strong>
            <span className="stat-description">Requests being handled</span>
          </div>

          <div className="employee-stat-card">
            <span className="stat-label">RESOLVED</span>
            <strong>{resolvedTickets}</strong>
            <span className="stat-description">Requests completed</span>
          </div>
        </section>

        {/* Inbox Section */}
        <section className="employee-dashboard-section">
          <div className="section-header-inbox">
            <div className="inbox-title-area">
              <h2>Inbox</h2>
            </div>
            <Link to="/my-tickets" className="view-all-link">
              VIEW ALL
            </Link>
          </div>

          {loading ? (
            <div className="dashboard-message">Loading tickets...</div>
          ) : recentTickets.length === 0 ? (
            <div className="dashboard-message">
              You have no support tickets in your inbox yet.
            </div>
          ) : (
            <div className="ticket-list-container">
              {recentTickets.map((ticket, index) => {
                const ticketId = ticket._id || ticket.id || '';
                const shortId = ticketId ? ticketId.slice(-6).toUpperCase() : '000000';
                const subject = ticket.subject;
                const status = ticket.status || 'Open';
                const creator = ticket.createdBy?.name || ticket.user?.name || 'Unknown';
                const assignedTo = ticket.assignedTo?.name || 'Unassigned';
                const department = ticket.department || 'Support';
                const messageCount = ticket.messages?.length || 1;

                return (
                  <Link
                    to={`/tickets/${ticketId}`}
                    className="ticket-inbox-row"
                    key={ticketId || index}
                  >
                    <div className="ticket-inbox-left">
                      <div className="ticket-inbox-avatar">👤</div>
                      
                      <div className="ticket-inbox-info">
                        <div className="ticket-inbox-title-line">
                          <span className="ticket-id-tag">
                            (#{shortId})
                          </span>
                          <span className="ticket-title-text">{subject}</span>
                          <span className="ticket-badge-count">({messageCount})</span>
                          <span className="unread-dot"></span>
                        </div>

                        <div className="ticket-inbox-meta-line">
                          <span className="meta-label">From:</span> 
                          <span className="meta-val">{creator}</span>
                          <span className="meta-separator">•</span>
                          <span className="meta-label">Assigned To:</span> 
                          <span className={`meta-val ${assignedTo === 'Unassigned' ? 'unassigned' : ''}`}>
                            {assignedTo}
                          </span>
                          <span className="meta-separator">•</span>
                          <span className="meta-label">Department:</span> 
                          <span className="meta-val">{department}</span>
                        </div>
                      </div>
                    </div>

                    <div className="ticket-inbox-right">
                      <span className={`ticket-inbox-status-tag ${status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {status}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;