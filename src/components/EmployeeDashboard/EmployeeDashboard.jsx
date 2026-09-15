import api from '../../services/api'
import { useState, useEffect } from 'react'
import TicketList from '../TicketList/TicketList'
function EmployeeDashboard(){
    const [tickets, setTickets] = useState([])
    useEffect(() => {
 api.get('/tickets')
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