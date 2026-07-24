"use client";

import { CastingPost } from "@/types/casting";

interface CastingListProps {
  posts: CastingPost[];

  onView: (post: CastingPost) => void;

  onEdit?: (post: CastingPost) => void;

  onDelete?: (id: string) => void;
}

export default function CastingList({
  posts,
  onView,
  onEdit,
  onDelete,
}: CastingListProps) {
  if (posts.length === 0) {
    return (
      <div className="casting-list-empty">
        <h3>No Casting Calls Found</h3>
        <p>Try changing your filters or create a new casting call.</p>
      </div>
    );
  }

  return (
    <div className="casting-list">

      <div className="casting-list-header">
        <span>Role</span>
        <span>Company</span>
        <span>Location</span>
        <span>Budget</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {posts.map((post) => (
        <div key={post.id} className="casting-list-row">

          <div className="role">
            <strong>{post.role}</strong>
            <small>{post.category}</small>
          </div>

          <div>{post.company}</div>

          <div>{post.location}</div>

          <div>₹{Number(post.budget).toLocaleString()}</div>

          <div>
            <span
              className={`status ${
                post.status === "Open" ? "open" : "closed"
              }`}
            >
              {post.status}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            <button
              className="gold-btn small-btn"
              onClick={() => onView(post)}
            >
              View
            </button>

            {onEdit && (
              <button
                className="gold-btn small-btn"
                onClick={() => onEdit(post)}
              >
                Edit
              </button>
            )}

            {onDelete && (
              <button
                className="outline-btn small-btn"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            )}
          </div>

        </div>
      ))}

    </div>
  );
}