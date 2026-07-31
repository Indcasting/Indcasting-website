"use client";

import { CheckCircle2 } from "lucide-react";

export default function ProfileCompletion() {
  const progress = 78;

  const tasks = [
    "Upload Profile Picture",
    "Add Introduction Video",
    "Complete Portfolio",
    "Verify Email",
    "Add Experience",
  ];

  return (
    <section className="profile-completion-card">
      <div className="profile-header">
        <div>
          <h2>Complete Your Profile</h2>
          <p>
            Profiles with 100% completion receive significantly more audition
            invitations.
          </p>
        </div>

        <div className="profile-percent">{progress}%</div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="profile-tasks">
        {tasks.map((task, index) => (
          <div className="task-item" key={index}>
            <CheckCircle2 size={18} />
            <span>{task}</span>
          </div>
        ))}
      </div>

      <button className="primary-btn">
        Complete Profile
      </button>
    </section>
  );
}