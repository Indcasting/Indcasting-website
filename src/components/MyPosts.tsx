"use client";

import { CastingPost } from "@/types/casting";
import CastingCard from "./CastingCard";
import CastingModal from "./CastingModal";
import { useState } from "react";

interface Props {
  posts: CastingPost[];
  currentUserId: string;
  onEdit: (post: CastingPost) => void;
  onDelete: (id: string) => void;
}

export default function MyPosts({
  posts,
  currentUserId,
  onEdit,
  onDelete,
}: Props) {

  const myPosts = posts.filter(
    (post) => post.userId === currentUserId
  );

  const [selectedPost, setSelectedPost] =
        useState<CastingPost | null>(null);

  return (
    <section className="my-posts">


      {myPosts.length === 0 ? (
        <div className="empty-posts">
          <h2>No Casting Calls Yet</h2>
          <p>Create your first casting call above.</p>
        </div>
      ) : (
        myPosts.map((post) => (
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
onClose={()=>setSelectedPost(null)}
/>

    </section>
  );
}