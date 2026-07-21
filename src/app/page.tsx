import Image from "next/image";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-text">

          <p className="hero-tag">
            India's Premium Casting Platform
          </p>

          <h1>
            Discover the Right Talent for Every Story.
          </h1>

          <p className="hero-description">
            IndCasting connects actors, models, dancers, singers, voice
            artists and creators with casting directors, filmmakers and
            production houses through a secure and professional platform.
          </p>

          <div className="hero-buttons">

  <button className="gold-btn">
    Explore Talent
  </button>

  <button className="purple-btn">
    Join as Talent
  </button>

</div>

        </div>

        <div className="hero-image">

          <Image
            src="/images/hero.jpg"
            alt="Film Production"
            width={650}
            height={650}
            priority
          />

        </div>

      </section>



      {/* HOW IT WORKS */}

      <section className="section">

        <h2 className="section-title">
          How IndCasting Works
        </h2>

        <div className="card-container">

          <div className="card">

            <h3>🎭</h3>

            <h4>Create Your Portfolio</h4>

            <p>
              Upload headshots, audition videos, experience, skills and
              achievements to build a professional profile.
            </p>

          </div>

          <div className="card">

            <h3>🎬</h3>

            <h4>Get Discovered</h4>

            <p>
              Casting directors search using smart filters and shortlist
              suitable talent for their upcoming projects.
            </p>

          </div>

          <div className="card">

            <h3>🤝</h3>

            <h4>Connect & Collaborate</h4>

            <p>
              Message directly, schedule auditions and begin working on films,
              advertisements, music videos and web series.
            </p>

          </div>

        </div>

      </section>



      {/* TALENT CATEGORIES */}

      <section className="section light">

        <h2 className="section-title">
          Browse Talent Categories
        </h2>

        <div className="category-grid">

          <div className="category">Actors</div>

          <div className="category">Models</div>

          <div className="category">Singers</div>

          <div className="category">Dancers</div>

          <div className="category">Voice Artists</div>

          <div className="category">Child Artists</div>

          <div className="category">Influencers</div>

          <div className="category">Anchors</div>

        </div>

      </section>



      {/* WHY CHOOSE */}

      <section className="section why">

        <div className="why-image">

          <Image
            src="/images/why.jpg"
            alt="Casting"
            width={550}
            height={550}
          />

        </div>

        <div className="why-content">

          <h2>
            Why Choose IndCasting?
          </h2>

          <ul>

            <li>✔ Verified Talent Profiles</li>

            <li>✔ Privacy Controlled Portfolio Sharing</li>

            <li>✔ Smart Search & Filters</li>

            <li>✔ Direct Messaging</li>

            <li>✔ Fast Shortlisting</li>

            <li>✔ Multiple Membership Plans</li>

          </ul>

        </div>

      </section>



      {/* FEATURED TALENTS */}

<section className="section light">

  <h2 className="section-title">
    Featured Talent
  </h2>

  <div className="talent-grid">

    <div className="talent-card">
      <img src="/images/talent1.jpg" alt="Actor" />
      <h3>Riya Sharma</h3>
      <p>Actor</p>
      <span>Mumbai</span>
    </div>

    <div className="talent-card">
      <img src="/images/talent2.jpg" alt="Model" />
      <h3>Arjun Mehta</h3>
      <p>Model</p>
      <span>Delhi</span>
    </div>

    <div className="talent-card">
      <img src="/images/talent3.jpg" alt="Singer" />
      <h3>Ananya Roy</h3>
      <p>Singer</p>
      <span>Kolkata</span>
    </div>

    <div className="talent-card">
      <img src="/images/talent4.jpg" alt="Dancer" />
      <h3>Karan Patel</h3>
      <p>Dancer</p>
      <span>Bengaluru</span>
    </div>

  </div>

</section>

{/* LATEST CASTING CALLS */}

<section className="section">

  <h2 className="section-title">
    Latest Casting Calls
  </h2>

  <div className="casting-grid">

    <div className="casting-card">

      <span className="casting-tag">Film</span>

      <h3>Lead Female Actor</h3>

      <p>
        Looking for a female actor aged 20–28 for a romantic drama.
      </p>

      <div className="casting-info">
        📍 Mumbai
      </div>

      <button className="gold-btn small-btn">
        View Details
      </button>

    </div>

    <div className="casting-card">

      <span className="casting-tag">Advertisement</span>

      <h3>Fashion Models</h3>

      <p>
        Male and female models required for a premium clothing campaign.
      </p>

      <div className="casting-info">
        📍 Delhi
      </div>

      <button className="gold-btn small-btn">
        View Details
      </button>

    </div>

    <div className="casting-card">

      <span className="casting-tag">Music Video</span>

      <h3>Professional Dancers</h3>

      <p>
        Contemporary dancers required for an upcoming music video.
      </p>

      <div className="casting-info">
        📍 Bengaluru
      </div>

      <button className="gold-btn small-btn">
        View Details
      </button>

    </div>

  </div>

</section>

      {/* CTA */}

<section className="cta">

    <h2>
        Your Next Opportunity Starts Here
    </h2>

    <p>
        Join thousands of talented artists and casting professionals using
        IndCasting to discover opportunities, build meaningful connections,
        and bring creative projects to life.
    </p>

    <div className="hero-buttons">

        <button className="gold-btn">
            Join as Talent
        </button>

        <button className="outline-btn">
            Hire Talent
        </button>

    </div>

</section>
<Footer />
    </main>
  );
}