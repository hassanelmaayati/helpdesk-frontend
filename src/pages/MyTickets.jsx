import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { useAuth } from "../context/useAuth";
import api from "../services/api";
import "./MyTickets.css";

function MyTickets() {
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("ALL LEVELS");
  const [selectedStatus, setSelectedStatus] = useState("OPEN TICKETS");

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

  const myTickets = tickets.filter((ticket) => {
    const createdById =
      ticket.createdBy?._id ||
      ticket.createdBy?.id ||
      ticket.createdBy;

    return createdById === user?._id || createdById === user?.id;
  });

  const filteredTickets = myTickets.filter((ticket) => {
    const ticketId = ticket._id || ticket.id || "";
    const shortId = ticketId ? ticketId.slice(-6).toUpperCase() : "";
    const subject = ticket.subject || ticket.title || "";

    const matchesSearch =
      shortId.includes(searchTerm.toUpperCase()) ||
      subject.toLowerCase().includes(searchTerm.toLowerCase());

    const status = (ticket.status || "Open").toLowerCase();

    let matchesStatus = true;

    if (selectedStatus === "OPEN TICKETS") {
      matchesStatus = status === "open";
    } else if (selectedStatus === "IN PROGRESS") {
      matchesStatus =
        status === "in progress" ||
        status === "in-progress";
    } else if (selectedStatus === "RESOLVED") {
      matchesStatus =
        status === "resolved" ||
        status === "closed";
    } else if (selectedStatus === "ALL") {
      matchesStatus = true;
    }

    const priority = (ticket.priority || "").toLowerCase();

    let matchesPriority = true;

    if (selectedPriority !== "ALL LEVELS") {
      matchesPriority =
        priority === selectedPriority.toLowerCase();
    }

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="dashboard-fullscreen-layout">
      <Sidebar />

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="pill-input">
            <span className="pill-label">PRIORITY</span>

            <select
              className="pill-select-input"
              value={selectedPriority}
              onChange={(e) =>
                setSelectedPriority(e.target.value)
              }
            >
              <option value="ALL LEVELS">ALL LEVELS</option>
              <option value="Low">LOW</option>
              <option value="Medium">MEDIUM</option>
              <option value="High">HIGH</option>
              <option value="Urgent">URGENT</option>
            </select>
          </div>

          <div className="pill-input">
            <span className="pill-label">STATUS</span>

            <select
              className="pill-select-input"
              value={selectedStatus}
              onChange={(e) =>
                setSelectedStatus(e.target.value)
              }
            >
              <option value="OPEN TICKETS">
                OPEN TICKETS
              </option>

              <option value="IN PROGRESS">
                IN PROGRESS
              </option>

              <option value="RESOLVED">
                RESOLVED
              </option>

              <option value="ALL">
                ALL STATUS
              </option>
            </select>
          </div>

          <button className="search-pill-btn">
            FILTER
          </button>
        </div>

        <div className="tickets-inbox-wrapper">
          {filteredTickets.length === 0 ? (
            <div className="dashboard-message">
              No tickets found.
            </div>
          ) : (
            <div className="ticket-grid-container">
              {filteredTickets.map((ticket, index) => {
                const ticketId =
                  ticket._id || ticket.id || "";

                const shortId = ticketId
                  ? ticketId.slice(-6).toUpperCase()
                  : "000000";

                const subject =
                  ticket.subject ||
                  ticket.title ||
                  "No Subject";

                const status =
                  ticket.status || "Open";

                const creator =
                  ticket.createdBy?.name ||
                  ticket.user?.name ||
                  "Test Employee";

                const assignedTo =
                  ticket.assignedTo?.name ||
                  "Unassigned";

                const department =
                  ticket.department ||
                  "Support";

                const messageCount =
                  ticket.messages?.length || 1;

                return (
                  <div
                    className="ticket-card-item"
                    key={ticketId || index}
                  >
                    <div className="ticket-card-top">
                      <div className="ticket-card-user-info">
                        <div className="ticket-card-avatar">
                          👤
                        </div>

                        <span className="ticket-card-id">
                          #{shortId}
                        </span>

                        <span className="ticket-card-count">
                          ({messageCount})
                        </span>

                        <span className="ticket-card-dot"></span>
                      </div>

                      <span className="ticket-card-status-dot"></span>
                    </div>

                    <div className="ticket-card-subj">
                      SUBJ: {subject}
                    </div>

                    <div className="ticket-card-details">
                      <div>
                        <span className="detail-lbl">
                          REQUESTER:
                        </span>{" "}
                        REQ: {creator}
                      </div>

                      <div>
                        <span className="detail-lbl">
                          ASSIGNED TO:
                        </span>{" "}
                        {assignedTo}
                      </div>

                      <div>
                        <span className="detail-lbl">
                          DEPARTMENT:
                        </span>{" "}
                        {department}
                      </div>
                    </div>

                    <div className="ticket-card-footer">
                      <Link
                        to={`/tickets/${ticketId}`}
                        className="view-details-btn"
                      >
                        VIEW DETAILS
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