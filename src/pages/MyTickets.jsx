import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TicketList from "../components/TicketList/TicketList";
import api from "../services/api";
import "./MyTickets.css";

function MyTickets({ currentUser }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    api.get("/tickets")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTickets(res.data);
        } else if (res.data && Array.isArray(res.data.tickets)) {
          setTickets(res.data.tickets);
        }
      })
      .catch((err) => console.error("Failed to fetch tickets:", err));
  }, []);

  return (
    <div className="dashboard-fullscreen-layout">
      <Sidebar currentUser={currentUser} />

      <main className="main-content inbox-page-container">
        <div className="inbox-page-header">
          <h2>MY TICKETS</h2>
          <p className="sub-header-text">
            Manage and update your active support cases
          </p>
        </div>

        <div className="filter-pill-bar">
          <div className="pill-input">
            <span className="pill-label">SEARCH</span>
            <input
              type="text"
              placeholder="Search by ID or Subject..."
              className="pill-search-input"
            />
          </div>

          <div className="pill-input">
            <span className="pill-label">PRIORITY</span>
            <span className="pill-value">ALL LEVELS</span>
          </div>

          <div className="pill-input">
            <span className="pill-label">STATUS</span>
            <span className="pill-value">OPEN TICKETS</span>
          </div>

          <button className="search-pill-btn">
            FILTER
          </button>
        </div>

        <div className="tickets-inbox-wrapper">
          <TicketList tickets={tickets} />
        </div>
      </main>
    </div>
  );
}

export default MyTickets;