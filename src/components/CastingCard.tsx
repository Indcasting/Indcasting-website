"use client";

import { CastingPost } from "@/types/casting";

interface Props {
  post: CastingPost;
  onDelete: (id: string) => void;
  onEdit: (post: CastingPost) => void;
}

export default function CastingCard({
  post,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="casting-post-card">

      <div className="post-top">

        <div>

          <h3>{post.title}</h3>

          <p>{post.category}</p>

        </div>

        <span className="status">
          {post.status}
        </span>

      </div>

      <p>
        📍 {post.location}
      </p>

      <p>
        👤 {post.age}
      </p>

      <p>
        {post.description}
      </p>

      <small>
        Posted: {post.createdAt}
      </small>

      <div className="post-buttons">

        <button
          className="outline-btn"
          onClick={() => onEdit(post)}
        >
          Edit
        </button>

        <button
          className="gold-btn"
          onClick={() => onDelete(post.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}