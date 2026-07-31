"use client";

import { MapPin, Clock } from "lucide-react";

const castingCalls = [
  {
    role: "Lead Male Actor",
    company: "Netflix India",
    location: "Mumbai",
    type: "Full Time",
  },
  {
    role: "Fashion Model",
    company: "Lakmé",
    location: "Delhi",
    type: "2 Days Left",
  },
  {
    role: "Background Dancer",
    company: "T-Series",
    location: "Hyderabad",
    type: "Urgent",
  },
];

export default function RecommendedCasting() {
  return (
    <section className="recommended-casting">
      <div className="card-header">
        <h2>Recommended Casting Calls</h2>
        <button className="view-all-btn">Explore</button>
      </div>

      <div className="casting-grid">
        {castingCalls.map((casting, index) => (
          <div className="casting-card" key={index}>
            <h3>{casting.role}</h3>

            <p>{casting.company}</p>

            <div className="casting-info">
              <span>
                <MapPin size={15} />
                {casting.location}
              </span>

              <span>
                <Clock size={15} />
                {casting.type}
              </span>
            </div>

            <button className="primary-btn">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}