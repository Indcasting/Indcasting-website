"use client";

import { useEffect, useState } from "react";
import "./accessibility.css";

const principles = [
  {
    number: "01",
    title: "Perceivable",
    text: "Information and interface elements should be presented in ways that people can perceive, including through text alternatives, clear visual hierarchy and adaptable layouts.",
  },
  {
    number: "02",
    title: "Operable",
    text: "Core actions should be usable through different input methods, including keyboard navigation, without requiring a specific type of interaction.",
  },
  {
    number: "03",
    title: "Understandable",
    text: "We aim to keep navigation, instructions, forms and content clear, consistent and predictable.",
  },
  {
    number: "04",
    title: "Compatible",
    text: "We work toward experiences that can interact reliably with modern browsers, devices and assistive technologies.",
  },
];

const features = [
  {
    title: "Keyboard navigation",
    text: "We aim to make important navigation, controls, forms and actions available without requiring a mouse.",
  },
  {
    title: "Screen readers",
    text: "We work toward meaningful headings, labels, link names and page structure so content can be interpreted by assistive technologies.",
  },
  {
    title: "Visual clarity",
    text: "We consider typography, spacing, contrast and visual hierarchy to help users find and understand information.",
  },
  {
    title: "Responsive layouts",
    text: "IndCasting is designed to adapt across desktop, tablet and mobile screen sizes.",
  },
  {
    title: "Clear interactions",
    text: "Buttons, links, forms and navigation should communicate their purpose clearly and behave consistently.",
  },
  {
    title: "Reduced complexity",
    text: "We aim to break information into clear sections and avoid unnecessary complexity when presenting important tasks.",
  },
];

export default function AccessibilityPage() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <main className="accessibility-page">
      {/* HERO */}
      <section className="accessibility-hero">
        <div className="accessibility-hero-grid" />

        <div className="accessibility-hero-inner">
          <div className="accessibility-eyebrow">
            INDCASTING · ACCESSIBILITY
          </div>

          <h1>
            ACCESSIBLE
            <br />
            <span>BY DESIGN.</span>
          </h1>

          <p>
            We believe creative opportunities should be discoverable,
            understandable and usable by as many people as possible.
          </p>

          <div className="accessibility-hero-line">
            <span />
            <small>INCLUSIVE DIGITAL EXPERIENCE</small>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="accessibility-intro-section">
        <div className="accessibility-container accessibility-intro-grid">
          <div>
            <span className="section-label">01 / OUR COMMITMENT</span>
            <h2>
              Everyone should have a fair chance to find their next
              opportunity.
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              IndCasting, a product of Ekagracit Technologies Private
              Limited, is committed to making its platform as accessible
              and inclusive as reasonably possible.
            </p>

            <p>
              IndCasting connects performers, creators, production teams
              and industry professionals. That means accessibility is
              important at every stage — from discovering a casting call
              and exploring a profile to submitting information and
              communicating with other members.
            </p>

            <p>
              Accessibility is an ongoing part of how we think about
              design, development and the experience of using IndCasting.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="accessibility-principles">
        <div className="accessibility-container">
          <div className="section-heading">
            <span className="section-label">02 / OUR APPROACH</span>

            <h2>
              Four principles
              <br />
              guide our work.
            </h2>

            <p>
              Our accessibility approach is informed by established web
              accessibility principles, including the four WCAG principles:
              perceivable, operable, understandable and robust.
            </p>
          </div>

          <div className="principles-grid">
            {principles.map((item) => (
              <article className="principle-card" key={item.number}>
                <div className="principle-top">
                  <span>{item.number}</span>
                  <div className="principle-dot" />
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="accessibility-features">
        <div className="accessibility-container">
          <div className="features-header">
            <div>
              <span className="section-label">
                03 / THE EXPERIENCE
              </span>

              <h2>
                Built for different
                <br />
                ways of using the web.
              </h2>
            </div>

            <p>
              Accessibility is not one feature. People use websites in
              different ways, with different devices, settings and
              assistive technologies.
            </p>
          </div>

          <div className="features-list">
            {features.map((feature, index) => (
              <div className="feature-row" key={feature.title}>
                <span className="feature-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>{feature.title}</h3>

                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="accessibility-content-section">
        <div className="accessibility-container content-two-column">
          <div>
            <span className="section-label">
              04 / CONTENT & MEDIA
            </span>

            <h2>
              Information should
              <br />
              remain understandable.
            </h2>
          </div>

          <div>
            <p>
              Casting calls, talent profiles and other information on
              IndCasting can contain text, images and other forms of
              media. We aim to provide information in a clear structure
              and to avoid making colour, images or visual presentation
              the only way to understand important information.
            </p>

            <p>
              Where appropriate, we work toward descriptive text,
              meaningful labels and alternatives for non-text content.
            </p>

            <p>
              We also aim to keep written content clear and organised,
              with headings and sections that make longer information
              easier to scan and understand.
            </p>
          </div>
        </div>
      </section>

      {/* FORMS */}
      <section className="accessibility-forms">
        <div className="accessibility-container">
          <div className="forms-panel">
            <div className="forms-mark">04</div>

            <div>
              <span className="section-label">
                CASTING & TALENT FLOWS
              </span>

              <h2>
                Accessibility matters
                <br />
                where opportunities happen.
              </h2>

              <p>
                We pay particular attention to the journeys that are
                central to IndCasting — discovering opportunities,
                reviewing talent, creating profiles, completing forms
                and communicating with other users.
              </p>

              <p>
                Our goal is to make these experiences clear and
                predictable, while reducing unnecessary barriers to
                completing important actions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ASSISTIVE TECHNOLOGY */}
      <section className="accessibility-support">
        <div className="accessibility-container support-grid">
          <div>
            <span className="section-label">
              05 / ASSISTIVE TECHNOLOGY
            </span>

            <h2>
              Designed to work
              <br />
              with your setup.
            </h2>
          </div>

          <div className="support-copy">
            <p>
              People may access IndCasting using screen readers,
              keyboard navigation, browser zoom, alternative input
              devices or other assistive technologies.
            </p>

            <p>
              We aim to build using standard web technologies and
              meaningful semantic structures so that the platform can
              work with a broad range of browsers and assistive tools.
            </p>

            <div className="support-note">
              <span>IMPORTANT</span>
              <p>
                Accessibility can vary depending on the device,
                browser, operating system, assistive technology and
                specific feature being used.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS IMPROVEMENT */}
      <section className="accessibility-improvement">
        <div className="accessibility-container">
          <div className="improvement-inner">
            <span className="section-label">
              06 / CONTINUOUS IMPROVEMENT
            </span>

            <h2>
              Accessibility is
              <br />
              never finished.
            </h2>

            <p>
              We continue to review the IndCasting experience and look
              for opportunities to improve accessibility as the
              platform evolves.
            </p>

            <p>
              We welcome feedback from people who use accessibility
              features, assistive technologies and alternative ways of
              interacting with the web. Real-world feedback helps us
              understand where the experience can be improved.
            </p>
          </div>
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="accessibility-feedback">
        <div className="accessibility-container">
          <div className="feedback-card">
            <div>
              <span className="section-label">
                07 / ACCESSIBILITY FEEDBACK
              </span>

              <h2>
                Found something
                <br />
                we can improve?
              </h2>

              <p>
                If you experience an accessibility barrier while using
                IndCasting, please let us know. Include the page or
                feature involved, what you were trying to do and,
                where possible, the device or assistive technology you
                were using.
              </p>
            </div>

            <div className="feedback-side">
              <div className="feedback-icon">↗</div>

              <span>WE WANT TO HEAR FROM YOU</span>

              <p>
                Your feedback helps us identify barriers and improve
                the experience for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="accessibility-status">
        <div className="accessibility-container status-inner">
          <div>
            <span>ACCESSIBILITY STATEMENT</span>
            <strong>IndCasting</strong>
          </div>

          <div className="status-date">
            <span>LAST REVIEWED</span>
            <strong>September 2026</strong>
          </div>
        </div>
      </section>
    </main>
  );
}