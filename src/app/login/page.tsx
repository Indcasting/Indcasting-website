"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser, getCurrentUser } from "@/utils/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      if (user.role === "talent") {
        router.push("/dashboard/talent");
      } else {
        router.push("/dashboard/seeker");
      }
    }
  }, [router]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const user = loginUser(email, password, rememberMe);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    if (user.role === "talent") {
      router.push("/dashboard/talent");
    } else {
      router.push("/dashboard/seeker");
    }
  }

  return (
    <div className="auth-page" style={{ paddingTop: '100px', paddingBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your IndCasting account
        </p>

        <form onSubmit={handleLogin}>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <div className="remember-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', fontSize: '14px' }}>

            <label className="remember" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, fontWeight: 'normal' }}>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
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

          <Link href="/signup">
            Sign Up
          </Link>

        </p>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        html.dark .auth-card h1 {
          color: #ffffff !important;
        }
      `}} />
    </div>
  );
}