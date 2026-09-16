import './StatCards.css';
function StatCards({ open, inProgress, resolved }) {
  return (
    <section className="employee-stats">
      <div className="employee-stat-card">
        <span className="stat-label">OPEN</span>
        <strong>{open}</strong>
        <span className="stat-description">Tickets currently open</span>
      </div>

      <div className="employee-stat-card">
        <span className="stat-label">IN PROGRESS</span>
        <strong>{inProgress}</strong>
        <span className="stat-description">Tickets being handled</span>
      </div>

      <div className="employee-stat-card">
        <span className="stat-label">RESOLVED</span>
        <strong>{resolved}</strong>
        <span className="stat-description">Completed tickets</span>
      </div>
    </section>
  );
}

export default StatCards;