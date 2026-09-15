import { useState, useEffect } from "react";
import StatCards from "./StatCards";
import TicketList from "./TicketList";

function ITStaffDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/tickets")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
      });
  }, []);
  const open = tickets.filter((ticket) => ticket.status === "Open").length;
  const inProgress = tickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;
  const Resolved = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTickets =
    statusFilter === "All"
      ? tickets
      : tickets.filter((ticket) => ticket.status === statusFilter);
  return (
    <div>
      <h2>IT Staff Dashboard</h2>
      <StatCards open={open} inProgress={inProgress} resolved={Resolved} />
      <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
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
