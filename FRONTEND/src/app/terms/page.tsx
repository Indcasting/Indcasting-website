export default function TermsPage() {
  return (
    <>
      <main className="terms-page">

        <section className="policy-hero">

          <div className="policy-container">

            <span className="hero-badge">
              Terms & Conditions
            </span>

            <h1>Terms & Conditions</h1>

            <p>
              Welcome to IndCasting. By accessing or using our platform, you
              agree to comply with these Terms & Conditions. These terms govern
              your use of our services, whether you are a talent, casting
              professional, production house, or recruiter.
            </p>

            <p className="updated">
              Last Updated: July 2026
            </p>

          </div>

        </section>

        <section className="policy-content">

          <div className="policy-container">

            <div className="policy-card">

              <h2>1. Acceptance of Terms</h2>

              <p>
                By creating an account or using any part of IndCasting, you
                acknowledge that you have read, understood, and agreed to these
                Terms & Conditions.
              </p>

            </div>

            <div className="policy-card">

              <h2>2. User Accounts</h2>

              <ul>

                <li>Users must provide accurate and up-to-date information.</li>

                <li>Each user is responsible for maintaining the confidentiality of their account credentials.</li>

                <li>Users must not impersonate another individual or organization.</li>

                <li>You are responsible for all activities performed using your account.</li>

              </ul>

            </div>

            <div className="policy-card">

              <h2>3. Talent Responsibilities</h2>

              <ul>

                <li>Profiles should contain truthful information.</li>

                <li>Uploaded portfolios, headshots and audition videos must belong to the user.</li>

                <li>Users must not upload copyrighted or offensive material.</li>

                <li>Talent should communicate professionally with casting professionals.</li>

              </ul>

            </div>

            <div className="policy-card">

              <h2>4. Casting Professional Responsibilities</h2>

              <ul>

                <li>All casting calls must represent genuine opportunities.</li>

                <li>Misleading, fraudulent or discriminatory listings are prohibited.</li>

                <li>Production houses must respect applicant privacy.</li>

                <li>Hosts are responsible for the accuracy of job descriptions.</li>

              </ul>

            </div>

            <div className="policy-card">

              <h2>5. Content Ownership</h2>

              <p>
                Users retain ownership of the content they upload, including
                photographs, portfolios, videos and written information. By
                uploading content, users grant IndCasting a limited license to
                display and process that content solely for operating the
                platform.
              </p>

            </div>

            <div className="policy-card">

              <h2>6. Prohibited Activities</h2>

              <ul>

                <li>Posting false or misleading casting opportunities.</li>

                <li>Harassment, abuse or discrimination.</li>

                <li>Attempting unauthorized access to other accounts.</li>

                <li>Uploading malicious software or harmful content.</li>

                <li>Using automated bots to scrape platform data.</li>

              </ul>

            </div>

            <div className="policy-card">

              <h2>7. Membership & Payments</h2>

              <p>
                Certain features may require a paid membership. Subscription
                plans, billing cycles and payment policies will be clearly
                communicated before purchase. Premium access may be suspended if
                payments fail.
              </p>

            </div>

            <div className="policy-card">

              <h2>8. Suspension & Termination</h2>

              <p>
                IndCasting reserves the right to suspend or permanently terminate
                accounts that violate these Terms & Conditions or engage in
                fraudulent, abusive or illegal activities.
              </p>

            </div>

            <div className="policy-card">

              <h2>9. Disclaimer</h2>

              <p>
                IndCasting acts as a platform connecting talent with casting
                professionals. We do not guarantee employment, project selection,
                or successful casting outcomes.
              </p>

            </div>

            <div className="policy-card">

              <h2>10. Limitation of Liability</h2>

              <p>
                IndCasting shall not be liable for any direct, indirect,
                incidental or consequential damages arising from the use of the
                platform or interactions between users.
              </p>

            </div>

            <div className="policy-card">

              <h2>11. Changes to Terms</h2>

              <p>
                We may update these Terms & Conditions from time to time. Updated
                versions will be published on this page, and continued use of the
                platform constitutes acceptance of those revisions.
              </p>

            </div>

            <div className="policy-card contact-card">

              <h2>Need Assistance?</h2>

              <p>
                If you have questions regarding these Terms & Conditions, our
                support team is here to help.
              </p>

              <button className="gold-btn">
                Contact Support
              </button>

            </div>

          </div>

        </section>

      </main>

      <style>{`
        /* =====================================================
           TERMS & CONDITIONS — SAME THEME SYSTEM
           AS POST PAGE / PRIVACY PAGE

           Theme is controlled by the existing header:
           html.dark
        ===================================================== */

        .terms-page {
          --policy-ink: #0f0e0d;
          --policy-cream: #FFFDF7;
          --policy-gold: #c9a84c;
          --policy-gold2: #e8c96a;
          --policy-mist: #f0ebe0;
          --policy-mid: #6b6560;
          --policy-card: #ffffff;
          --policy-border: #e0dbd0;
          --policy-shadow: 0 8px 32px rgba(60, 50, 35, 0.08);

          min-height: 100vh;
          background: var(--policy-cream);
          color: var(--policy-ink);

          transition:
            background 0.35s ease,
            color 0.35s ease;
        }

        /* DARK MODE — SAME TRIGGER AS POST PAGE */

        html.dark .terms-page {
          --policy-ink: #f0eeea;
          --policy-cream: #0b0b0b;
          --policy-gold: #c9a84c;
          --policy-gold2: #f1d472;
          --policy-mist: #1e1e1e;
          --policy-mid: #a8a29e;
          --policy-card: #1a1a1a;
          --policy-border: #2e2e2e;
          --policy-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
        }

        .terms-page *,
        .terms-page *::before,
        .terms-page *::after {
          box-sizing: border-box;
        }

        .policy-container {
          width: min(1100px, calc(100% - 12vw));
          margin: 0 auto;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .policy-hero {
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
            var(--policy-cream);

          border-bottom: 1px solid var(--policy-mist);

          transition:
            background 0.35s ease,
            border-color 0.35s ease;
        }

        html.dark .policy-hero {
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(201, 168, 76, 0.08),
              transparent 55%
            ),
            #0b0b0b;
        }

        .policy-hero::before {
          content: "";

          position: absolute;
          top: 0;
          left: 0;
          right: 0;

          height: 2px;

          background: var(--policy-gold);
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;

          margin-bottom: 1.3rem;
          padding: 0.45rem 0.9rem;

          border: 1px solid var(--policy-gold);
          border-radius: 100px;

          background: rgba(201, 168, 76, 0.08);

          color: var(--policy-gold);

          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .policy-hero h1 {
          margin: 0 0 1.4rem;

          color: var(--policy-ink);

          font-size: clamp(3rem, 7vw, 6.2rem);
          line-height: 0.94;

          font-weight: 900;
          letter-spacing: -0.055em;
        }

        .policy-hero p {
          max-width: 780px;

          margin: 0;

          color: var(--policy-mid);

          font-size: clamp(0.98rem, 1.4vw, 1.08rem);
          line-height: 1.8;
        }

        .policy-hero .updated {
          margin-top: 1.4rem;

          color: var(--policy-gold);

          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        /* =====================================================
           CONTENT
        ===================================================== */

        .policy-content {
          padding:
            clamp(3.5rem, 6vw, 5.5rem)
            6vw
            6rem;

          background: var(--policy-cream);

          transition: background 0.35s ease;
        }

        .policy-content .policy-container {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 1.2rem;
        }

        /* =====================================================
           POLICY CARDS
        ===================================================== */

        .policy-card {
          position: relative;

          padding: 1.8rem 2rem;

          background: var(--policy-card);

          border: 1.5px solid var(--policy-mist);
          border-radius: 14px;

          box-shadow: var(--policy-shadow);

          transition:
            background 0.35s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.2s ease;
        }

        .policy-card:hover {
          transform: translateY(-2px);

          border-color: rgba(201, 168, 76, 0.5);

          box-shadow:
            0 16px 40px rgba(201, 168, 76, 0.10);
        }

        .policy-card h2 {
          display: flex;
          align-items: center;

          margin: 0 0 1rem;

          color: var(--policy-ink);

          font-size: clamp(1.1rem, 2vw, 1.35rem);
          line-height: 1.3;

          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .policy-card h2::before {
          content: "";

          flex-shrink: 0;

          width: 4px;
          height: 20px;

          margin-right: 10px;

          border-radius: 100px;

          background: var(--policy-gold);
        }

        .policy-card p {
          margin: 0 0 1rem;

          color: var(--policy-mid);

          font-size: 0.9rem;
          line-height: 1.8;
        }

        .policy-card p:last-child {
          margin-bottom: 0;
        }

        /* =====================================================
           LISTS
        ===================================================== */

        .policy-card ul {
          margin: 1rem 0 0;
          padding: 0;

          list-style: none;
        }

        .policy-card li {
          position: relative;

          padding:
            0.55rem
            0
            0.55rem
            1.25rem;

          color: var(--policy-mid);

          font-size: 0.88rem;
          line-height: 1.65;

          border-bottom: 1px dashed var(--policy-mist);
        }

        .policy-card li:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .policy-card li::before {
          content: "✦";

          position: absolute;
          left: 0;
          top: 0.62rem;

          color: var(--policy-gold);

          font-size: 0.55rem;
        }

        /* =====================================================
           CONTACT CARD
        ===================================================== */

        .policy-card.contact-card {
          grid-column: 1 / -1;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(201, 168, 76, 0.08),
              transparent 50%
            ),
            var(--policy-card);
        }

        html.dark .policy-card.contact-card {
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(201, 168, 76, 0.07),
              transparent 50%
            ),
            var(--policy-card);
        }

        .gold-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          margin-top: 0.8rem;
          padding: 0.75rem 1.3rem;

          border: 1px solid var(--policy-gold);
          border-radius: 999px;

          background: var(--policy-gold);
          color: #111;

          font: inherit;
          font-size: 0.78rem;
          font-weight: 800;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .gold-btn:hover {
          transform: translateY(-2px);

          box-shadow:
            0 10px 25px rgba(201, 168, 76, 0.25);
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 850px) {

          .policy-content .policy-container {
            grid-template-columns: 1fr;
          }

          .policy-card.contact-card {
            grid-column: auto;
          }

        }

        @media (max-width: 600px) {

          .policy-container {
            width: min(100% - 2rem, 1100px);
          }

          .policy-hero {
            padding:
              7rem
              1rem
              3.5rem;
          }

          .policy-content {
            padding:
              3rem
              1rem
              4rem;
          }

          .policy-card {
            padding: 1.4rem 1.3rem;
            border-radius: 12px;
          }

          .policy-hero h1 {
            font-size: clamp(3rem, 16vw, 4.5rem);
          }

        }
      `}</style>
    </>
  );
}