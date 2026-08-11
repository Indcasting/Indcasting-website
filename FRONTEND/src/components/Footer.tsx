import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-column">

          <h2 className="footer-logo">
            Ind<span>Casting</span>
          </h2>

          <p>
            Connecting exceptional talent with visionary filmmakers,
            production houses and casting professionals across India.
          </p>

        </div>

        <div className="footer-column">

          <h3>Quick Links</h3>

          <Link href="/">Home</Link>

          <Link href="/signup">Portfolios</Link>

          <Link href="/membership">Membership</Link>

          <Link href="/post">Post</Link>

        </div>

        <div className="footer-column">

          <h3>Support</h3>

          <Link href="/help">Help Centre</Link>

          <Link href="/privacy">Privacy Policy</Link>

          <Link href="/terms">Terms & Conditions </Link>

          <Link href="/faq">FAQs</Link>

        </div>

        <div className="footer-column">

          <h3>Contact</h3>

          <p>support@indcasting.com</p>

          <p>Mumbai, India</p>

          <div className="socials">

            <a href="#">Instagram</a>

            <a href="#">LinkedIn</a>

            <a href="#">YouTube</a>

          </div>

        </div>

      </div>

      <hr />

      <div className="copyright">

        © 2026 IndCasting. All Rights Reserved.

      </div>

    </footer>
  );
}