import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <main>

      <section className="policy-hero">

        <div className="policy-container">

          <span className="hero-badge">
            Privacy & Security
          </span>

          <h1>
            Privacy Policy
          </h1>

          <p>
            At IndCasting, protecting your personal information is one of our
            highest priorities. This Privacy Policy explains how we collect,
            use, store and protect your information when you use our platform.
          </p>

          <p className="updated">
            Last Updated: July 2026
          </p>

        </div>

      </section>

      <section className="policy-content">

        <div className="policy-container">

          <div className="policy-card">

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

          <div className="policy-card">

            <h2>2. How We Use Your Information</h2>

            <p>
              Information collected through IndCasting is used solely to improve
              the casting experience for both talent and casting professionals.
            </p>

            <ul>

              <li>Create and manage user accounts</li>

              <li>Display talent portfolios to verified casting directors</li>

              <li>Match users with relevant casting opportunities</li>

              <li>Improve recommendations using platform analytics</li>

              <li>Provide customer support</li>

              <li>Send important service updates</li>

            </ul>

          </div>

          <div className="policy-card">

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

          <div className="policy-card">

            <h2>4. Data Security</h2>

            <p>

              We use industry-standard security measures to safeguard personal
              information against unauthorized access, misuse or disclosure.
              While no online platform can guarantee absolute security, we
              continuously improve our infrastructure and security practices.

            </p>

          </div>

          <div className="policy-card">

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

          <div className="policy-card">

            <h2>6. Cookies</h2>

            <p>

              IndCasting uses cookies and similar technologies to enhance user
              experience, remember preferences, improve performance and analyze
              platform usage.

            </p>

          </div>

          <div className="policy-card">

            <h2>7. Children's Privacy</h2>

            <p>

              Users under the age required by applicable laws should only use
              the platform with the consent and supervision of a parent or legal
              guardian.

            </p>

          </div>

          <div className="policy-card">

            <h2>8. Your Rights</h2>

            <ul>

              <li>Access your personal information</li>

              <li>Update or correct profile details</li>

              <li>Request account deletion</li>

              <li>Withdraw consent where applicable</li>

              <li>Request removal of uploaded content</li>

            </ul>

          </div>

          <div className="policy-card">

            <h2>9. Policy Updates</h2>

            <p>

              We may update this Privacy Policy periodically to reflect changes
              in our services, technology or legal obligations. Updated versions
              will always be published on this page.

            </p>

          </div>

          <div className="policy-card contact-card">

            <h2>Contact Us</h2>

            <p>

              If you have any questions regarding this Privacy Policy or your
              personal information, please contact the IndCasting support team.

            </p>

            <button className="gold-btn">
              Contact Support
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}