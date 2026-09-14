
function TicketList({Tickets}){
   return (
    <div>

       {tickets.map((ticket) => (
      <h3 key={ticket._id}>{ticket.title}</h3>

))}
         
         
    </div>
   

   )

}

export default TicketList;