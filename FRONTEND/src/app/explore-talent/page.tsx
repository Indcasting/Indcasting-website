"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

import { apiFetch } from "@/lib/api";

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
  language: string | null;
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

export default function ExploreTalentPage() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTalents() {
      try {
        setLoading(true);
        setError("");

        const data = await apiFetch("/talent-profiles");

        if (!Array.isArray(data)) {
          throw new Error(
            "Invalid response from server",
          );
        }

        setTalents(data);
      } catch (err) {
        console.error(
          "Failed to load talent:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load talent.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadTalents();
  }, []);

  const filteredTalents = useMemo(() => {
    const query = searchQuery
      .trim()
      .toLowerCase();

    const category =
      activeCategory
        .replace(/s$/, "")
        .toLowerCase();

    return talents.filter((talent) => {
      const searchableText = [
        talent.name,
        talent.region,
        talent.experience,
        talent.primarySkill,
        talent.skill,
        talent.bio,
        talent.language,
        ...talent.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      const profession =
        talent.primarySkill ||
        talent.skill ||
        "";

      const matchesCategory =
        activeCategory === "All" ||
        profession
          .toLowerCase()
          .includes(category) ||
        talent.tags.some((tag) =>
          tag.toLowerCase().includes(category),
        );

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    talents,
    searchQuery,
    activeCategory,
  ]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        padding: "100px 5% 80px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <section
          style={{
            marginBottom: "50px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "8px 14px",
              borderRadius: "999px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              color: "#aaa",
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "20px",
            }}
          >
            Talent Discovery
          </div>

          <h1
            style={{
              fontSize:
                "clamp(3rem, 7vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.06em",
              fontWeight: 900,
              margin: 0,
            }}
          >
            Explore
            <br />
            <span style={{ color: "#777" }}>
              Talent.
            </span>
          </h1>

          <p
            style={{
              maxWidth: "650px",
              color: "#999",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginTop: "25px",
            }}
          >
            Search and discover actors, models,
            dancers, singers, photographers,
            directors and other creative
            professionals.
          </p>
        </section>

        {/* SEARCH */}

        <section
          style={{
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              background: "#fff",
              padding: "8px",
              borderRadius: "14px",
              maxWidth: "850px",
            }}
          >
            <Search
              size={21}
              color="#555"
              style={{
                marginLeft: "12px",
                flexShrink: 0,
              }}
            />

            <input
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(
                  e.target.value,
                )
              }
              placeholder="Search by name, skill, location, role..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background:
                  "transparent",
                color: "#111",
                fontSize: "1rem",
                padding: "13px 8px",
              }}
            />

            <button
              type="button"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                border: "none",
                borderRadius: "9px",
                background: "#050505",
                color: "#fff",
                padding:
                  "13px 18px",
                fontWeight: 800,
              }}
            >
              Search
              <ArrowRight size={15} />
            </button>
          </div>
        </section>

        {/* CATEGORIES */}

        <section
          style={{
            marginBottom: "45px",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "9px",
              minWidth: "max-content",
            }}
          >
            {CATEGORIES.map(
              (category) => {
                const active =
                  category ===
                  activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category,
                      )
                    }
                    style={{
                      padding:
                        "10px 16px",
                      borderRadius:
                        "999px",
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
                      whiteSpace:
                        "nowrap",
                    }}
                  >
                    {category}
                  </button>
                );
              },
            )}
          </div>
        </section>

        {/* RESULTS HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div>
            <div
              style={{
                color: "#666",
                fontSize: "0.72rem",
                fontWeight: 800,
                textTransform:
                  "uppercase",
                letterSpacing:
                  "0.08em",
              }}
            >
              Directory
            </div>

            <h2
              style={{
                margin:
                  "5px 0 0",
                fontSize: "2rem",
                fontWeight: 900,
              }}
            >
              {filteredTalents.length}{" "}
              {filteredTalents.length ===
              1
                ? "Talent"
                : "Talents"}
            </h2>
          </div>

          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding:
                "10px 14px",
              borderRadius: "10px",
              border:
                "1px solid rgba(255,255,255,0.15)",
              background:
                "rgba(255,255,255,0.04)",
              color: "#aaa",
            }}
          >
            <SlidersHorizontal
              size={16}
            />
            Filters
          </button>
        </div>

        {/* LOADING */}

        {loading && (
          <div
            style={{
              padding: "100px 20px",
              textAlign: "center",
              borderRadius: "25px",
              border:
                "1px dashed rgba(255,255,255,0.12)",
              color: "#888",
            }}
          >
            Loading talent...
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div
            style={{
              padding: "100px 20px",
              textAlign: "center",
              borderRadius: "25px",
              border:
                "1px dashed rgba(255,80,80,0.3)",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
              }}
            >
              Unable to load talent
            </h2>

            <p
              style={{
                color: "#888",
              }}
            >
              {error}
            </p>
          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          filteredTalents.length ===
            0 && (
            <div
              style={{
                padding: "100px 20px",
                textAlign: "center",
                borderRadius: "25px",
                border:
                  "1px dashed rgba(255,255,255,0.12)",
              }}
            >
              <Search
                size={40}
                color="#555"
              />

              <h2
                style={{
                  marginTop: "20px",
                }}
              >
                No talent found
              </h2>

              <p
                style={{
                  color: "#888",
                  marginTop: "8px",
                }}
              >
                Try another search or
                category.
              </p>
            </div>
          )}

        {/* RESULTS */}

        {!loading &&
          !error &&
          filteredTalents.length >
            0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {filteredTalents.map(
                (talent) => {
                  const profession =
                    talent.primarySkill ||
                    talent.skill ||
                    "Creative Professional";

                  return (
                    <article
                      key={talent.id}
                      style={{
                        overflow: "hidden",
                        borderRadius: "22px",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        background:
                          "#0b0b0b",
                      }}
                    >
                      {/* IMAGE */}

                      <div
                        style={{
                          position:
                            "relative",
                          aspectRatio:
                            "4 / 4.5",
                          background:
                            "#151515",
                        }}
                      >
                        <img
                          src={
                            talent.avatarUrl ||
                            FALLBACK_IMAGE
                          }
                          alt={
                            talent.name
                          }
                          style={{
                            width:
                              "100%",
                            height:
                              "100%",
                            objectFit:
                              "cover",
                            display:
                              "block",
                          }}
                        />

                        {talent.verified && (
                          <div
                            style={{
                              position:
                                "absolute",
                              top: "14px",
                              left: "14px",
                              display:
                                "flex",
                              alignItems:
                                "center",
                              gap: "5px",
                              padding:
                                "7px 10px",
                              borderRadius:
                                "999px",
                              background:
                                "#fff",
                              color:
                                "#000",
                              fontSize:
                                "0.7rem",
                              fontWeight:
                                900,
                            }}
                          >
                            <CheckCircle2
                              size={
                                14
                              }
                            />
                            VERIFIED
                          </div>
                        )}

                        <div
                          style={{
                            position:
                              "absolute",
                            bottom:
                              "18px",
                            left:
                              "18px",
                            right:
                              "18px",
                          }}
                        >
                          <h3
                            style={{
                              margin:
                                0,
                              fontSize:
                                "1.5rem",
                              fontWeight:
                                900,
                            }}
                          >
                            {
                              talent.name
                            }
                          </h3>

                          <p
                            style={{
                              margin:
                                "5px 0 0",
                              color:
                                "#ccc",
                              fontSize:
                                "0.88rem",
                            }}
                          >
                            {
                              profession
                            }
                          </p>
                        </div>
                      </div>

                      {/* CONTENT */}

                      <div
                        style={{
                          padding:
                            "20px",
                        }}
                      >
                        <div
                          style={{
                            display:
                              "grid",
                            gridTemplateColumns:
                              "1fr 1fr",
                            gap: "12px",
                            marginBottom:
                              "18px",
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",
                              gap: "8px",
                            }}
                          >
                            <MapPin
                              size={
                                16
                              }
                              color="#777"
                            />

                            <div>
                              <div
                                style={{
                                  color:
                                    "#666",
                                  fontSize:
                                    "0.65rem",
                                  textTransform:
                                    "uppercase",
                                  fontWeight:
                                    800,
                                }}
                              >
                                Location
                              </div>

                              <div
                                style={{
                                  color:
                                    "#ccc",
                                  fontSize:
                                    "0.82rem",
                                  fontWeight:
                                    600,
                                }}
                              >
                                {
                                  talent.region ||
                                  "Not specified"
                                }
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              display:
                                "flex",
                              gap: "8px",
                            }}
                          >
                            <Briefcase
                              size={
                                16
                              }
                              color="#777"
                            />

                            <div>
                              <div
                                style={{
                                  color:
                                    "#666",
                                  fontSize:
                                    "0.65rem",
                                  textTransform:
                                    "uppercase",
                                  fontWeight:
                                    800,
                                }}
                              >
                                Experience
                              </div>

                              <div
                                style={{
                                  color:
                                    "#ccc",
                                  fontSize:
                                    "0.82rem",
                                  fontWeight:
                                    600,
                                }}
                              >
                                {
                                  talent.experience ||
                                  "Not specified"
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* TAGS */}

                        {talent.tags
                          .length >
                          0 && (
                          <div
                            style={{
                              display:
                                "flex",
                              flexWrap:
                                "wrap",
                              gap: "6px",
                              marginBottom:
                                "18px",
                            }}
                          >
                            {talent.tags
                              .slice(
                                0,
                                4,
                              )
                              .map(
                                (
                                  tag,
                                ) => (
                                  <span
                                    key={
                                      tag
                                    }
                                    style={{
                                      padding:
                                        "6px 9px",
                                      borderRadius:
                                        "7px",
                                      background:
                                        "rgba(255,255,255,0.06)",
                                      color:
                                        "#aaa",
                                      fontSize:
                                        "0.7rem",
                                      fontWeight:
                                        700,
                                    }}
                                  >
                                    {
                                      tag
                                    }
                                  </span>
                                ),
                              )}
                          </div>
                        )}

                        {/* VIEW */}

                        <Link
                          href={`/talents/${talent.id}`}
                          style={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            justifyContent:
                              "center",
                            gap: "8px",
                            width:
                              "100%",
                            padding:
                              "12px 16px",
                            borderRadius:
                              "10px",
                            border:
                              "1px solid rgba(255,255,255,0.2)",
                            color:
                              "#fff",
                            textDecoration:
                              "none",
                            fontWeight:
                              700,
                            fontSize:
                              "0.85rem",
                          }}
                        >
                          View Profile
                          <ArrowRight
                            size={
                              15
                            }
                          />
                        </Link>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          )}
      </div>
    </main>
  );
}