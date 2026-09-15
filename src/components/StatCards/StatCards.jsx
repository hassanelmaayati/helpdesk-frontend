function StatCards({ open, inProgress, resolved }) {
  return (
    <section>
      <div>
        <h3>Open</h3>
        <p>{open}</p>
      </div>
      <div>
        <h3>In Progress</h3>
        <p>{inProgress}</p>
      </div>
      <div>
        <h3>Resolved</h3>
        <p>{resolved}</p>
      </div>
    </section>
  );
}

export default StatCards;