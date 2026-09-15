import { useState, useEffect } from 'react';
import TicketList from '../TicketList/TicketList';
import api from '../../services/api';

function EmployeeDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get('/tickets').then((res) => setTickets(res.data));
  }, []);

  return <TicketList tickets={tickets} />;
}

export default EmployeeDashboard;