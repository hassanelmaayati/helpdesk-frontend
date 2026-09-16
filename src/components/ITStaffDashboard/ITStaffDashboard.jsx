import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StatCards from '../StatCards/StatCards';
import TicketList from '../TicketList/TicketList';
import Sidebar from '../Sidebar/Sidebar';
import api from '../../services/api';
import './ITStaffDashboard.css';

function ITStaffDashboard() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const location = useLocation();

  useEffect(() => {
    api.get('/tickets').then((res) => setTickets(res.data));
  }, []);

  const open = tickets.filter((t) => t.status === 'Open').length;
  const inProgress = tickets.filter((t) => t.status === 'In Progress').length;
  const resolved = tickets.filter((t) => t.status === 'Resolved').length;

  const filteredTickets =
    statusFilter === 'All'
      ? tickets
      : tickets.filter((t) => t.status === statusFilter);

  const isAllTicketsPage = location.pathname === '/all-tickets';

  const displayedTickets = isAllTicketsPage
    ? filteredTickets
    : filteredTickets.slice(0, 4);

  return (
    <div className="it-dashboard-layout">
      <Sidebar />

      <main className="it-dashboard-content">
        <header className="it-dashboard-header">
          <div>
            <h1>
              {isAllTicketsPage
                ? 'ALL TICKETS'
                : 'IT STAFF DASHBOARD'}
            </h1>

            <p>
              {isAllTicketsPage
                ? 'Manage all support tickets'
                : 'Overview of support tickets'}
            </p>
          </div>

          {!isAllTicketsPage && (
            <div className="quick-action-buttons">
              <Link
                to="/tickets/new"
                className="quick-action-button primary"
              >
                NEW TICKET
              </Link>

              <Link
                to="/categories"
                className="quick-action-button"
              >
                MANAGE CATEGORIES
              </Link>
            </div>
          )}
        </header>

        {!isAllTicketsPage && (
          <section className="it-stats">
            <StatCards
              open={open}
              inProgress={inProgress}
              resolved={resolved}
            />
          </section>
        )}

        <section className="it-dashboard-section">
          <div className="it-section-header">
            <h2>Tickets</h2>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="ticket-filter"
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <TicketList tickets={displayedTickets} />
        </section>
      </main>
    </div>
  );
}

export default ITStaffDashboard;