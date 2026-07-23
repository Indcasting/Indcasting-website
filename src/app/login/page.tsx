"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const user = loginUser(email, password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }
    localStorage.setItem(
    "indcasting_current_user",
    JSON.stringify(user)
);

    if (user.role === "talent") {
      router.push("/dashboard/talent");
    } else {
      router.push("/dashboard/seeker");
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your IndCasting account
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <div className="remember-row">

            <label className="remember">
              <input type="checkbox" />
              Remember Me
            </label>

            <Link href="#">
              Forgot Password?
            </Link>

          </div>

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          <button className="login-btn-full">
            Log In
          </button>

        </form>

        <button
          className="show-password-btn"
          onClick={()=>setShowPassword(!showPassword)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <p className="bottom-text">

          Don't have an account?

          <Link href="/signin">
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}