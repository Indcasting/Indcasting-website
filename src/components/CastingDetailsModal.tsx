"use client";

import { CastingPost } from "@/types/casting";

interface Props {
  post: CastingPost | null;
  onClose: () => void;
}

export default function CastingDetailsModal({
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

        <h2>{post.title}</h2>

        <p className="company">
          {post.company}
        </p>

        <div className="modal-info">

          <p>
            <strong>Category:</strong> {post.category}
          </p>

          <p>
            <strong>Location:</strong> {post.location}
          </p>

          <p>
            <strong>Age:</strong> {post.age}
          </p>

          <p>
            <strong>Status:</strong> {post.status}
          </p>

        </div>

        <h3>Description</h3>

        <p className="description">
          {post.description}
        </p>

        <small>

          Posted on {post.createdAt}

        </small>

      </div>

    </div>

  );

}