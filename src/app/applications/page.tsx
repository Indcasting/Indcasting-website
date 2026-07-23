export default function ApplicationsPage() {
  return (
    <div className="applications-page">

      <h1>My Applications</h1>

      <p>Track every audition and casting application you've submitted.</p>

      <div className="application-card">

        <h3>Lead Female Actor</h3>

        <p>Production House: Star Studios</p>

        <p>Location: Mumbai</p>

        <span className="status pending">Pending</span>

      </div>

      <div className="application-card">

        <h3>Fashion Model</h3>

        <p>Production House: Elite Fashion</p>

        <p>Location: Delhi</p>

        <span className="status accepted">Accepted</span>

      </div>

      <div className="application-card">

        <h3>Music Video Dancer</h3>

        <p>Production House: Rhythm Productions</p>

        <p>Location: Bengaluru</p>

        <span className="status rejected">Rejected</span>

      </div>

    </div>
  );
}