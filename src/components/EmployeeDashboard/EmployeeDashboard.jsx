import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import TicketList from '../TicketList/TicketList';
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
    (ticket) => ticket.status === 'Open'
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === 'In-Progress'
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === 'Resolved'
  ).length;

  const recentTickets = tickets.slice(0, 4);

  return (
    <div className="employee-dashboard-layout">
      <Sidebar />

      <main className="employee-dashboard-content">
        <header className="employee-dashboard-header">
          <div>
            <h1>EMPLOYEE DASHBOARD</h1>
            <p>Overview of your support requests</p>
          </div>

          <div className="quick-action-buttons">
            <Link
              to="/tickets/new"
              className="quick-action-button primary"
            >
              NEW TICKET
            </Link>

            <Link
              to="/my-tickets"
              className="quick-action-button"
            >
              MY TICKETS
            </Link>
          </div>
        </header>

        <section className="employee-stats">
          <div className="employee-stat-card">
            <span className="stat-label">OPEN TICKETS</span>
            <strong>{openTickets}</strong>
            <span className="stat-description">
              Requests currently open
            </span>
          </div>

          <div className="employee-stat-card">
            <span className="stat-label">IN PROGRESS</span>
            <strong>{inProgressTickets}</strong>
            <span className="stat-description">
              Requests being handled
            </span>
          </div>

          <div className="employee-stat-card">
            <span className="stat-label">RESOLVED</span>
            <strong>{resolvedTickets}</strong>
            <span className="stat-description">
              Requests completed
            </span>
          </div>
        </section>

        <section className="employee-dashboard-section">
          <div className="section-header-inbox">
            <h2>Tickets</h2>

            <Link
              to="/my-tickets"
              className="view-all-link"
            >
              VIEW ALL
            </Link>
          </div>

          {loading ? (
            <div className="dashboard-message">
              Loading tickets...
            </div>
          ) : (
            <TicketList tickets={recentTickets} />
          )}
        </section>
      </main>
    </div>
  );
}

export default EmployeeDashboard;