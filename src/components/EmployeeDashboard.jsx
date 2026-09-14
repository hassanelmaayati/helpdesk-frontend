import { useState, useEffect } from 'react'
import TicketList from './TicketList'
function EmployeeDashboard(){
    const [tickets, setTickets] = useState([])
    useEffect(() => {
  fetch('http://localhost:3001/tickets')
    .then((response) => response.json())
    .then((data) => {
      setTickets(data)
    })
}, [])
  
   return (
    <TicketList tickets={tickets} />

   )
}

export default EmployeeDashboard;