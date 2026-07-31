export default function TalentDashboard() {
  return (
    <main className="dashboard-page">
      <h1>Talent Dashboard</h1>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>12</h2>
          <p>Applications</p>
        </div>

        <div className="dashboard-card">
          <h2>8</h2>
          <p>Auditions</p>
        </div>

        <div className="dashboard-card">
          <h2>5</h2>
          <p>Messages</p>
        </div>

        <div className="dashboard-card">
          <h2>89%</h2>
          <p>Profile Complete</p>
        </div>
      </div>

      <section className="dashboard-section">
        <h2>Recent Applications</h2>

        <div className="casting-card">
          <h3>Lead Actor</h3>
          <p>Dream Studio</p>
          <span>Applied 2 days ago</span>
        </div>

        <div className="casting-card">
          <h3>Fashion Model</h3>
          <p>Elite Models</p>
          <span>Applied yesterday</span>
        </div>
      </section>
    </main>
  );
}