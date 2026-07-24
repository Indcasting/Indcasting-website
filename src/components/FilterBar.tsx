"use client";

import { CATEGORIES } from "@/constants/categories";

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

  totalResults: number;

  gender: string;
setGender: (value: string) => void;

experience: string;
setExperience: (value: string) => void;

language: string;
setLanguage: (value: string) => void;

age: string;
setAge: (value: string) => void;

budget: string;
setBudget: (value: string) => void;

onReset: () => void;
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
  totalResults,
  gender,
setGender,

experience,
setExperience,

language,
setLanguage,

age,
setAge,

budget,
setBudget,
onReset,
}: Props) {
  return (
    <section className="filter-section">

      <div className="search-box">

        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search by company, role or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="filter-controls">

    {/* Row 1 */}

    <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
    >
        <option value="">🎬 Category</option>

        {CATEGORIES.map(item=>(
            <option
                key={item}
                value={item}
            >
                {item}
            </option>
        ))}

    </select>

    <input
        placeholder="📍 Location"
        value={location}
        onChange={(e)=>setLocation(e.target.value)}
    />

    <select
        value={gender}
        onChange={(e)=>setGender(e.target.value)}
    >
        <option value="">👤 Gender</option>
        <option>Male</option>
        <option>Female</option>
    </select>

    <input
        placeholder="🎂 Age (18-30)"
        value={age}
        onChange={(e)=>setAge(e.target.value)}
    />

    <select
        value={experience}
        onChange={(e)=>setExperience(e.target.value)}
    >
        <option value="">💼 Experience</option>
        <option>Fresher</option>
        <option>0–1 Years</option>
        <option>1–3 Years</option>
        <option>3–5 Years</option>
        <option>5+ Years</option>
        <option>No Preference</option>
    </select>

    {/* Row 2 */}

    <input
        placeholder="💰 Min Budget"
        value={budget}
        onChange={(e)=>setBudget(e.target.value)}
    />

    <select
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
    >
        <option value="">🟢 Status</option>
        <option>Open</option>
        <option>Closed</option>
    </select>

    <input
        placeholder="🌐 Language"
        value={language}
        onChange={(e)=>setLanguage(e.target.value)}
    />

    <select
        value={sort}
        onChange={(e)=>setSort(e.target.value)}
    >
        <option value="newest">🕒 Newest</option>
        <option value="oldest">🕒 Oldest</option>
        <option value="budget-high">💰 Budget High</option>
        <option value="budget-low">💰 Budget Low</option>
        <option value="company">🏢 Company</option>
    </select>

    <button
  className="reset-btn"
  onClick={onReset}
>
  ↺ Reset
</button>

</div>

      <div className="filter-footer">

        <p>

          <strong>{totalResults}</strong>{" "}

          Casting Call

          {totalResults !== 1 && "s"}

          {" "}Found

        </p>

        <div className="active-filters">

          {search && (

            <span>

              🔍 {search}

              <button
                onClick={() => setSearch("")}
              >
                ×
              </button>

            </span>

          )}

          {category && (

            <span>

              🎬 {category}

              <button
                onClick={() => setCategory("")}
              >
                ×
              </button>

            </span>

          )}

          {location && (

            <span>

              📍 {location}

              <button
                onClick={() => setLocation("")}
              >
                ×
              </button>

            </span>

          )}

          {status && (

            <span>

              🟢 {status}

              <button
                onClick={() => setStatus("")}
              >
                ×
              </button>

            </span>

          )}

        </div>

      </div>

    </section>
  );
}