import { useState, useEffect } from 'react'
import StatCards from './StatCards'
import TicketList from './TicketList'

const [tickets, setTickets] = useState([])

function ITStaffDashboard(){
    useEffect(() => {
  fetch('http://localhost:3001/tickets')
    .then((response) => response.json())
    .then((data) => {
      setTickets(data)
    })
}, [])
    const open = tickets.filter((ticket) => ticket.status === 'Open').length
    const inProgress = tickets.filter((ticket) => ticket.status === 'In Progress').length
    const Resolved = tickets.filter((ticket) => ticket.status === 'Resolved').length
  return (
  <div>
    <h2>IT Staff Dashboard</h2>
    <StatCards open={open} inProgress={inProgress} resolved={resolved} />
    <TicketList tickets={tickets} />
  </div>
)

}

export default ITStaffDashboard;