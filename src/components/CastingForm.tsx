"use client";

import { useEffect, useState } from "react";
import { CastingPost } from "@/types/casting";

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
      !title ||
      !category ||
      !location ||
      !age ||
      !description
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

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Casting Title"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Choose Category</option>
        <option>Film</option>
        <option>Advertisement</option>
        <option>Music Video</option>
        <option>OTT</option>
        <option>TV Serial</option>
        <option>Short Film</option>
      </select>

      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
      />

      <input
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age Requirement"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Casting Description"
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