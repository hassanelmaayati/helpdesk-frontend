function TicketList({ tickets }) {
  return (
    <div>
      <h2>Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket._id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.status}</p>
        </div>
      ))}
    </div>
  )
}

export default TicketList