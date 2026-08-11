"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ChevronDown,
  MessageCircle,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  User,
  CalendarDays,
  Bell,
  ShieldCheck,
  Mail,
  ArrowRight,
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    question: "How do I complete my talent profile?",
    answer:
      "Go to your Portfolio from the dashboard and add your profile information, professional details, skills, languages, photos, reels and other relevant information. A complete profile helps casting directors understand your experience and suitability for projects.",
  },
  {
    category: "Applications",
    question: "How do I apply for a casting call?",
    answer:
      "Open Casting Calls from your dashboard, select a casting call that matches your profile and review its requirements. Select Apply and submit the required information. You can track your submitted applications from My Applications.",
  },
  {
    category: "Applications",
    question: "Where can I see my submitted applications?",
    answer:
      "Open My Applications from the sidebar. You can view the casting calls you have applied to and check the current status of each application.",
  },
  {
    category: "Applications",
    question: "Can I withdraw an application?",
    answer:
      "If the casting call still allows changes, you can manage the application from My Applications. If a withdrawal option is not available, contact the casting team through Messages.",
  },
  {
    category: "Portfolio",
    question: "What should I add to my portfolio?",
    answer:
      "Your portfolio should contain accurate professional information, a clear profile photo, relevant photos or headshots, showreels, skills, languages, physical attributes where relevant and previous credits or experience.",
  },
  {
    category: "Messages",
    question: "How do I contact a casting director?",
    answer:
      "Use Messages from the sidebar to communicate with casting directors and production teams. Keep conversations professional and avoid sharing sensitive personal information unnecessarily.",
  },
  {
    category: "Calendar",
    question: "What is the Calendar used for?",
    answer:
      "The Calendar helps you keep track of important dates related to your casting activities, applications, auditions, shoots and other professional commitments.",
  },
  {
    category: "Account",
    question: "How do I change my account settings?",
    answer:
      "Open Settings from the dashboard sidebar. You can manage your account preferences, notifications, appearance and other available settings from there.",
  },
  {
    category: "Safety",
    question: "What should I do if I receive a suspicious message?",
    answer:
      "Do not share passwords, financial information or other sensitive details. If a message appears suspicious or inappropriate, stop communicating and report the issue to the IndCasting support team.",
  },
];

const categories = [
  {
    title: "Getting Started",
    description: "Learn the basics of using IndCasting.",
    icon: BookOpen,
  },
  {
    title: "Casting Calls",
    description: "Find opportunities and understand requirements.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Applications",
    description: "Manage applications and track their progress.",
    icon: FileText,
  },
  {
    title: "Portfolio",
    description: "Build and present your professional profile.",
    icon: User,
  },
  {
    title: "Calendar",
    description: "Keep track of auditions and important dates.",
    icon: CalendarDays,
  },
  {
    title: "Messages",
    description: "Communicate with casting professionals.",
    icon: MessageCircle,
  },
];

const quickLinks = [
  {
    title: "Complete your portfolio",
    description: "Make your profile ready for casting directors.",
    href: "/dashboard/portfolio",
  },
  {
    title: "Browse casting calls",
    description: "Explore current opportunities that match your profile.",
    href: "/dashboard/casting-calls",
  },
  {
    title: "View applications",
    description: "Check the applications you have already submitted.",
    href: "/dashboard/applications",
  },
  {
    title: "Open your calendar",
    description: "Review upcoming auditions and important dates.",
    href: "/dashboard/Calendar",
  },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;

      if (!query) return matchesCategory;

      return (
        matchesCategory &&
        `${faq.question} ${faq.answer} ${faq.category}`
          .toLowerCase()
          .includes(query)
      );
    });
  }, [search, activeCategory]);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .help-page {
          min-height: 100vh;
          background: var(--dashboard-bg, #fffdf8);
          color: var(--dashboard-text, #111);
          padding: 42px 48px 80px;
          transition:
            background 0.25s ease,
            color 0.25s ease;
        }

        html.dark .help-page {
          --dashboard-bg: #0d0d0d;
          --dashboard-text: #f5f5f5;
        }

        .help-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }

        /* HERO */

        .help-hero {
          position: relative;
          overflow: hidden;
          padding: 58px 54px 62px;
          border: 1px solid rgba(201, 168, 76, 0.22);
          border-radius: 28px;
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(201, 168, 76, 0.14),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              rgba(201, 168, 76, 0.06),
              rgba(255, 255, 255, 0.02)
            );
        }

        html.dark .help-hero {
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(201, 168, 76, 0.11),
              transparent 34%
            ),
            #141414;
          border-color: #292929;
        }

        .help-hero::after {
          content: "";
          position: absolute;
          width: 260px;
          height: 260px;
          right: -100px;
          bottom: -150px;
          border-radius: 50%;
          border: 1px solid rgba(201, 168, 76, 0.2);
          pointer-events: none;
        }

        .help-eyebrow {
          margin: 0 0 12px;
          color: #c9a84c;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .help-title {
          margin: 0;
          font-family: "Instrument Serif", Georgia, serif;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 400;
          line-height: 0.98;
          letter-spacing: -0.035em;
        }

        .help-subtitle {
          max-width: 620px;
          margin: 18px 0 30px;
          color: #77716b;
          font-size: 1rem;
          line-height: 1.7;
        }

        html.dark .help-subtitle {
          color: #a7a7a7;
        }

        .help-search {
          position: relative;
          width: min(680px, 100%);
        }

        .help-search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
          pointer-events: none;
        }

        .help-search input {
          width: 100%;
          height: 58px;
          padding: 0 22px 0 56px;
          border: 1px solid #e5dfd4;
          border-radius: 16px;
          outline: none;
          background: rgba(255,255,255,0.86);
          color: #111;
          font-size: 0.95rem;
          transition: 0.2s ease;
        }

        .help-search input:focus {
          border-color: #c9a84c;
          box-shadow: 0 0 0 4px rgba(201,168,76,0.1);
        }

        html.dark .help-search input {
          background: #1c1c1c;
          border-color: #333;
          color: #fff;
        }

        html.dark .help-search input:focus {
          border-color: #c9a84c;
        }

        /* SECTION */

        .help-section {
          margin-top: 58px;
        }

        .help-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          margin-bottom: 22px;
        }

        .help-section-title {
          margin: 0;
          font-size: 1.45rem;
          font-weight: 750;
          letter-spacing: -0.025em;
        }

        .help-section-description {
          margin: 6px 0 0;
          color: #85807a;
          font-size: 0.9rem;
        }

        html.dark .help-section-description {
          color: #929292;
        }

        /* CATEGORY GRID */

        .help-category-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .help-category {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          min-height: 140px;
          padding: 22px;
          border: 1px solid #e9e3d8;
          border-radius: 20px;
          background: #fff;
          cursor: pointer;
          text-align: left;
          color: inherit;
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;
        }

        .help-category:hover {
          transform: translateY(-3px);
          border-color: rgba(201,168,76,0.55);
          box-shadow: 0 12px 35px rgba(30,25,15,0.07);
        }

        html.dark .help-category {
          background: #151515;
          border-color: #282828;
        }

        html.dark .help-category:hover {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 12px 35px rgba(0,0,0,0.25);
        }

        .help-category-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 12px;
          background: rgba(201,168,76,0.1);
          color: #c9a84c;
        }

        .help-category h3 {
          margin: 1px 0 7px;
          font-size: 0.98rem;
          font-weight: 750;
        }

        .help-category p {
          margin: 0;
          color: #817b75;
          font-size: 0.82rem;
          line-height: 1.55;
        }

        html.dark .help-category p {
          color: #999;
        }

        /* FAQ */

        .help-filter {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .help-filter button {
          padding: 8px 14px;
          border: 1px solid #e3ddd2;
          border-radius: 999px;
          background: transparent;
          color: #6e6861;
          font-size: 0.78rem;
          font-weight: 650;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .help-filter button:hover {
          border-color: #c9a84c;
          color: #c9a84c;
        }

        .help-filter button.active {
          border-color: #c9a84c;
          background: #c9a84c;
          color: #111;
        }

        html.dark .help-filter button {
          border-color: #303030;
          color: #aaa;
        }

        html.dark .help-filter button.active {
          border-color: #c9a84c;
          color: #111;
        }

        .faq-list {
          border-top: 1px solid #e5dfd5;
        }

        html.dark .faq-list {
          border-color: #292929;
        }

        .faq-item {
          border-bottom: 1px solid #e5dfd5;
        }

        html.dark .faq-item {
          border-color: #292929;
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 23px 4px;
          border: none;
          background: transparent;
          color: inherit;
          text-align: left;
          cursor: pointer;
          font-size: 0.96rem;
          font-weight: 700;
        }

        .faq-question:hover {
          color: #c9a84c;
        }

        .faq-chevron {
          flex-shrink: 0;
          transition: transform 0.2s ease;
          color: #999;
        }

        .faq-chevron.open {
          transform: rotate(180deg);
          color: #c9a84c;
        }

        .faq-answer {
          max-width: 820px;
          padding: 0 40px 24px 4px;
          color: #77716b;
          font-size: 0.88rem;
          line-height: 1.75;
        }

        html.dark .faq-answer {
          color: #a3a3a3;
        }

        /* QUICK LINKS */

        .quick-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .quick-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 22px;
          border: 1px solid #e6e0d6;
          border-radius: 18px;
          background: #fff;
          color: inherit;
          text-decoration: none;
          transition: 0.22s ease;
        }

        .quick-link:hover {
          transform: translateX(4px);
          border-color: rgba(201,168,76,0.55);
        }

        html.dark .quick-link {
          background: #151515;
          border-color: #282828;
        }

        .quick-link h3 {
          margin: 0 0 5px;
          font-size: 0.9rem;
          font-weight: 750;
        }

        .quick-link p {
          margin: 0;
          color: #85807a;
          font-size: 0.78rem;
        }

        html.dark .quick-link p {
          color: #929292;
        }

        .quick-link-arrow {
          color: #c9a84c;
          flex-shrink: 0;
        }

        /* CONTACT */

        .help-contact {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 30px;
          padding: 34px;
          border-radius: 24px;
          background: #151515;
          color: white;
          overflow: hidden;
          position: relative;
        }

        .help-contact::before {
          content: "";
          position: absolute;
          width: 240px;
          height: 240px;
          right: -100px;
          top: -120px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.28);
        }

        .help-contact h2 {
          margin: 0 0 8px;
          font-family: "Instrument Serif", Georgia, serif;
          font-size: 2rem;
          font-weight: 400;
        }

        .help-contact p {
          margin: 0;
          color: #aaa;
          font-size: 0.86rem;
          line-height: 1.6;
        }

        .help-contact-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: none;
          border-radius: 999px;
          background: #c9a84c;
          color: #111;
          font-size: 0.85rem;
          font-weight: 750;
          text-decoration: none;
          white-space: nowrap;
          transition: 0.2s ease;
        }

        .help-contact-button:hover {
          background: #e1c363;
          transform: translateY(-2px);
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .help-page {
            padding: 30px 24px 60px;
          }

          .help-category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 620px) {
          .help-page {
            padding: 22px 16px 50px;
          }

          .help-hero {
            padding: 38px 24px 42px;
            border-radius: 22px;
          }

          .help-title {
            font-size: 3rem;
          }

          .help-category-grid,
          .quick-links {
            grid-template-columns: 1fr;
          }

          .help-section {
            margin-top: 42px;
          }

          .help-contact {
            grid-template-columns: 1fr;
            padding: 26px;
          }
        }
      `}</style>

      <main className="help-page">
        <div className="help-container">
          {/* HERO */}
          <section className="help-hero">
            <p className="help-eyebrow">IndCasting Support</p>

            <h1 className="help-title">
              How can we
              <br />
              help you?
            </h1>

            <p className="help-subtitle">
              Find answers, learn how IndCasting works, or get help with your
              profile, applications and casting opportunities.
            </p>

            <div className="help-search">
              <Search className="help-search-icon" size={21} />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for answers..."
                aria-label="Search help center"
              />
            </div>
          </section>

          {/* CATEGORIES */}
          <section className="help-section">
            <div className="help-section-heading">
              <div>
                <h2 className="help-section-title">Browse help topics</h2>
                <p className="help-section-description">
                  Find information about the features you use most.
                </p>
              </div>
            </div>

            <div className="help-category-grid">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <button
                    key={category.title}
                    className="help-category"
                    onClick={() => {
                      setActiveCategory(category.title);
                      setSearch("");
                    }}
                  >
                    <div className="help-category-icon">
                      <Icon size={19} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3>{category.title}</h3>
                      <p>{category.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="help-section">
            <div className="help-section-heading">
              <div>
                <h2 className="help-section-title">Frequently asked questions</h2>
                <p className="help-section-description">
                  Quick answers to common questions from talents.
                </p>
              </div>
            </div>

            <div className="help-filter">
              {[
                "All",
                "Getting Started",
                "Applications",
                "Portfolio",
                "Messages",
                "Calendar",
                "Account",
                "Safety",
              ].map((category) => (
                <button
                  key={category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenFaq(null);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="faq-list">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div className="faq-item" key={faq.question}>
                      <button
                        className="faq-question"
                        onClick={() =>
                          setOpenFaq(isOpen ? null : index)
                        }
                      >
                        <span>{faq.question}</span>

                        <ChevronDown
                          className={`faq-chevron ${
                            isOpen ? "open" : ""
                          }`}
                          size={18}
                        />
                      </button>

                      {isOpen && (
                        <div className="faq-answer">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: "40px 4px",
                    color: "#888",
                    fontSize: "0.9rem",
                  }}
                >
                  No results found. Try searching with different keywords.
                </div>
              )}
            </div>
          </section>

          {/* QUICK LINKS */}
          <section className="help-section">
            <div className="help-section-heading">
              <div>
                <h2 className="help-section-title">Quick links</h2>
                <p className="help-section-description">
                  Jump directly to the tools you need.
                </p>
              </div>
            </div>

            <div className="quick-links">
              {quickLinks.map((link) => (
                <a key={link.title} href={link.href} className="quick-link">
                  <div>
                    <h3>{link.title}</h3>
                    <p>{link.description}</p>
                  </div>

                  <ArrowRight
                    className="quick-link-arrow"
                    size={18}
                  />
                </a>
              ))}
            </div>
          </section>

          {/* CONTACT */}
          <section className="help-section">
            <div className="help-contact">
              <div>
                <h2>Still need help?</h2>

                <p>
                  If you couldn't find what you were looking for, our support
                  team can help you with your IndCasting account.
                </p>
              </div>

              <a
                href="mailto:support@indcasting.in"
                className="help-contact-button"
              >
                <Mail size={16} />
                Contact Support
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}