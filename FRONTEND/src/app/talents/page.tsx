"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Star,
  Briefcase,
  Languages,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";

interface Talent {
  id: string;
  name: string;
  region: string | null;
  experience: string | null;
  primarySkill: string | null;
  skill: string | null;
  bio: string | null;
  tags: string[];
  avatarUrl: string | null;
  verified: boolean;
  available: boolean;
  language: string;
  instagram: string | null;
  youtube: string | null;
  website: string | null;
  portfolio: string | null;
  joinedDate: string | null;
  createdAt: string;
}

const CATEGORIES = [
  "All",
  "Actors",
  "Models",
  "Voice Artists",
  "Dancers",
  "Singers",
  "Photographers",
  "Editors",
  "Directors",
  "Makeup Artists",
  "Writers",
];

const FALLBACK_IMAGE = "/images/img1.jpg";

export default function TalentDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [talents, setTalents] = useState<Talent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTalents() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:4000/talent-profiles"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch talent profiles");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response from server");
        }

        setTalents(data);
      } catch (err) {
        console.error("Failed to load talents:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load talent profiles."
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchTalents();
  }, []);

  const filteredTalents = talents.filter((talent) => {
    const searchableText = [
      talent.name,
      talent.primarySkill,
      talent.skill,
      talent.bio,
      talent.region,
      ...talent.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(
      searchQuery.toLowerCase()
    );

    const profession =
      talent.primarySkill ||
      talent.skill ||
      "";

    const categoryName = activeCategory
      .replace(/s$/, "")
      .toLowerCase();

    const matchesCategory =
      activeCategory === "All" ||
      profession.toLowerCase().includes(categoryName) ||
      talent.tags.some((tag) =>
        tag.toLowerCase().includes(categoryName)
      );

    return matchesSearch && matchesCategory;
  });

  const featuredTalents = talents.filter(
    (talent) => talent.verified
  );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        paddingBottom: "100px",
      }}
    >
      {/* =========================================================
          HERO
      ========================================================= */}

      <section
        style={{
          padding: "90px 5% 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              color: "#aaa",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "24px",
            }}
          >
            <Sparkles size={14} />
            Talent Discovery
          </div>

          <h1
            style={{
              fontSize: "clamp(3rem, 7vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              fontWeight: 900,
              maxWidth: "1000px",
              margin: 0,
            }}
          >
            Find the
            <br />
            <span style={{ color: "#777" }}>right talent.</span>
          </h1>

          <p
            style={{
              maxWidth: "650px",
              color: "#999",
              fontSize: "1.1rem",
              lineHeight: 1.7,
              marginTop: "30px",
            }}
          >
            Discover professionals across acting, modelling, voice,
            photography, direction, makeup and more.
          </p>

          {/* Search */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              maxWidth: "800px",
              marginTop: "40px",
              padding: "8px",
              borderRadius: "16px",
              background: "#fff",
              border: "2px solid #fff",
            }}
          >
            <Search
              size={22}
              color="#555"
              style={{ marginLeft: "12px", flexShrink: 0 }}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              placeholder="Search talent, skills, roles..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                color: "#111",
                fontSize: "1rem",
                padding: "12px 8px",
              }}
            />

            <button
              type="button"
              style={{
                border: "none",
                borderRadius: "10px",
                background: "#050505",
                color: "#fff",
                padding: "13px 20px",
                fontWeight: 800,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Search
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}

      <section
        style={{
          padding: "0 5% 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                color: "#777",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 800,
              }}
            >
              Total Talent
            </div>

            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                marginTop: "8px",
              }}
            >
              {talents.length}
            </div>
          </div>

          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                color: "#777",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 800,
              }}
            >
              Verified
            </div>

            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                marginTop: "8px",
              }}
            >
              {talents.filter(
                (talent) => talent.verified
              ).length}
            </div>
          </div>

          <div
            style={{
              padding: "28px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            <div
              style={{
                color: "#777",
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 800,
              }}
            >
              Featured
            </div>

            <div
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                marginTop: "8px",
              }}
            >
              {featuredTalents.length}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}

      <section
        style={{
          padding: "0 5% 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              minWidth: "max-content",
            }}
          >
            {CATEGORIES.map((category) => {
              const active =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  style={{
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: active
                      ? "1px solid #fff"
                      : "1px solid rgba(255,255,255,0.12)",
                    background: active
                      ? "#fff"
                      : "rgba(255,255,255,0.03)",
                    color: active
                      ? "#000"
                      : "#aaa",
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED TALENT
      ========================================================= */}

      {featuredTalents.length > 0 && (
        <section
          style={{
            padding: "0 5% 80px",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#777",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}
                >
                  Curated Profiles
                </div>

                <h2
                  style={{
                    fontSize:
                      "clamp(2rem, 4vw, 3.5rem)",
                    margin: 0,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                  }}
                >
                  Featured Professionals
                </h2>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {featuredTalents
                .slice(0, 3)
                .map((talent) => (
                  <TalentCard
                    key={talent.id}
                    talent={talent}
                    featured
                  />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          DIRECTORY
      ========================================================= */}

      <section
        style={{
          padding: "0 5%",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div>
              <div
                style={{
                  color: "#777",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                Directory
              </div>

              <h2
                style={{
                  fontSize:
                    "clamp(2rem, 4vw, 3.5rem)",
                  margin: 0,
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                }}
              >
                Explore Talent
              </h2>
            </div>

            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 15px",
                borderRadius: "10px",
                border:
                  "1px solid rgba(255,255,255,0.15)",
                background:
                  "rgba(255,255,255,0.04)",
                color: "#aaa",
                cursor: "pointer",
              }}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Loading */}

          {isLoading ? (
            <div
              style={{
                padding: "100px 20px",
                textAlign: "center",
                background:
                  "rgba(255,255,255,0.02)",
                borderRadius: "32px",
                border:
                  "1px dashed rgba(255,255,255,0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                Loading talent...
              </h2>

              <p
                style={{
                  color: "#888",
                }}
              >
                Fetching profiles from the database.
              </p>
            </div>
          ) : error ? (
            /* Error */

            <div
              style={{
                padding: "100px 20px",
                textAlign: "center",
                background:
                  "rgba(255,255,255,0.02)",
                borderRadius: "32px",
                border:
                  "1px dashed rgba(255,80,80,0.3)",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                Unable to load talent
              </h2>

              <p
                style={{
                  color: "#888",
                  marginBottom: "20px",
                }}
              >
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#fff",
                  color: "#000",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
            </div>
          ) : filteredTalents.length === 0 ? (
            /* Empty */

            <div
              style={{
                padding: "100px 20px",
                textAlign: "center",
                background:
                  "rgba(255,255,255,0.02)",
                borderRadius: "32px",
                border:
                  "1px dashed rgba(255,255,255,0.1)",
              }}
            >
              <Search
                size={40}
                color="#555"
                style={{
                  marginBottom: "20px",
                }}
              />

              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  marginBottom: "12px",
                }}
              >
                No talent found
              </h2>

              <p
                style={{
                  color: "#888",
                }}
              >
                No talent matches your current
                search or category.
              </p>
            </div>
          ) : (
            /* Talent grid */

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredTalents.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* =============================================================
   TALENT CARD
============================================================= */

function TalentCard({
  talent,
  featured = false,
}: {
  talent: Talent;
  featured?: boolean;
}) {
  const profession =
    talent.primarySkill ||
    talent.skill ||
    "Creative Professional";

  const location =
    talent.region ||
    "Location not specified";

  const experience =
    talent.experience ||
    "Experience not specified";

  const skills =
    talent.tags.length > 0
      ? talent.tags
      : [
          talent.primarySkill ||
            talent.skill ||
            "Creative",
        ];

  const image =
    talent.avatarUrl || FALLBACK_IMAGE;

  return (
    <article
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        border: featured
          ? "1px solid rgba(255,255,255,0.25)"
          : "1px solid rgba(255,255,255,0.1)",
        background: "#0b0b0b",
        position: "relative",
      }}
    >
      {/* Image */}

      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 4.5",
          overflow: "hidden",
          background: "#151515",
        }}
      >
        <img
          src={image}
          alt={talent.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75), transparent 60%)",
          }}
        />

        {/* Verified */}

        {talent.verified && (
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 10px",
              borderRadius: "999px",
              background: "#fff",
              color: "#000",
              fontSize: "0.72rem",
              fontWeight: 900,
            }}
          >
            <CheckCircle2 size={14} />
            VERIFIED
          </div>
        )}

        {/* Availability */}

        <div
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 10px",
            borderRadius: "999px",
            background: talent.available
              ? "rgba(20,20,20,0.8)"
              : "rgba(20,20,20,0.8)",
            color: talent.available
              ? "#fff"
              : "#888",
            fontSize: "0.72rem",
            fontWeight: 800,
            border:
              "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: talent.available
                ? "#fff"
                : "#555",
            }}
          />

          {talent.available
            ? "Available"
            : "Unavailable"}
        </div>

        {/* Name */}

        <div
          style={{
            position: "absolute",
            left: "20px",
            right: "20px",
            bottom: "20px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 900,
              margin: 0,
              letterSpacing: "-0.03em",
            }}
          >
            {talent.name}
          </h3>

          <p
            style={{
              margin: "5px 0 0",
              color: "#ccc",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            {profession}
          </p>
        </div>
      </div>

      {/* Content */}

      <div
        style={{
          padding: "20px",
        }}
      >
        {/* Location / Experience */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <MapPin
              size={16}
              color="#777"
              style={{
                marginTop: "2px",
                flexShrink: 0,
              }}
            />

            <div>
              <span
                style={{
                  display: "block",
                  color: "#666",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  fontWeight: 800,
                }}
              >
                Location
              </span>

              <span
                style={{
                  color: "#ccc",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                {location}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <Briefcase
              size={16}
              color="#777"
              style={{
                marginTop: "2px",
                flexShrink: 0,
              }}
            />

            <div>
              <span
                style={{
                  display: "block",
                  color: "#666",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  fontWeight: 800,
                }}
              >
                Experience
              </span>

              <span
                style={{
                  color: "#ccc",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                }}
              >
                {experience}
              </span>
            </div>
          </div>
        </div>

        {/* Language */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#aaa",
            fontSize: "0.8rem",
            marginBottom: "15px",
          }}
        >
          <Languages size={15} />

          <span>
            {talent.language || "Language not specified"}
          </span>
        </div>

        {/* Skills */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "18px",
          }}
        >
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              style={{
                padding: "6px 9px",
                borderRadius: "7px",
                background:
                  "rgba(255,255,255,0.06)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                color: "#aaa",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Bio */}

        {talent.bio && (
          <p
            style={{
              color: "#888",
              fontSize: "0.82rem",
              lineHeight: 1.6,
              margin: "0 0 20px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {talent.bio}
          </p>
        )}

        {/* Actions */}

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <Link
            href={`/talents/${talent.id}`}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px 16px",
              borderRadius: "10px",
              border:
                "2px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            View Profile
          </Link>

          <button
            type="button"
            aria-label={`Save ${talent.name}`}
            onClick={() =>
              alert(`Saved ${talent.name}`)
            }
            style={{
              width: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.04)",
              color: "#aaa",
              cursor: "pointer",
            }}
          >
            <Heart size={17} />
          </button>

          <button
            type="button"
            aria-label={`Message ${talent.name}`}
            onClick={() =>
              alert(`Message ${talent.name}`)
            }
            style={{
              width: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.04)",
              color: "#aaa",
              cursor: "pointer",
            }}
          >
            <MessageCircle size={17} />
          </button>

          <button
            type="button"
            aria-label={`Share ${talent.name}`}
            onClick={() =>
              alert(`Share ${talent.name}`)
            }
            style={{
              width: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.04)",
              color: "#aaa",
              cursor: "pointer",
            }}
          >
            <Share2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}