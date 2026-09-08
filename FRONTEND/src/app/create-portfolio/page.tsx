"use client";

import { useState } from "react";

export default function CreatePortfolio() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    city: "",
    profileImage: null as File | null,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: e.target.files![0],
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(formData);

    alert("Step 1 Saved!");
  }

  return (
    <div className="portfolio-page">

      <div className="portfolio-card">

        <h1>Create Your Portfolio</h1>

        <p>
          Step 1 of 3 • Personal Information
        </p>

        <form onSubmit={handleSubmit}>

          <div className="portfolio-grid">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>City</label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label>Profile Picture</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
            </div>

          </div>

          <button className="portfolio-next-btn">
            Continue →
          </button>

        </form>

      </div>

    </div>
  );
}