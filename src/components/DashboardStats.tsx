"use client";

import { CastingPost } from "@/types/casting";

interface Props {
  posts: CastingPost[];
}

export default function DashboardStats({ posts }: Props) {
  const totalPosts = posts.length;

  const openPosts = posts.filter(
    (post) => post.status === "Open"
  ).length;

  const closedPosts = posts.filter(
    (post) => post.status === "Closed"
  ).length;

  const categories = new Set(
    posts.map((post) => post.category)
  ).size;

  return (
    <section className="dashboard-stats">

      <div className="stat-card">
        <h3>Total Castings</h3>
        <h1>{totalPosts}</h1>
      </div>

      <div className="stat-card">
        <h3>Open</h3>
        <h1>{openPosts}</h1>
      </div>

      <div className="stat-card">
        <h3>Closed</h3>
        <h1>{closedPosts}</h1>
      </div>

      <div className="stat-card">
        <h3>Categories</h3>
        <h1>{categories}</h1>
      </div>

    </section>
  );
}