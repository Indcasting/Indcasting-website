import Footer from "@/components/Footer";

export default function Membership() {
  return (
    <main>

      {/* MEMBERSHIP HERO */}

<section className="membership-hero">

    <div className="membership-left">

        <span className="hero-badge">
            ✨ Premium Membership
        </span>

        <h1>
            Unlock Your Full
            <span> Casting Potential</span>
        </h1>

        <p>
            Whether you're an aspiring artist or a casting professional,
            our premium memberships provide better visibility,
            unlimited connections, and powerful casting tools.
        </p>

        <div className="hero-buttons">

            <button className="gold-btn">
                Join as Talent
            </button>

            <button className="outline-btn">
                Hire Talent
            </button>

        </div>

    </div>

    <div className="membership-right">

        <img
            src="/images/membership.png"
            alt="Membership"
        />

    </div>

</section>

      {/* PRICING */}

      <section className="section">

        <h2 className="section-title">
          Choose Your Membership
        </h2>

        <div className="pricing-grid">

          {/* BASIC */}

          <div className="price-card">

            <h3>Talent Basic</h3>

            <h1>Free</h1>

            <p>Perfect for beginners.</p>

            <ul>

              <li>✔ Create Portfolio</li>

              <li>✔ Upload Headshots</li>

              <li>✔ Apply to Casting Calls</li>

              <li>✔ Limited Messages</li>

            </ul>

            <button className="outline-btn">
              Get Started
            </button>

          </div>

          {/* PRO */}

          <div className="price-card featured">

            <span className="recommended">
              Most Popular
            </span>

            <h3>Talent Pro</h3>

            <h1>₹299/mo</h1>

            <p>Grow your acting career.</p>

            <ul>

              <li>✔ Unlimited Applications</li>

              <li>✔ Unlimited Messaging</li>

              <li>✔ Featured Portfolio</li>

              <li>✔ Priority Search Ranking</li>

              <li>✔ Profile Insights</li>

            </ul>

            <button className="gold-btn">
              Upgrade
            </button>

          </div>

          {/* SEEKER */}

          <div className="price-card">

            <h3>Seeker Premium</h3>

            <h1>₹999/mo</h1>

            <p>Designed for casting professionals.</p>

            <ul>

              <li>✔ Unlimited Casting Calls</li>

              <li>✔ Advanced Talent Filters</li>

              <li>✔ Unlimited Messaging</li>

              <li>✔ Priority Support</li>

              <li>✔ Shortlist Management</li>

            </ul>

            <button className="outline-btn">
              Choose Plan
            </button>

          </div>

        </div>

      </section>

      {/* BENEFITS */}

      <section className="section light">

        <h2 className="section-title">
          Why Upgrade?
        </h2>

        <div className="benefit-grid">

          <div className="benefit">
            ⭐ Featured Portfolio
          </div>

          <div className="benefit">
            🎬 Unlimited Casting Opportunities
          </div>

          <div className="benefit">
            💬 Unlimited Messaging
          </div>

          <div className="benefit">
            🔍 Advanced Search Filters
          </div>

          <div className="benefit">
            🚀 Faster Profile Visibility
          </div>

          <div className="benefit">
            🛡 Priority Support
          </div>

        </div>

      </section>

      {/* COMPARISON TABLE */}

<section className="section">

  <h2 className="section-title">
    Compare Membership Plans
  </h2>

  <div className="comparison-table">

    <table>

      <thead>

        <tr>
          <th>Features</th>
          <th>Talent Basic</th>
          <th>Talent Pro</th>
          <th>Seeker Premium</th>
        </tr>

      </thead>

      <tbody>

        <tr>
          <td>Create Portfolio</td>
          <td>✔</td>
          <td>✔</td>
          <td>✔</td>
        </tr>

        <tr>
          <td>Unlimited Applications</td>
          <td>✖</td>
          <td>✔</td>
          <td>✔</td>
        </tr>

        <tr>
          <td>Unlimited Messaging</td>
          <td>✖</td>
          <td>✔</td>
          <td>✔</td>
        </tr>

        <tr>
          <td>Featured Portfolio</td>
          <td>✖</td>
          <td>✔</td>
          <td>✖</td>
        </tr>

        <tr>
          <td>Priority Search</td>
          <td>✖</td>
          <td>✔</td>
          <td>✔</td>
        </tr>

        <tr>
          <td>Create Casting Calls</td>
          <td>✖</td>
          <td>✖</td>
          <td>✔</td>
        </tr>

        <tr>
          <td>Advanced Talent Filters</td>
          <td>✖</td>
          <td>✖</td>
          <td>✔</td>
        </tr>

        <tr>
          <td>Priority Support</td>
          <td>✖</td>
          <td>✔</td>
          <td>✔</td>
        </tr>

      </tbody>

    </table>

  </div>

</section>

{/* TESTIMONIALS */}

<section className="section light">

    <h2 className="section-title">
        Loved by Artists & Casting Professionals
    </h2>

    <div className="testimonial-grid">

        <div className="testimonial-card">

            <p>
                "Within two weeks of joining IndCasting Pro, I received
                three audition invitations from production houses I had
                never connected with before."
            </p>

            <h4>Riya Sharma</h4>

            <span>Actor • Mumbai</span>

        </div>

        <div className="testimonial-card">

            <p>
                "The advanced search filters helped us shortlist over
                150 suitable actors in just one afternoon. It saved our
                casting team countless hours."
            </p>

            <h4>Rahul Kapoor</h4>

            <span>Casting Director</span>

        </div>

        <div className="testimonial-card">

            <p>
                "The premium badge increased profile visits
                significantly. I booked two commercials through
                IndCasting."
            </p>

            <h4>Ananya Roy</h4>

            <span>Model</span>

        </div>

    </div>

</section>

      {/* FAQ */}

      <section className="section">

        <h2 className="section-title">
          Frequently Asked Questions
        </h2>

        <div className="faq">

          <div className="faq-item">
            <h3>Can I cancel anytime?</h3>
            <p>Yes. You can cancel your membership whenever you like.</p>
          </div>

          <div className="faq-item">
            <h3>Can I upgrade later?</h3>
            <p>Absolutely. Upgrade whenever your requirements grow.</p>
          </div>

          <div className="faq-item">
            <h3>Who should buy Seeker Premium?</h3>
            <p>
              Casting directors, agencies, filmmakers and production houses.
            </p>
          </div>

        </div>

      </section>

      <section className="cta">

    <h2>
        Ready to Unlock More Opportunities?
    </h2>

    <p>
        Join thousands of actors, models, creators and casting
        professionals who trust IndCasting to connect with the right
        opportunities every day.
    </p>

    <div className="hero-buttons">

        <button className="gold-btn">
            Upgrade Now
        </button>

        <button className="outline-btn">
            Contact Sales
        </button>

    </div>

</section>


    </main>
  );
}