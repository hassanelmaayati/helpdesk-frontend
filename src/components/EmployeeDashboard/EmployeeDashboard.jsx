import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TicketList from '../TicketList/TicketList';
import api from '../../services/api';

function EmployeeDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get('/tickets').then((res) => setTickets(res.data));
  }, []);

  return (
    <>
      <h1>Employee Dashboard</h1>

      <Link to="/tickets/new">
        <button>New Ticket</button>
      </Link>

      <TicketList tickets={tickets} />
    </>
  );
}

export default EmployeeDashboard;