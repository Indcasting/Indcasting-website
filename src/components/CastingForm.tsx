"use client";

import { useEffect, useState } from "react";
import { CastingPost } from "@/types/casting";
import { CATEGORIES } from "@/constants/categories";

interface Props {
  onSave: (post: CastingPost) => void;
  editingPost: CastingPost | null;
}

export default function CastingForm({
  onSave,
  editingPost,
}: Props) {

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");

const [gender, setGender] = useState("");

const [height, setHeight] = useState("");

const [languages, setLanguages] = useState("");

const [experience, setExperience] = useState("");

const [shootStartDate, setShootStartDate] = useState("");
const [shootEndDate, setShootEndDate] = useState("");

const [budget, setBudget] = useState("");

const [vacancies, setVacancies] = useState(1);

const [applicationDeadline, setApplicationDeadline] = useState("");

  useEffect(() => {

    if (editingPost) {

      setCompany(editingPost.company);
      setTitle(editingPost.title);
      setCategory(editingPost.category);
      setLocation(editingPost.location);
      setAge(editingPost.age);
      setDescription(editingPost.description);

    } else {

      setCompany("");
      setTitle("");
      setCategory("");
      setLocation("");
      setAge("");
      setDescription("");

    }

  }, [editingPost]);

  function handleSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (
      !company ||
      !category ||
      !location ||
      !role ||
      !gender ||
      !age ||
      !languages ||
      !experience ||
      !location ||
      !shootStartDate ||
      !shootEndDate ||
      !budget ||
      !applicationDeadline
    ) {
      alert("Please fill all fields.");
      return;
    }

    const post: CastingPost = {

      id: editingPost?.id || crypto.randomUUID(),

      userId: editingPost?.userId || "current-user",

      company,

      title,

      category,

      location,

      age,

      description,

      role,

gender,

height,

languages,

experience,

shootStartDate,
shootEndDate,

budget,

vacancies,

applicationDeadline,

      createdAt:
        editingPost?.createdAt ||
        new Date().toLocaleString(),

      status:
        editingPost?.status || "Open",

    };

    onSave(post);

    setCompany("");
    setTitle("");
    setCategory("");
    setLocation("");
    setAge("");
    setDescription("");

  }

  return (

    <form
      className="host-form"
      onSubmit={handleSubmit}
    >

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Production House"
      />

      <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
>

    <option value="">
        Select Category
    </option>

    {CATEGORIES.map((item) => (

        <option
            key={item}
            value={item}
        >
            {item}
        </option>

    ))}

</select>

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />

      <input
    placeholder="Role Name"
    value={role}
    onChange={(e)=>setRole(e.target.value)}
/>

<select
    value={gender}
    onChange={(e)=>setGender(e.target.value)}
>
    <option value="">Gender</option>
    <option>Male</option>
    <option>Female</option>
    <option>Any</option>
</select>

<input
    placeholder="Age Range (18-25)"
    value={age}
    onChange={(e)=>setAge(e.target.value)}
/>

<input
    placeholder="Height (optional)"
    value={height}
    onChange={(e)=>setHeight(e.target.value)}
/>

<input
    placeholder="Languages"
    value={languages}
    onChange={(e)=>setLanguages(e.target.value)}
/>

<select
  value={experience}
  onChange={(e) => setExperience(e.target.value)}
>
<option value="">
Select Experience
</option>

<option>Fresher</option>

<option>0–1 Years</option>

<option>1–3 Years</option>

<option>3–5 Years</option>

<option>5+ Years</option>

<option>No Preference</option>

</select>

<div className="date-field">
  <label>Shoot Start Date</label>
<input
    type="date"
    value={shootStartDate}
    onChange={(e)=>setShootStartDate(e.target.value)}
/>
</div>

<div className="date-field">
  <label>Shoot End Date</label>
<input
    type="date"
    value={shootEndDate}
    onChange={(e)=>setShootEndDate(e.target.value)}
/>
</div>

<input
    placeholder="Budget / Pay"
    value={budget}
    onChange={(e)=>setBudget(e.target.value)}
/>

<div className="form-field">
  <label>Number of Vacancies</label>
<input
    type="number"
    min={1}
    value={vacancies}
    onChange={(e)=>setVacancies(Number(e.target.value))}
/>
</div>

<div className="date-field">
  <label>Application Deadline</label>
  <input
      type="date"
      value={applicationDeadline}
      onChange={(e)=>setApplicationDeadline(e.target.value)}
  />
</div>

<textarea
    placeholder="Project Description"
    value={description}
    onChange={(e)=>setDescription(e.target.value)}
/>

<button
        className="gold-btn"
        type="submit"
      >
        {editingPost
          ? "Update Casting Call"
          : "Publish Casting Call"}
      </button>

    </form>

  );

}