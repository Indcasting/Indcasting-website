"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginUser, getCurrentUser } from "@/utils/auth";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthHeroSection from "@/components/auth/AuthHeroSection";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      if (redirect) {
        router.push(redirect);
      } else if (user.role === "talent") {
        router.push("/dashboard/talent");
      } else {
        router.push("/dashboard/seeker");
      }
    }
  }, [router, redirect]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network request for premium feel
    setTimeout(() => {
      const user = loginUser(email, password, rememberMe);

      if (!user) {
        setError("Invalid email or password.");
        setIsLoading(false);
        return;
      }

      if (redirect) {
        router.push(redirect);
      } else if (user.role === "talent") {
        router.push("/dashboard/talent");
      } else {
        router.push("/dashboard/seeker");
      }
    }, 800);
  }

  return (
    <AuthLayout>
      <AuthHeroSection />
      <AuthCard 
        title="Welcome Back" 
        subtitle="Login to your IndCasting account."
        bottomText="Don't have an account?"
        bottomLinkText="Sign Up"
        bottomLinkHref="/signup"
      >
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AuthInput 
            icon={<Mail size={18} />} 
            type="email" 
            placeholder="Email Address" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          
          <AuthInput 
            icon={<Lock size={18} />} 
            type="password" 
            placeholder="Password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', marginTop: '-4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', margin: 0, fontWeight: 500, color: 'var(--mid)' }}>
              <input 
                type="checkbox" 
                checked={rememberMe} 
                onChange={(e) => setRememberMe(e.target.checked)} 
                style={{ width: '16px', height: '16px', accentColor: 'var(--gold)', cursor: 'pointer' }}
              />
              Remember Me
            </label>
            <Link href="#" style={{ color: 'var(--mid)', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--mid)'}>
              Forgot Password?
            </Link>
          </div>

          {error && (
            <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.9rem', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <AuthButton type="submit" isLoading={isLoading} loadingText="Logging In...">
            Log In
          </AuthButton>
        </form>

        <AuthDivider />
        <SocialLoginButtons />

      </AuthCard>
    </AuthLayout>
  );
}