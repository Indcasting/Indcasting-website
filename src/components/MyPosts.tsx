"use client";

import { CastingPost } from "@/types/casting";
import CastingCard from "./CastingCard";

interface Props {
  posts: CastingPost[];
  onDelete: (id: string) => void;
  onEdit: (post: CastingPost) => void;
}

export default function MyPosts({
  posts,
  onDelete,
  onEdit,
}: Props) {

  if (posts.length === 0) {

    return (

      <div className="empty-posts">

        <h2>No Casting Calls Yet</h2>

        <p>
          Publish your first casting call to start receiving applications.
        </p>

      </div>

    );

  }

  return (

    <section className="my-posts">

      <h2 className="section-title">
        My Casting Calls
      </h2>

      {posts.map((post) => (

        <CastingCard
          key={post.id}
          post={post}
          onDelete={onDelete}
          onEdit={onEdit}
        />

      ))}

    </section>

  );

}