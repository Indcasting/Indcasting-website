"use client";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  location: string;
  setLocation: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

export default function FilterBar({
  search,
  setSearch,
  category,
  setCategory,
  location,
  setLocation,
  status,
  setStatus,
  sort,
  setSort,
}: Props) {

  return (

    <div className="filter-bar">

      <input
        type="text"
        placeholder="Search title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option>Film</option>
        <option>Advertisement</option>
        <option>Music Video</option>
        <option>OTT</option>
        <option>TV Serial</option>
        <option>Short Film</option>
      </select>

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option>Open</option>
        <option>Closed</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

    </div>

  );

}