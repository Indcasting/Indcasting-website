"use client";

import { CastingPost } from "@/types/casting";

interface Props {
  post: CastingPost | null;
  onClose: () => void;
}

export default function CastingModal({
  post,
  onClose,
}: Props) {

  if (!post) return null;

  return (

    <div className="modal-overlay">

      <div className="casting-modal">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h1>{post.title}</h1>

        <h3>{post.company}</h3>

        <span
          className={
            post.status === "Open"
              ? "status open"
              : "status closed"
          }
        >
          {post.status}
        </span>

        <div className="details-grid">

          <div><strong>Category</strong><p>{post.category}</p></div>

          <div><strong>Role</strong><p>{post.role}</p></div>

          <div><strong>Gender</strong><p>{post.gender}</p></div>

          <div><strong>Age</strong><p>{post.age}</p></div>

          <div><strong>Height</strong><p>{post.height}</p></div>

          <div><strong>Languages</strong><p>{post.languages}</p></div>

          <div><strong>Experience</strong><p>{post.experience}</p></div>

          <div><strong>Location</strong><p>{post.location}</p></div>

          <div><strong>Shoot Start Date</strong><p>{post.shootStartDate}</p></div>
          
          <div><strong>Shoot End Date</strong><p>{post.shootEndDate}</p></div>

          <div><strong>Budget</strong><p>{post.budget}</p></div>

          <div><strong>Vacancies</strong><p>{post.vacancies}</p></div>

          <div><strong>Deadline</strong><p>{post.applicationDeadline}</p></div>

        </div>

        <h2>Description</h2>

        <p className="description">
          {post.description}
        </p>

      </div>

    </div>

  );

}