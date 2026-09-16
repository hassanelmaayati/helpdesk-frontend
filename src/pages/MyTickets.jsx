import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import api from "../services/api";
import "./MyTickets.css";
function MyTickets() {

  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("ALL LEVELS");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  useEffect(() => {
    api
      .get("/tickets/my")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTickets(res.data);
        } else if (res.data && Array.isArray(res.data.tickets)) {
          setTickets(res.data.tickets);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch tickets:", err);
      });
  }, []);

 

const filteredTickets = tickets.filter((ticket) => {
        const title = ticket.title || "";
    const search = searchTerm.toLowerCase().trim();

    const matchesSearch = title.toLowerCase().includes(search);

    const status =
      typeof ticket.status === "object"
        ? ticket.status?.name || ""
        : ticket.status || "";

    const normalizedStatus = status.toLowerCase();

    let matchesStatus = true;

    if (selectedStatus === "OPEN") {
      matchesStatus = normalizedStatus === "open";
    } else if (selectedStatus === "IN PROGRESS") {
      matchesStatus =
        normalizedStatus === "in-progress" ||
        normalizedStatus === "in progress";
    } else if (selectedStatus === "RESOLVED") {
      matchesStatus = normalizedStatus === "resolved";
    }

    const priority =
      typeof ticket.priority === "object"
        ? ticket.priority?.name || ""
        : ticket.priority || "";

    let matchesPriority = true;

    if (selectedPriority !== "ALL LEVELS") {
      matchesPriority =
        priority.toLowerCase() === selectedPriority.toLowerCase();
    }

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-fullscreen-layout">
      <Sidebar />

      <main className="main-content inbox-page-container">
        <div className="inbox-page-header">
          <h2>My Tickets</h2>

          <p className="sub-header-text">
            View and track your IT support requests
          </p>
        </div>

        <div className="filter-pill-bar">
          <div className="pill-input">
            <span className="pill-label">Search</span>

            <input
              type="text"
              placeholder="Search by ticket title..."
              className="pill-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pill-input">
            <span className="pill-label">Priority</span>

            <select
              className="pill-select-input"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="ALL LEVELS">All priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent!">Urgent</option>
            </select>
          </div>

          <div className="pill-input">
            <span className="pill-label">Status</span>

            <select
              className="pill-select-input"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="ALL">All statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN PROGRESS">In progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>

        <div className="tickets-inbox-wrapper">
          {filteredTickets.length === 0 ? (
            <div className="dashboard-message">
              No tickets found.
            </div>
          ) : (
            <div className="ticket-grid-container">
              {filteredTickets.map((ticket, index) => {
                const ticketId = ticket._id || ticket.id || "";

                const title = ticket.title || "Untitled ticket";

                const category =
                  typeof ticket.category === "object"
                    ? ticket.category?.name || "—"
                    : ticket.category || "—";

                const priority =
                  typeof ticket.priority === "object"
                    ? ticket.priority?.name || "—"
                    : ticket.priority || "—";

                const status =
                  typeof ticket.status === "object"
                    ? ticket.status?.name || "—"
                    : ticket.status || "—";

                const statusClass = status
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                return (
                  <div
                    className="ticket-card-item"
                    key={ticketId || index}
                  >
                    <div className="ticket-card-top">
                      <span
                        className={`ticket-status-badge status-${statusClass}`}
                      >
                        {status}
                      </span>
                    </div>

                    <div className="ticket-card-subj">
                      {title}
                    </div>

                    <div className="ticket-card-details">
                      <div>
                        <span className="detail-lbl">
                          Category
                        </span>

                        <span className="detail-value">
                          {category}
                        </span>
                      </div>

                      <div>
                        <span className="detail-lbl">
                          Priority
                        </span>

                        <span className="detail-value">
                          {priority}
                        </span>
                      </div>

                      <div>
                        <span className="detail-lbl">
                          Status
                        </span>

                        <span className="detail-value">
                          {status}
                        </span>
                      </div>

                      <div>
                        <span className="detail-lbl">
                          Created
                        </span>

                        <span className="detail-value">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="ticket-card-footer">
                      <Link
                        to={`/tickets/${ticketId}`}
                        className="view-details-btn"
                      >
                        View details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MyTickets;