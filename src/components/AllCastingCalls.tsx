"use client";

import { CastingPost } from "@/types/casting";
import CastingCard from "./CastingCard";

interface Props {
  posts: CastingPost[];
  onEdit: (post: CastingPost) => void;
  onDelete: (id: string) => void;
  onView: (post: CastingPost) => void;
}

export default function AllCastingCalls({
  posts,
  onEdit,
  onDelete,
  onView,
}: Props) {
  return (
    <section className="all-posts">

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
            onView={onView}
          />
        ))
      )}

    </section>
  );
}