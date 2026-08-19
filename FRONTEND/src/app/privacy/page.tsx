export default function PrivacyPolicy() {
  return (
    <>
      <main className="privacy-page">

        {/* HERO */}
        <section className="privacy-hero">
          <div className="privacy-container">

            <span className="privacy-badge">
              Privacy &amp; Security
            </span>

            <h1>Privacy Policy</h1>

            <p className="privacy-intro">
              At IndCasting, protecting your personal information is one of our
              highest priorities. This Privacy Policy explains how we collect,
              use, store and protect your information when you use our platform.
            </p>

            <p className="privacy-updated">
              Last Updated: July 2026
            </p>

          </div>
        </section>

        {/* CONTENT */}
        <section className="privacy-content">
          <div className="privacy-container">

            <div className="privacy-card">
              <h2>1. Information We Collect</h2>

              <p>
                We collect information you voluntarily provide while creating an
                account, completing your profile, posting casting opportunities,
                or applying for casting calls.
              </p>

              <ul>
                <li>Personal Information (Name, Email, Phone Number)</li>
                <li>Profile photographs and headshots</li>
                <li>Audition videos and portfolio media</li>
                <li>Age, gender, languages and physical attributes</li>
                <li>Professional experience and skills</li>
                <li>Location and contact details</li>
              </ul>
            </div>

            <div className="privacy-card">
              <h2>2. How We Use Your Information</h2>

              <p>
                Information collected through IndCasting is used solely to
                improve the casting experience for both talent and casting
                professionals.
              </p>

              <ul>
                <li>Create and manage user accounts</li>
                <li>
                  Display talent portfolios to verified casting directors
                </li>
                <li>Match users with relevant casting opportunities</li>
                <li>Improve recommendations using platform analytics</li>
                <li>Provide customer support</li>
                <li>Send important service updates</li>
              </ul>
            </div>

            <div className="privacy-card">
              <h2>3. Privacy Controls</h2>

              <p>
                Users remain in control of the information displayed on their
                profiles.
              </p>

              <ul>
                <li>Choose profile visibility settings</li>
                <li>Control portfolio accessibility</li>
                <li>Hide personal contact information</li>
                <li>Delete media uploads anytime</li>
                <li>Deactivate or permanently delete your account</li>
              </ul>
            </div>

            <div className="privacy-card">
              <h2>4. Data Security</h2>

              <p>
                We use industry-standard security measures to safeguard personal
                information against unauthorized access, misuse or disclosure.
                While no online platform can guarantee absolute security, we
                continuously improve our infrastructure and security practices.
              </p>
            </div>

            <div className="privacy-card">
              <h2>5. Sharing Information</h2>

              <p>
                We never sell your personal information.
              </p>

              <p>
                Your profile is only shared with authorized users according to
                your selected privacy settings. Information may also be disclosed
                if required by applicable laws or legal obligations.
              </p>
            </div>

            <div className="privacy-card">
              <h2>6. Cookies</h2>

              <p>
                IndCasting uses cookies and similar technologies to enhance user
                experience, remember preferences, improve performance and
                analyze platform usage.
              </p>
            </div>

            <div className="privacy-card">
              <h2>7. Children's Privacy</h2>

              <p>
                Users under the age required by applicable laws should only use
                the platform with the consent and supervision of a parent or
                legal guardian.
              </p>
            </div>

            <div className="privacy-card">
              <h2>8. Your Rights</h2>

              <ul>
                <li>Access your personal information</li>
                <li>Update or correct profile details</li>
                <li>Request account deletion</li>
                <li>Withdraw consent where applicable</li>
                <li>Request removal of uploaded content</li>
              </ul>
            </div>

            <div className="privacy-card">
              <h2>9. Policy Updates</h2>

              <p>
                We may update this Privacy Policy periodically to reflect
                changes in our services, technology or legal obligations.
                Updated versions will always be published on this page.
              </p>
            </div>

            {/* CONTACT — NO EXTRA BUTTON */}
            <div className="privacy-card privacy-contact">
              <h2>Contact Us</h2>

              <p>
                If you have any questions regarding this Privacy Policy or your
                personal information, please contact the IndCasting support team.
              </p>
            </div>

          </div>
        </section>

      </main>

      <style>{`
        /* =====================================================
           PRIVACY PAGE
           Uses the SAME theme system as Post/page.tsx:
           html.dark
        ===================================================== */

        .privacy-page {
          --privacy-ink: #0f0e0d;
          --privacy-cream: #FFFDF7;
          --privacy-gold: #c9a84c;
          --privacy-gold2: #e8c96a;
          --privacy-mist: #f0ebe0;
          --privacy-mid: #6b6560;
          --privacy-card: #ffffff;
          --privacy-border: #e0dbd0;
          --privacy-subtle: #faf8f2;
          --privacy-shadow: 0 8px 32px rgba(60, 50, 35, 0.08);

          min-height: 100vh;
          background: var(--privacy-cream);
          color: var(--privacy-ink);

          transition:
            background 0.35s ease,
            color 0.35s ease;
        }

        /*
          SAME DARK-MODE TRIGGER AS POST PAGE
        */

        html.dark .privacy-page {
          --privacy-ink: #f0eeea;
          --privacy-cream: #0b0b0b;
          --privacy-gold: #c9a84c;
          --privacy-gold2: #f1d472;
          --privacy-mist: #1e1e1e;
          --privacy-mid: #a8a29e;
          --privacy-card: #1a1a1a;
          --privacy-border: #2e2e2e;
          --privacy-subtle: #111111;
          --privacy-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }

        .privacy-page *,
        .privacy-page *::before,
        .privacy-page *::after {
          box-sizing: border-box;
        }

        .privacy-container {
          width: min(1100px, calc(100% - 12vw));
          margin: 0 auto;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .privacy-hero {
          position: relative;
          overflow: hidden;

          padding:
            clamp(7rem, 13vw, 10rem)
            6vw
            clamp(4rem, 7vw, 6rem);

          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(201, 168, 76, 0.10),
              transparent 55%
            ),
            var(--privacy-cream);

          border-bottom: 1px solid var(--privacy-mist);

          transition:
            background 0.35s ease,
            border-color 0.35s ease;
        }

        html.dark .privacy-hero {
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(201, 168, 76, 0.08),
              transparent 55%
            ),
            #0b0b0b;
        }

        .privacy-hero::before {
          content: "";

          position: absolute;
          top: 0;
          left: 0;
          right: 0;

          height: 2px;

          background: var(--privacy-gold);
        }

        .privacy-badge {
          display: inline-flex;
          align-items: center;

          margin-bottom: 1.3rem;
          padding: 0.45rem 0.9rem;

          border: 1px solid var(--privacy-gold);
          border-radius: 100px;

          background: rgba(201, 168, 76, 0.08);

          color: var(--privacy-gold);

          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .privacy-hero h1 {
          margin: 0 0 1.4rem;

          color: var(--privacy-ink);

          font-size: clamp(3rem, 7vw, 6.2rem);
          line-height: 0.94;

          font-weight: 900;
          letter-spacing: -0.055em;
        }

        .privacy-intro {
          max-width: 780px;

          margin: 0;

          color: var(--privacy-mid);

          font-size: clamp(0.98rem, 1.4vw, 1.08rem);
          line-height: 1.8;
        }

        .privacy-updated {
          margin: 1.4rem 0 0;

          color: var(--privacy-gold);

          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* =====================================================
           CONTENT
        ===================================================== */

        .privacy-content {
          padding: clamp(3.5rem, 6vw, 5.5rem) 6vw 6rem;

          background: var(--privacy-cream);

          transition: background 0.35s ease;
        }

        .privacy-content .privacy-container {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 1.2rem;
        }

        /* =====================================================
           POLICY CARDS
        ===================================================== */

        .privacy-card {
          position: relative;

          padding: 1.8rem 2rem;

          background: var(--privacy-card);

          border: 1.5px solid var(--privacy-mist);
          border-radius: 14px;

          box-shadow: var(--privacy-shadow);

          transition:
            background 0.35s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.2s ease;
        }

        .privacy-card:hover {
          transform: translateY(-2px);

          border-color: rgba(201, 168, 76, 0.5);

          box-shadow:
            0 16px 40px rgba(201, 168, 76, 0.10);
        }

        .privacy-card h2 {
          display: flex;
          align-items: center;

          margin: 0 0 1rem;

          color: var(--privacy-ink);

          font-size: clamp(1.1rem, 2vw, 1.35rem);
          line-height: 1.3;

          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .privacy-card h2::before {
          content: "";

          flex-shrink: 0;

          width: 4px;
          height: 20px;

          margin-right: 10px;

          border-radius: 100px;

          background: var(--privacy-gold);
        }

        .privacy-card p {
          margin: 0 0 1rem;

          color: var(--privacy-mid);

          font-size: 0.9rem;
          line-height: 1.8;
        }

        .privacy-card p:last-child {
          margin-bottom: 0;
        }

        /* =====================================================
           LISTS
        ===================================================== */

        .privacy-card ul {
          margin: 1rem 0 0;
          padding: 0;

          list-style: none;
        }

        .privacy-card li {
          position: relative;

          padding:
            0.55rem
            0
            0.55rem
            1.25rem;

          color: var(--privacy-mid);

          font-size: 0.88rem;
          line-height: 1.65;

          border-bottom: 1px dashed var(--privacy-mist);
        }

        .privacy-card li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .privacy-card li::before {
          content: "✦";

          position: absolute;
          left: 0;
          top: 0.62rem;

          color: var(--privacy-gold);

          font-size: 0.55rem;
        }

        /* =====================================================
           CONTACT
        ===================================================== */

        .privacy-contact {
          grid-column: 1 / -1;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(201, 168, 76, 0.08),
              transparent 50%
            ),
            var(--privacy-card);
        }

        html.dark .privacy-contact {
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(201, 168, 76, 0.07),
              transparent 50%
            ),
            var(--privacy-card);
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 850px) {
          .privacy-content .privacy-container {
            grid-template-columns: 1fr;
          }

          .privacy-contact {
            grid-column: auto;
          }
        }

        @media (max-width: 600px) {
          .privacy-container {
            width: min(100% - 2rem, 1100px);
          }

          .privacy-hero {
            padding:
              7rem
              1rem
              3.5rem;
          }

          .privacy-content {
            padding:
              3rem
              1rem
              4rem;
          }

          .privacy-card {
            padding: 1.4rem 1.3rem;
            border-radius: 12px;
          }

          .privacy-hero h1 {
            font-size: clamp(3rem, 16vw, 4.5rem);
          }
        }
      `}</style>
    </>
  );
}