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

        <span className="modal-tag">
          {post.category}
        </span>

        <h2>{post.title}</h2>

        <p className="company">
          {post.company}
        </p>

        <div className="modal-info">

          <div>
            <strong>Location</strong>
            <span>{post.location || "-"}</span>
          </div>

          <div>
            <strong>Category</strong>
            <span>{post.category || "-"}</span>
          </div>

          <div>
            <strong>Gender</strong>
            <span>{post.gender || "-"}</span>
          </div>

          <div>
            <strong>Age</strong>
            <span>{post.age || "-"}</span>
          </div>

          <div>
            <strong>Experience</strong>
            <span>{post.experience || "-"}</span>
          </div>

          <div>
            <strong>Languages</strong>
            <span>{post.languages || "-"}</span>
          </div>

          <div>
            <strong>Budget</strong>
            <span>
              {post.budget ? `₹${post.budget}` : "-"}
            </span>
          </div>

          <div>
            <strong>Status</strong>
            <span>{post.status || "-"}</span>
          </div>

          <div>
            <strong>Shoot Starts</strong>
            <span>{post.shootStartDate || "-"}</span>
          </div>

          <div>
            <strong>Shoot Ends</strong>
            <span>{post.shootEndDate || "-"}</span>
          </div>

        </div>

        <div className="modal-description">

          <h3>Description</h3>

          <p>
            {post.description}
          </p>

        </div>

        <div className="modal-footer">

          <small>
            Posted on{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </small>

        </div>

      </div>

    </div>
  );
}