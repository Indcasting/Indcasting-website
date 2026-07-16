"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Footer from "@/components/Footer";
import CastingForm from "@/components/CastingForm";
import MyPosts from "@/components/MyPosts";

import { CastingPost } from "@/types/casting";
import { getPosts, savePosts } from "@/utils/storage";

import FilterBar from "@/components/FilterBar";

export default function HostPage() {

  const [posts, setPosts] = useState<CastingPost[]>([]);
  const [editingPost, setEditingPost] = useState<CastingPost | null>(null);
  const [search, setSearch] = useState("");

const [categoryFilter, setCategoryFilter] = useState("");

const [locationFilter, setLocationFilter] = useState("");

const [statusFilter, setStatusFilter] = useState("");

const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  function handleSave(post: CastingPost) {

    let updatedPosts: CastingPost[];

    if (editingPost) {

      updatedPosts = posts.map((p) =>
        p.id === post.id ? post : p
      );

      setEditingPost(null);

    } else {

      updatedPosts = [post, ...posts];

    }

    setPosts(updatedPosts);
    savePosts(updatedPosts);

  }

  function handleDelete(id: string) {

    if (!confirm("Delete this casting call?")) return;

    const updatedPosts = posts.filter((post) => post.id !== id);

    setPosts(updatedPosts);

    savePosts(updatedPosts);

  }

  function handleEdit(post: CastingPost) {
    setEditingPost(post);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const filteredPosts = [...posts]
  .filter((post) =>

    post.title.toLowerCase().includes(search.toLowerCase()) ||

    post.company.toLowerCase().includes(search.toLowerCase())

  )
  .filter((post) =>

    categoryFilter
      ? post.category === categoryFilter
      : true

  )
  .filter((post) =>

    locationFilter
      ? post.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase())
      : true

  )
  .filter((post) =>

    statusFilter
      ? post.status === statusFilter
      : true

  )
  .sort((a, b) =>

    sortOrder === "newest"

      ? new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()

      : new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime()

  );

  return (

    <main>

      {/* HERO */}

      <section className="host-hero">

        <div className="host-left">

          <span className="hero-badge">
            🎬 For Casting Directors
          </span>

          <h1>
            Find the Perfect
            <span> Talent</span>
            <br />
            For Your Next Project
          </h1>

          <p>
            Post casting calls, discover verified artists,
            filter by skills, experience and location,
            then hire the best talent.
          </p>

        </div>

        <div className="host-right">

          <Image
            src="/images/host.png"
            alt="Host"
            width={500}
            height={500}
          />

        </div>

      </section>

      {/* FORM */}

      <section className="section">

        <h2 className="section-title">

          {editingPost
            ? "Edit Casting Call"
            : "Create Casting Call"}

        </h2>

        <CastingForm

          onSave={handleSave}

          editingPost={editingPost}

        />

      </section>

      <FilterBar

    search={search}
    setSearch={setSearch}

    category={categoryFilter}
    setCategory={setCategoryFilter}

    location={locationFilter}
    setLocation={setLocationFilter}

    status={statusFilter}
    setStatus={setStatusFilter}

    sort={sortOrder}
    setSort={setSortOrder}

/>

      {/* POSTS */}

      <MyPosts

        posts={filteredPosts}

        onDelete={handleDelete}

        onEdit={handleEdit}

      />

      <Footer />

    </main>

  );

}