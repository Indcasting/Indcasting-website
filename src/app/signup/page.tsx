"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/utils/auth";
import { User, Mail, Phone, MapPin, Lock, Camera, EyeOff, Eye, Sparkles } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"talent" | "seeker">("talent");
  const [isLoading, setIsLoading] = useState(false);

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request for premium feel
    setTimeout(() => {
      registerUser({
        id: Date.now().toString(),
        name,
        email,
        phone,
        city,
        password,
        role
      });
      alert("Account Created Successfully!");
      if (redirect) {
        router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      } else {
        router.push("/login");
      }
    }, 800);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--cream)', paddingTop: '80px' }}>
      {/* Left side banner - hidden on mobile */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
        }}
        className="auth-hero-section"
      >
        <div style={{ 
          width: '100%', 
          height: '100%', 
          backgroundImage: 'linear-gradient(rgba(10, 10, 10, 0.4), rgba(10, 10, 10, 0.8)), url("https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '60px',
          color: '#fff'
        }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.1 }}>
            Where <span style={{ color: 'var(--gold)' }}>Talent</span><br/>Meets Opportunity.
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#eaeaea', maxWidth: '85%', lineHeight: 1.6 }}>
            Join India's premier casting platform. Connect with top directors, production houses, and the brightest rising stars in the industry.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative' }}>
        
        {/* Decorative background elements */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0) 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

        <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--ink)', marginBottom: '24px' }}>
              <Camera size={28} color="var(--gold)" />
              <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>IndCasting</span>
            </Link>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '8px' }}>Create an Account</h1>
            <p style={{ color: 'var(--mid)', fontSize: '1.05rem' }}>Start your journey with us today.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            <button 
              type="button"
              onClick={() => setRole('talent')}
              style={{
                padding: '16px', borderRadius: '12px', border: role === 'talent' ? '2px solid var(--gold)' : '1px solid var(--input-border)',
                backgroundColor: role === 'talent' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                color: role === 'talent' ? 'var(--gold)' : 'var(--mid)',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
              }}
            >
              <Sparkles size={24} />
              <span>I am a Talent</span>
            </button>
            <button 
              type="button"
              onClick={() => setRole('seeker')}
              style={{
                padding: '16px', borderRadius: '12px', border: role === 'seeker' ? '2px solid var(--gold)' : '1px solid var(--input-border)',
                backgroundColor: role === 'seeker' ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                color: role === 'seeker' ? 'var(--gold)' : 'var(--mid)',
                fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
              }}
            >
              <Camera size={24} />
              <span>I am a Seeker</span>
            </button>
          </div>

          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mid)' }} />
              <input 
                type="text" placeholder="Full Name" required
                value={name} onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--ink)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
              />
            </div>

            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mid)' }} />
              <input 
                type="email" placeholder="Email Address" required
                value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--ink)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
              />
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mid)' }} />
                <input 
                  type="tel" placeholder="Phone Number" required
                  value={phone} onChange={e => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--ink)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
                />
              </div>
              <div style={{ position: 'relative', flex: 1 }}>
                <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mid)' }} />
                <input 
                  type="text" placeholder="City" required
                  value={city} onChange={e => setCity(e.target.value)}
                  style={{ width: '100%', padding: '16px 16px 16px 48px', borderRadius: '12px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--ink)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
                />
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--mid)' }} />
              <input 
                type={showPassword ? "text" : "password"} placeholder="Password" required
                value={password} onChange={e => setPassword(e.target.value)}
                style={{ width: '100%', padding: '16px 48px 16px 48px', borderRadius: '12px', border: '1px solid var(--input-border)', backgroundColor: 'var(--card-bg)', color: 'var(--ink)', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--input-border)'}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--mid)', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                width: '100%', padding: '16px', borderRadius: '12px', backgroundColor: 'var(--gold)', color: '#000',
                fontSize: '1.05rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                marginTop: '12px', transition: 'transform 0.1s, opacity 0.2s',
                opacity: isLoading ? 0.7 : 1, transform: isLoading ? 'scale(0.98)' : 'scale(1)'
              }}
              onMouseDown={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
              onMouseLeave={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--mid)', fontSize: '0.95rem' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
              Log In
            </Link>
          </p>
        </div>
      </div>
      
      {/* Required CSS for media query to hide image on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 900px) {
          .auth-hero-section {
            display: none !important;
          }
        }
      `}} />
    </div>
  );
}