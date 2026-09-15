import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCards from '../StatCards/StatCards';
import TicketList from '../TicketList/TicketList';
import api from '../../services/api';

function ITStaffDashboard() {
  const [tickets, setTickets] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

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

  return (
    <div>
      <h2>IT Staff Dashboard</h2>

      <Link to="/tickets/new">
        <button>New Ticket</button>
      </Link>

      <Link to="/categories">
        <button>Manage Categories</button>
      </Link>

      <StatCards
        open={open}
        inProgress={inProgress}
        resolved={resolved}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>

      <TicketList tickets={filteredTickets} />
    </div>
  );
}

export default ITStaffDashboard;

