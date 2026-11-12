import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaClock, FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube, FaChevronDown, FaBars, FaTimes, FaMapMarkerAlt, FaCalendarCheck, FaAmbulance } from "react-icons/fa";
import { site, wa } from "../config/site";
import { departments } from "../data/departments";
import { img } from "./ui";

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  const cls = ({ isActive }) => (isActive ? "active" : "");
  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap">
        <Link to="/" className="logo" aria-label={`${site.name} home`}>
          <img src={img("logo.jpeg")} alt={site.name} width="170" height="56" />
        </Link>
        <nav className={`nav ${open ? "open" : ""}`} aria-label="Main">
          <NavLink to="/" end className={cls}>Home</NavLink>
          <NavLink to="/about" className={cls}>About</NavLink>
          <div className="dd">
            <NavLink to="/departments" className={cls}>Departments <FaChevronDown size={10} /></NavLink>
            <div className="dd-menu">
              {departments.map((d) => <Link key={d.slug} to={`/departments/${d.slug}`}>{d.name}</Link>)}
            </div>
          </div>
          <NavLink to="/doctors" className={cls}>Doctors</NavLink>
          <NavLink to="/facilities" className={cls}>Facilities</NavLink>
          <NavLink to="/gallery" className={cls}>Gallery</NavLink>
          <NavLink to="/blog" className={cls}>Blog</NavLink>
          <NavLink to="/contact" className={cls}>Contact</NavLink>
        </nav>
        <div className="head-cta">
          <a className="btn btn-red" href={`tel:${site.emergencyHref}`}><span className="pulse" /> Emergency</a>
          <Link className="btn btn-primary" to="/book-appointment">Book Appointment</Link>
          <button className="burger" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="mark" aria-hidden="true">Ayuvivant</div>
      <div className="wrap foot-grid">
        <div>
          <span className="flogo"><img src={img("logo.jpeg")} alt={site.name} /></span>
          <p>Thoughtful, affordable multispeciality care for Chandigarh and the tricity, open for emergencies 24 hours a day.</p>
          <div className="socials">
            <a href={site.social.facebook} aria-label="Facebook"><FaFacebookF /></a>
            <a href={site.social.instagram} aria-label="Instagram"><FaInstagram /></a>
            <a href={site.social.youtube} aria-label="YouTube"><FaYoutube /></a>
            <a href={wa()} aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {[["About us", "/about"], ["Our doctors", "/doctors"], ["Facilities", "/facilities"], ["Gallery", "/gallery"], ["Health blog", "/blog"], ["Contact", "/contact"], ["Book appointment", "/book-appointment"]].map(([l, t]) => <li key={t}><Link to={t}>{l}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4>Departments</h4>
          <ul>{departments.slice(0, 7).map((d) => <li key={d.slug}><Link to={`/departments/${d.slug}`}>{d.name}</Link></li>)}</ul>
        </div>
        <div>
          <h4>Visit us</h4>
          <div className="f-line"><FaMapMarkerAlt /><span>{site.address}</span></div>
          <div className="f-line"><FaPhoneAlt /><a href={`tel:${site.phoneHref}`}>{site.phone}</a></div>
          <div className="f-line"><FaAmbulance /><a href={`tel:${site.emergencyHref}`}>{site.emergency} (Emergency)</a></div>
          <div className="f-line"><FaEnvelope /><span><a href={`mailto:${site.email}`}>{site.email}</a><br /><a href={`mailto:${site.careEmail}`}>{site.careEmail}</a><br /><a href={`mailto:${site.hrEmail}`}>{site.hrEmail}</a> (Careers)</span></div>
          <div className="f-line"><FaClock /><span>{site.timings}</span></div>
        </div>
      </div>
      <div className="wrap copy">
        <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        <span>ayuvivantmultihospital.com · For emergencies, call {site.emergency}</span>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <div className="topbar">
        <div className="wrap">
          <div className="group">
            <a href={`tel:${site.phoneHref}`}><FaPhoneAlt size={12} /> {site.phone}</a>
            <a className="hide-m" href={`mailto:${site.email}`}><FaEnvelope size={12} /> {site.email}</a>
          </div>
          <div className="group">
            <span className="hide-m"><FaClock size={12} /> {site.timings}</span>
            <a href={wa()} aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href={site.social.facebook} aria-label="Facebook"><FaFacebookF /></a>
            <a href={site.social.instagram} aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>
      </div>
      <Header />
      <main id="main"><Outlet /></main>
      <section className="ctaband" aria-label="Contact us">
        <img src={img("cta-bg.jpg")} alt="" loading="lazy" />
        <div className="wrap">
          <div>
            <h2>Need a doctor <em>right now?</em></h2>
            <p>Our team is available around the clock. Call, message or book online.</p>
          </div>
          <div className="btns">
            <a className="btn btn-red" href={`tel:${site.emergencyHref}`}><FaPhoneAlt size={13} /> Call {site.emergency}</a>
            <a className="btn btn-wa" href={wa()} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp us</a>
            <Link className="btn btn-ghost" to="/book-appointment">Book appointment</Link>
          </div>
        </div>
      </section>
      <Footer />
      <Link className="sidetab" to="/book-appointment">Book Appointment</Link>
      <a className="fab" href={wa()} aria-label="Chat on WhatsApp" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
      <div className="mobbar">
        <a href={`tel:${site.phoneHref}`}><FaPhoneAlt /> Call</a>
        <a href={wa()} target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
        <Link to="/book-appointment"><FaCalendarCheck /> Book</Link>
      </div>
    </>
  );
}
