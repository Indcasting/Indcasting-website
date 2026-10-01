"use client";

import { useState, Suspense } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import { registerUser } from "@/utils/auth";
import { validateInternalPath } from "@/utils/security";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Camera,
  Sparkles,
} from "lucide-react";

import AuthLayout from "@/components/auth/AuthLayout";
import AuthHeroSection from "@/components/auth/AuthHeroSection";
import AuthCard from "@/components/auth/AuthCard";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthDivider from "@/components/auth/AuthDivider";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect =
    searchParams.get("redirect");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [city, setCity] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState<"talent" | "seeker">(
      "talent"
    );

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      /*
       * The backend generates the actual
       * database UUID.
       *
       * Do NOT send an id from the frontend.
       */
      const user =
        await registerUser({
          name,
          email,
          phone,
          city,
          password,
          role,
        });

      if (!user) {
        setError(
          "Unable to create your account."
        );
        return;
      }

      /*
       * The backend has already:
       *
       * 1. Created the user
       * 2. Hashed the password
       * 3. Created the JWT
       * 4. Set the HTTP-only cookie
       *
       * Therefore the user is already authenticated.
       */

      if (redirect) {
        router.push(
          validateInternalPath(
            redirect
          )
        );

        return;
      }

      if (user.role === "talent") {
        router.push(
          "/dashboard/talent"
        );
      } else {
        router.push(
          "/dashboard/seeker"
        );
      }
    } catch (err) {
      console.error(
        "Signup failed:",
        err
      );

      const message =
        err instanceof Error
          ? err.message
          : "Unable to create your account.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthHeroSection />

      <AuthCard
        title="Create an Account"
        subtitle="Start your journey with us today."
        bottomText="Already have an account?"
        bottomLinkText="Log In"
        bottomLinkHref="/login"
      >
        {/* ROLE SELECTION */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              setRole("talent")
            }
            style={{
              padding: "16px",
              borderRadius: "12px",
              border:
                role === "talent"
                  ? "2px solid var(--gold)"
                  : "1px solid var(--input-border)",
              backgroundColor:
                role === "talent"
                  ? "rgba(212, 175, 55, 0.05)"
                  : "transparent",
              color:
                role === "talent"
                  ? "var(--gold)"
                  : "var(--mid)",
              fontWeight: 600,
              cursor: "pointer",
              transition:
                "all 0.2s",
              display: "flex",
              flexDirection:
                "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Sparkles size={24} />

            <span>
              I am a Talent
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setRole("seeker")
            }
            style={{
              padding: "16px",
              borderRadius: "12px",
              border:
                role === "seeker"
                  ? "2px solid var(--gold)"
                  : "1px solid var(--input-border)",
              backgroundColor:
                role === "seeker"
                  ? "rgba(212, 175, 55, 0.05)"
                  : "transparent",
              color:
                role === "seeker"
                  ? "var(--gold)"
                  : "var(--mid)",
              fontWeight: 600,
              cursor: "pointer",
              transition:
                "all 0.2s",
              display: "flex",
              flexDirection:
                "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Camera size={24} />

            <span>
              I am a Seeker
            </span>
          </button>
        </div>

        {/* SIGNUP FORM */}

        <form
          onSubmit={handleSignup}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <AuthInput
            icon={<User size={18} />}
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <AuthInput
            icon={<Mail size={18} />}
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              <AuthInput
                icon={
                  <Phone
                    size={18}
                  />
                }
                type="tel"
                placeholder="Phone Number"
                required
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />
            </div>

            <div
              style={{
                flex: 1,
              }}
            >
              <AuthInput
                icon={
                  <MapPin
                    size={18}
                  />
                }
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) =>
                  setCity(
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          <AuthInput
            icon={<Lock size={18} />}
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {/* BACKEND / DTO REQUIRES 8+ CHARACTERS */}

          {password.length > 0 &&
            password.length < 8 && (
              <div
                style={{
                  marginTop:
                    "-10px",
                  color:
                    "#ef4444",
                  fontSize:
                    "0.85rem",
                }}
              >
                Password must be at
                least 8 characters.
              </div>
            )}

          {error && (
            <div
              style={{
                padding: "12px",
                borderRadius: "8px",
                backgroundColor:
                  "rgba(239, 68, 68, 0.1)",
                border:
                  "1px solid rgba(239, 68, 68, 0.3)",
                color:
                  "#ef4444",
                fontSize:
                  "0.9rem",
                textAlign:
                  "center",
              }}
            >
              {error}
            </div>
          )}

          <AuthButton
            type="submit"
            isLoading={
              isLoading
            }
            loadingText="Creating Account..."
          >
            Create Account
          </AuthButton>
        </form>

        <AuthDivider />

        <SocialLoginButtons />
      </AuthCard>
    </AuthLayout>
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight:
              "100vh",
            backgroundColor:
              "#111",
          }}
        />
      }
    >
      <SignUpContent />
    </Suspense>
  );
}