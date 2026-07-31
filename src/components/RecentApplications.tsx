"use client";

const applications = [
  {
    role: "Lead Actor",
    company: "Netflix India",
    status: "Shortlisted",
    date: "2 days ago",
  },
  {
    role: "Fashion Model",
    company: "Lakme Fashion Week",
    status: "Pending",
    date: "Yesterday",
  },
  {
    role: "Music Video Dancer",
    company: "Sony Music",
    status: "Rejected",
    date: "5 days ago",
  },
  {
    role: "TV Commercial",
    company: "Amazon Prime",
    status: "Interview",
    date: "Today",
  },
];

export default function RecentApplications() {
  return (
    <section className="recent-applications">
      <div className="card-header">
        <h2>Recent Applications</h2>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      <div className="applications-list">
        {applications.map((item, index) => (
          <div
            className="application-card"
            key={index}
          >
            <div className="application-left">
              <h3>{item.role}</h3>
              <p>{item.company}</p>
            </div>

            <div className="application-right">
              <span
                className={`status ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>

              <small>{item.date}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}