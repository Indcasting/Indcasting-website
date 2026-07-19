"use client";

import { CastingPost } from "@/types/casting";
import CastingCard from "./CastingCard";
import CastingModal from "./CastingModal";
import { useState } from "react";


interface Props {
  posts: CastingPost[];
  onEdit: (post: CastingPost) => void;
  onDelete: (id: string) => void;
}

export default function AllCastingCalls({
  posts,
  onEdit,
  onDelete,
}: Props) {

    const [selectedPost, setSelectedPost] =
useState<CastingPost | null>(null);

  return (
    <section className="all-posts">

      <div className="section-heading">
        <h2>All Casting Calls</h2>
        <p>Browse every casting opportunity currently available.</p>
      </div>

      {posts.length === 0 ? (
        <div className="empty-posts">
          <h2>No Casting Calls Found</h2>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        posts.map((post) => (
          <CastingCard
            key={post.id}
            post={post}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={setSelectedPost}
          />
        ))
      )}

      <CastingModal

post={selectedPost}

onClose={() => setSelectedPost(null)}

/>

    </section>
  );
}