"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Footer from "@/components/Footer";
import CastingForm from "@/components/CastingForm";
import MyPosts from "@/components/MyPosts";

import { CastingPost } from "@/types/casting";
import { getPosts, savePosts } from "@/utils/storage";

import FilterBar from "@/components/FilterBar";
import AllCastingCalls from "@/components/AllCastingCalls";
import CastingDetailsModal from "@/components/CastingDetailsModal";

import DashboardStats from "@/components/DashboardStats";

export default function HostPage() {

  const [posts, setPosts] = useState<CastingPost[]>([]);
  const [editingPost, setEditingPost] = useState<CastingPost | null>(null);
  const [search, setSearch] = useState("");

const [categoryFilter, setCategoryFilter] = useState("");

const [locationFilter, setLocationFilter] = useState("");

const [statusFilter, setStatusFilter] = useState("");

const [sortOrder, setSortOrder] = useState("newest");

const [genderFilter, setGenderFilter] = useState("");

const [experienceFilter, setExperienceFilter] = useState("");

const [languageFilter, setLanguageFilter] = useState("");

const [ageFilter, setAgeFilter] = useState("");

const [budgetFilter, setBudgetFilter] = useState("");

const [selectedPost, setSelectedPost] =
  useState<CastingPost | null>(null);

const currentUserId = "current-user";

const totalPosts = posts.length;

const openPosts = posts.filter(
    p => p.status === "Open"
).length;

const closedPosts = posts.filter(
    p => p.status === "Closed"
).length;

const thisMonth = posts.filter(post => {

    const now = new Date();

    const created = new Date(post.createdAt);

    return (
        created.getMonth() === now.getMonth() &&
        created.getFullYear() === now.getFullYear()
    );

}).length;

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

  .filter(post =>

    genderFilter
        ? post.gender === genderFilter
        : true

)

.filter(post =>

    experienceFilter
        ? post.experience === experienceFilter
        : true

)

.filter(post =>

    languageFilter
        ? post.languages
              .toLowerCase()
              .includes(languageFilter.toLowerCase())
        : true

)

.filter(post =>

    ageFilter
        ? post.age.includes(ageFilter)
        : true

)

.filter(post =>

    budgetFilter
        ? Number(post.budget) >= Number(budgetFilter)
        : true

)

  .filter((post) =>

    statusFilter
      ? post.status === statusFilter
      : true

  )

  
  .sort((a, b) => {

  if (sortOrder === "newest") {
    return (
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    );
  }

  if (sortOrder === "oldest") {
    return (
      new Date(a.createdAt).getTime() -
      new Date(b.createdAt).getTime()
    );
  }

  if (sortOrder === "budget-high") {
    return Number(b.budget) - Number(a.budget);
  }

  if (sortOrder === "budget-low") {
    return Number(a.budget) - Number(b.budget);
  }

  if (sortOrder === "company") {
    return a.company.localeCompare(b.company);
  }

  return 0;

});

  const allPosts = filteredPosts;

const myPosts = filteredPosts.filter(
  (post) => post.userId === "current-user"
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
            src="/images/host.jpg"
            alt="Host"
            width={500}
            height={500}
          />

        </div>

      </section>

      <DashboardStats posts={posts} />

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

  gender={genderFilter}
  setGender={setGenderFilter}

  experience={experienceFilter}
  setExperience={setExperienceFilter}

  language={languageFilter}
  setLanguage={setLanguageFilter}

  age={ageFilter}
  setAge={setAgeFilter}

  budget={budgetFilter}
  setBudget={setBudgetFilter}

  status={statusFilter}
  setStatus={setStatusFilter}

  sort={sortOrder}
  setSort={setSortOrder}

  totalResults={filteredPosts.length}
/>

      {/* POSTS */}

<AllCastingCalls
    posts={filteredPosts}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>

<MyPosts
    posts={posts}
    currentUserId={currentUserId}
    onEdit={handleEdit}
    onDelete={handleDelete}
/>

<CastingDetailsModal

post={selectedPost}

onClose={() => setSelectedPost(null)}

/>

      <Footer />

    </main>

  );

}