import { useState } from 'react'
import TicketList from './TicketList'
function EmployeeDashboard(){
    const [tickets, setTickets] = useState([])
  
   return (
    <TicketList tickets={tickets} />

   )
}

export default EmployeeDashboard;