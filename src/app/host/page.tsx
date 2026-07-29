"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import CastingForm from "@/components/CastingForm";
import MyPosts from "@/components/MyPosts";

import { CastingPost } from "@/types/casting";
import { getPosts, savePosts } from "@/utils/storage";

import FilterBar from "@/components/FilterBar";
import AllCastingCalls from "@/components/AllCastingCalls";
import CastingDetailsModal from "@/components/CastingDetailsModal";

import DashboardStats from "@/components/DashboardStats";
import CastingList from "@/components/CastingList";

export default function HostPage() {

  const [posts, setPosts] = useState<CastingPost[]>([]);
  const [editingPost, setEditingPost] = useState<CastingPost | null>(null);
  const [search, setSearch] = useState("");

const [showFilters, setShowFilters] = useState(false);

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

const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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

  function handleViewDetails(post: CastingPost) {
  setSelectedPost(post);
}

function handleResetFilters() {
  setSearch("");
  setCategoryFilter("");
  setLocationFilter("");
  setGenderFilter("");
  setExperienceFilter("");
  setLanguageFilter("");
  setAgeFilter("");
  setBudgetFilter("");
  setStatusFilter("");
  setSortOrder("newest");
}

  const filteredPosts = [...posts]
  
  .filter(post => {
  if (!search) return true;

  const term = search.toLowerCase();

  return (
    post.title.toLowerCase().includes(term) ||
    post.company.toLowerCase().includes(term) ||
    post.location.toLowerCase().includes(term) ||
    post.category.toLowerCase().includes(term)
  );
})

  .filter(post =>
  !categoryFilter ||
  post.category.toLowerCase() === categoryFilter.toLowerCase()
)

  .filter((post) =>

    locationFilter
      ? post.location
          .toLowerCase()
          .includes(locationFilter.toLowerCase())
      : true

  )

  .filter(post => {

  if (!genderFilter) return true;

  return (
    (post.gender ?? "").toLowerCase() ===
    genderFilter.toLowerCase()
  );

})

.filter(post => {

  if (!experienceFilter) return true;

  return (
    (post.experience ?? "").toLowerCase() ===
    experienceFilter.toLowerCase()
  );

})

.filter(post => {

  if (!languageFilter) return true;

  const languages = (post.languages ?? "")
    .toLowerCase()
    .split(",")
    .map(lang => lang.trim());

  return languages.some(lang =>
    lang.includes(languageFilter.toLowerCase())
  );

})

.filter((post) => {
  if (!ageFilter) return true;

  const enteredAge = Number(ageFilter);

  // Extract all numbers from the age string
  const numbers = post.age.match(/\d+/g);

  if (!numbers) return false;

  // Single age (e.g. "21")
  if (numbers.length === 1) {
    return enteredAge === Number(numbers[0]);
  }

  // Age range (e.g. "18-25")
  const minAge = Number(numbers[0]);
  const maxAge = Number(numbers[1]);

  return enteredAge >= minAge && enteredAge <= maxAge;
})

.filter(post => {

  if (!budgetFilter) return true;

  const budget = Number(post.budget);

  if (budgetFilter.endsWith("+")) {

      return budget >= Number(budgetFilter.replace("+",""));

  }

  const [min,max] = budgetFilter.split("-");

  return budget >= Number(min) &&
         budget <= Number(max);

})

  .filter(post =>

  !statusFilter ||

  post.status.toLowerCase() ===
  statusFilter.toLowerCase()

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

      <section className="host-dashboard">

  <div className="dashboard-top">

    <div>

      <span className="hero-badge">
        Host Dashboard
      </span>

      <h1>Welcome Back 👋</h1>

      <p>
        Manage casting calls, track opportunities and discover verified talent.
      </p>

    </div>

    <Link href="/dashboard">
  <button className="gold-btn">
    + Create Casting Call
  </button>
</Link>

  </div>

  <div className="dashboard-overview">

    <div className="overview-card">
      <h2>{totalPosts}</h2>
      <p>Total Posts</p>
    </div>

    <div className="overview-card">
      <h2>{openPosts}</h2>
      <p>Open</p>
    </div>

    <div className="overview-card">
      <h2>{closedPosts}</h2>
      <p>Closed</p>
    </div>

    <div className="overview-card">
      <h2>{thisMonth}</h2>
      <p>This Month</p>
    </div>

  </div>

</section>


<div className="host-toolbar">

  <div className="toolbar-left">
    <input
      type="text"
      placeholder="Search casting calls..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search-input"
    />
  </div>

  <div className="toolbar-right">

    <button
      className="filter-btn"
      onClick={() => setShowFilters(!showFilters)}
    >
      <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
>
    <path d="M3 5h18M6 12h12M10 19h4"/>
</svg>

      {showFilters ? "Hide Filters" : "Filters"}

      <span>{showFilters ? "▲" : "▼"}</span>
    </button>

    <button
      className={`view-btn ${viewMode==="grid"?"active":""}`}
      onClick={()=>setViewMode("grid")}
    >
      ⊞
    </button>

    <button
      className={`view-btn ${viewMode==="list"?"active":""}`}
      onClick={()=>setViewMode("list")}
    >
      ☰
    </button>

  </div>

</div>


  <div className={`filters-wrapper ${showFilters ? "open" : ""}`}>
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

  onReset={handleResetFilters}

/>
</div>


      {/* POSTS */}

<section className="all-posts">

  <div className="section-heading">
    <h2>All Casting Calls</h2>
    <p>Browse every casting opportunity currently available.</p>
  </div>

  {viewMode === "grid" ? (
    <AllCastingCalls
      posts={filteredPosts}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onView={handleViewDetails}
    />
  ) : (
    <CastingList
      posts={filteredPosts}
      onView={handleViewDetails}
    />
  )}

</section>

{selectedPost && (
  <CastingDetailsModal
    post={selectedPost}
    onClose={() => setSelectedPost(null)}
  />
)}

    

    </main>

  );

}