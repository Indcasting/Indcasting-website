"use client";

const auditions = [
  {
    title: "Netflix Screen Test",
    date: "12 Aug 2026",
    time: "11:00 AM",
  },
  {
    title: "Lakmé Portfolio Review",
    date: "16 Aug 2026",
    time: "2:00 PM",
  },
  {
    title: "Sony Music Dance Round",
    date: "21 Aug 2026",
    time: "4:30 PM",
  },
];

export default function UpcomingAuditions() {
  return (
    <section className="upcoming-auditions">
      <div className="card-header">
        <h2>Upcoming Auditions</h2>
      </div>

      <div className="audition-list">
        {auditions.map((audition, index) => (
          <div className="audition-card" key={index}>
            <div>
              <h3>{audition.title}</h3>

              <p>{audition.date}</p>
            </div>

            <span>{audition.time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}