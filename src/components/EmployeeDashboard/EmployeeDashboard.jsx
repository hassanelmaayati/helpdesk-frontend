import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import TicketList from '../TicketList/TicketList';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = user?._id || user?.id;

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get('/tickets');

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.tickets || [];

        setTickets(
          data.filter((ticket) => {
            const createdById =
              ticket.createdBy?._id ||
              ticket.createdBy?.id ||
              ticket.createdBy;

            return createdById === userId;
          })
        );
      } catch {
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [userId]);

  const openTickets = tickets.filter(
    (ticket) => ticket.status === 'Open'
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === 'In-Progress'
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === 'Resolved'
  ).length;

  const recentTickets = [...tickets]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 6);

  return (
    <div className="employee-dashboard-layout">
      <Sidebar />

      <main className="employee-dashboard-content">
        <header className="employee-dashboard-header">
          <div>
            <h1>Employee Dashboard</h1>
            <p>Overview of your support requests</p>
          </div>
        </header>

        <section className="employee-stats">
          <div className="employee-stat-card">
            <span className="stat-label">Open Tickets</span>
            <strong>{openTickets}</strong>
            <span className="stat-description">
              Requests currently open
            </span>
          </div>

          <div className="employee-stat-card">
            <span className="stat-label">In-Progress</span>
            <strong>{inProgressTickets}</strong>
            <span className="stat-description">
              Requests being handled
            </span>
          </div>

          <div className="employee-stat-card">
            <span className="stat-label">Resolved</span>
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
              View All
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
