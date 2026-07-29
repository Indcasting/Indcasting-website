"use client";

import { CastingPost } from "@/types/casting";

interface Props {
  post: CastingPost;
  onEdit: (post: CastingPost) => void;
  onDelete: (id: string) => void;
  onView: (post: CastingPost) => void;
}

export default function CastingCard({
  post,
  onEdit,
  onDelete,
  onView,
}: Props) {
  return (
    <div className="casting-card">

      <div className="casting-header">

        <div>
          <h2>{post.title}</h2>
          <p className="company">{post.company}</p>
        </div>

        <span
          className={
            post.status === "Open"
              ? "status open"
              : "status closed"
          }
        >
          {post.status}
        </span>

      </div>

      <div className="casting-category">
        🎬 {post.category}
      </div>

      <div className="casting-meta">

        <span>📍 {post.location}</span>
        <span>👤 {post.gender}</span>
        <span>🎂 {post.age}</span>
        <span>🎭 {post.role}</span>
        <span>💰 ₹{post.budget}</span>

      </div>

      <div className="posted-date">
        Posted on {post.createdAt}
      </div>

      <div className="post-buttons">

        <button
          className="gold-btn"
          onClick={() => onView(post)}
        >
          View Details
        </button>

        <button
          className="gold-btn"
          onClick={() => onEdit(post)}
        >
          Edit
        </button>

        <button
          className="outline-btn"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}