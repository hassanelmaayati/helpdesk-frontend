import './StatCards.css';
function StatCards({ open, inProgress, resolved }) {
  return (
    <section className="employee-stats">
      <div className="employee-stat-card">
        <span className="stat-label">Open</span>
        <strong>{open}</strong>
        <span className="stat-description">Tickets currently open</span>
      </div>

      <div className="employee-stat-card">
        <span className="stat-label">In Progress</span>
        <strong>{inProgress}</strong>
        <span className="stat-description">Tickets being handled</span>
      </div>

      <div className="employee-stat-card">
        <span className="stat-label">Resolved</span>
        <strong>{resolved}</strong>
        <span className="stat-description">Completed tickets</span>
      </div>
    </section>
  );
}

export default StatCards;