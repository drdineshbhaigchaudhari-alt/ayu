import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock, FaEye, FaHeart, FaHandsHelping } from "react-icons/fa";
import { site } from "../config/site";
import { departments } from "../data/departments";
import { doctors } from "../data/doctors";
import { blogs, facilities, gallery, whyUs } from "../data/content";
import { Reveal, SectionHead, PageBanner, AppointmentForm, Icon, img, Seo } from "../components/ui";

export function About() {
  return (
    <>
      <Seo title="About Us" path="/about" description="Learn about Ayuvivant Multispeciality Hospital in Sector 12, Chandigarh: our mission, values and approach to patient care." />
      <PageBanner title="About Ayuvivant" crumbs={[{ label: "About" }]} />
      <section className="section">
        <div className="wrap about-grid">
          <Reveal className="about-art wide">
            <div className="frame"><img src={img("about-building.jpg")} alt="Ayuvivant Multispeciality Hospital building" /></div>
            <div className="badge"><b>15+</b><span>YEARS OF CARE</span></div>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">Our story</span>
            <h2>Adding healthy years to <em>life</em></h2>
            <p>Ayuvivant Multispeciality Hospital was started with a simple belief: good healthcare should be skilled, honest and within reach. Today we serve families across Chandigarh, Mohali and Panchkula with a wide range of specialities in one hospital.</p>
            <p>Our team brings together physicians, surgeons, paediatricians, gynaecologists, nurses and technicians who work as one, so your treatment is planned together, not in pieces.</p>
            <ul className="ticks">{whyUs.map((w) => <li key={w}><FaCheckCircle /> {w}</li>)}</ul>
          </Reveal>
        </div>
      </section>
      <section className="section mist">
        <div className="wrap">
          <SectionHead label="What guides us" title={<>Mission, vision & <em>values</em></>} center />
          <div className="info-cards">
            {[[FaHeart, "Our mission", "To deliver compassionate, ethical and affordable healthcare that treats every patient with dignity."], [FaEye, "Our vision", "To be the tricity's most trusted neighbourhood hospital, known for clinical quality and kindness."], [FaHandsHelping, "Our values", "Listen first. Explain clearly. Charge fairly. Improve constantly."]].map(([I, t, x], n) => (
              <Reveal className="info-card" key={t} delay={n}><div className="ic"><I /></div><h3>{t}</h3><p>{x}</p></Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Departments() {
  return (
    <>
      <Seo title="Departments & Specialities" path="/departments" />
      <PageBanner title="Departments & Specialities" crumbs={[{ label: "Departments" }]} />
      <section className="section">
        <div className="wrap bento">
          {departments.map((d, n) => (
            <Reveal key={d.slug} className="tile" delay={n % 4}>
              <span className="ic"><Icon name={d.icon} /></span>
              <h3>{d.name}</h3><p>{d.short}</p>
              <Link className="link-arrow" to={`/departments/${d.slug}`}>Explore <FaArrowRight size={12} /></Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function DepartmentDetail() {
  const { slug } = useParams();
  const d = departments.find((x) => x.slug === slug);
  if (!d) return <Navigate to="/departments" replace />;
  const team = doctors.filter((x) => x.dept === d.slug);
  return (
    <>
      <Seo title={d.name} path={`/departments/${d.slug}`} description={d.short} />
      <PageBanner title={d.name} crumbs={[{ label: "Departments", to: "/departments" }, { label: d.name }]} />
      <section className="section">
        <div className="wrap detail">
          <div>
            <img className="cover" src={img(d.img)} alt={d.name} />
            <h2>About the department</h2>
            <p>{d.about}</p>
            <h3>Conditions we treat</h3>
            <ul className="ticks two-col">{d.treats.map((t) => <li key={t}><FaCheckCircle /> {t}</li>)}</ul>
            <h3>Investigations available</h3>
            <ul className="ticks two-col">{d.tests.map((t) => <li key={t}><FaCheckCircle /> {t}</li>)}</ul>
            {team.length > 0 && (<><h3>Our specialists</h3>{team.map((t) => <p key={t.slug}><Link className="link-arrow" to={`/doctors/${t.slug}`}>{t.name} <FaArrowRight size={12} /></Link> · {t.role}</p>)}</>)}
          </div>
          <aside className="side">
            <h3>All departments</h3>
            <ul>{departments.map((x) => <li key={x.slug}><Link to={`/departments/${x.slug}`}>{x.name}</Link></li>)}</ul>
            <Link className="btn btn-primary" to="/book-appointment">Book appointment</Link>
          </aside>
        </div>
      </section>
    </>
  );
}

export function Doctors() {
  return (
    <>
      <Seo title="Our Doctors" path="/doctors" />
      <PageBanner title="Our Doctors" crumbs={[{ label: "Doctors" }]} />
      <section className="section">
        <div className="wrap">
          <div className="docs">
            {doctors.map((d, n) => (
              <Reveal className="doc" key={d.slug} delay={n}>
                <div className="arch"><img src={img(d.img)} alt={d.name} /></div>
                <h3>{d.name}</h3><div className="role">{d.role}</div><div className="qual">{d.qual} · {d.exp}</div>
                <Link className="btn btn-gold" to={`/doctors/${d.slug}`} style={{ padding: "10px 22px" }}>View profile</Link>
              </Reveal>
            ))}
          </div>
          <p className="note">Sample placeholder profiles. Replace in <code>client/src/data/doctors.js</code>.</p>
        </div>
      </section>
    </>
  );
}

export function DoctorDetail() {
  const { slug } = useParams();
  const d = doctors.find((x) => x.slug === slug);
  if (!d) return <Navigate to="/doctors" replace />;
  const dept = departments.find((x) => x.slug === d.dept);
  return (
    <>
      <Seo title={d.name} path={`/doctors/${d.slug}`} description={`${d.name}, ${d.role} at ${site.name}`} />
      <PageBanner title={d.name} crumbs={[{ label: "Doctors", to: "/doctors" }, { label: d.name }]} />
      <section className="section">
        <div className="wrap about-grid">
          <div className="about-art docphoto"><div className="arch"><img src={img(d.img)} alt={d.name} style={{ objectPosition: "top" }} /></div></div>
          <div>
            <span className="eyebrow">{dept?.name}</span>
            <h2>{d.name}</h2>
            <p><strong>{d.role}</strong><br />{d.qual} · {d.exp} experience</p>
            <p>{d.bio}</p>
            <p style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn-primary" to="/book-appointment">Book appointment <FaArrowRight /></Link>
              {dept && <Link className="btn btn-gold" to={`/departments/${dept.slug}`}>View department</Link>}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export function Facilities() {
  return (
    <>
      <Seo title="Facilities" path="/facilities" />
      <PageBanner title="Facilities & Services" crumbs={[{ label: "Facilities" }]} />
      <section className="section">
        <div className="wrap fac">
          {facilities.map((f, n) => (
            <Reveal className="tile" key={f.title} delay={n % 4}>
              <span className="ic"><Icon name={f.icon} /></span><h3>{f.title}</h3><p>{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function Gallery() {
  const [open, setOpen] = useState(null);
  return (
    <>
      <Seo title="Gallery" path="/gallery" />
      <PageBanner title="Photo Gallery" crumbs={[{ label: "Gallery" }]} />
      <section className="section">
        <div className="wrap gal">
          {gallery.map((g) => <button className="g" key={g} onClick={() => setOpen(g)} aria-label="Open image"><img src={img(g)} alt="Ayuvivant Hospital" loading="lazy" /></button>)}
        </div>
      </section>
      {open && <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-label="Image preview"><img src={img(open)} alt="Ayuvivant Hospital" /></div>}
    </>
  );
}

export function Blog() {
  return (
    <>
      <Seo title="Health Blog" path="/blog" />
      <PageBanner title="Health Blog" crumbs={[{ label: "Blog" }]} />
      <section className="section">
        <div className="wrap blogs">
          {blogs.map((b, n) => (
            <Reveal key={b.slug} delay={n % 3}>
              <Link to={`/blog/${b.slug}`} className="post">
                <div className="ph"><img src={img(b.img)} alt="" loading="lazy" /></div>
                <div className="bd"><span className="tag">{b.tag}</span><h3>{b.title}</h3><p>{b.excerpt}</p><span className="date">{b.date}</span></div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogDetail() {
  const { slug } = useParams();
  const b = blogs.find((x) => x.slug === slug);
  if (!b) return <Navigate to="/blog" replace />;
  return (
    <>
      <Seo title={b.title} path={`/blog/${b.slug}`} description={b.excerpt} />
      <PageBanner title={b.title} crumbs={[{ label: "Blog", to: "/blog" }, { label: b.tag }]} />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 800 }}>
          <img src={img(b.img)} alt="" style={{ borderRadius: 22, width: "100%", aspectRatio: "16/9", objectFit: "cover", marginBottom: 30 }} />
          <span className="tag">{b.tag} · {b.date}</span>
          {b.body.map((p, i) => <p key={i} style={{ fontSize: "1.08rem" }}>{p}</p>)}
          <p className="note" style={{ textAlign: "left" }}>This article is for general information and is not a substitute for medical advice.</p>
          <Link className="btn btn-primary" to="/book-appointment">Talk to a doctor <FaArrowRight /></Link>
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const [st, setSt] = useState({ s: "idle", m: "" });
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    setSt({ s: "busy", m: "" });
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong.");
      form.reset();
      setSt({ s: "ok", m: "Thank you. We have received your message and will get back to you soon." });
    } catch (err) { setSt({ s: "err", m: err.message }); }
  }
  return (
    <>
      <Seo title="Contact Us" path="/contact" />
      <PageBanner title="Contact Us" crumbs={[{ label: "Contact" }]} />
      <section className="section">
        <div className="wrap">
          <div className="info-cards">
            <div className="info-card"><div className="ic"><FaMapMarkerAlt /></div><h3>Address</h3><p>{site.address}</p></div>
            <div className="info-card"><div className="ic"><FaPhoneAlt /></div><h3>Call us</h3><p><a href={`tel:${site.phoneHref}`}>{site.phone}</a><br /><a href={`tel:${site.emergencyHref}`}>{site.emergency}</a> · Emergency 24×7</p></div>
            <div className="info-card"><div className="ic"><FaEnvelope /></div><h3>Email & timings</h3><p><a href={`mailto:${site.email}`}>{site.email}</a><br /><a href={`mailto:${site.careEmail}`}>{site.careEmail}</a><br /><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a><br /><FaClock size={12} /> {site.timings}</p></div>
          </div>
          <div className="contact-grid">
            <form className="form" onSubmit={submit} noValidate>
              <label className="field"><span className="skip">Name</span><input name="name" placeholder="Your name" required /></label>
              <label className="field"><span className="skip">Phone</span><input name="phone" type="tel" placeholder="Phone number" required /></label>
              <label className="field full"><span className="skip">Email</span><input name="email" type="email" placeholder="Email (optional)" /></label>
              <label className="field full"><span className="skip">Message</span><textarea name="message" placeholder="How can we help?" required /></label>
              <div className="full"><button className="btn btn-primary" disabled={st.s === "busy"}>{st.s === "busy" ? "Sending…" : "Send message"} <FaArrowRight /></button></div>
              {st.m && <div className={`msg ${st.s}`} role="status">{st.m}</div>}
            </form>
            <iframe className="map" title="Ayuvivant Hospital location map" src={site.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}

export function BookAppointment() {
  return (
    <>
      <Seo title="Book an Appointment" path="/book-appointment" />
      <PageBanner title="Book an Appointment" crumbs={[{ label: "Book appointment" }]} />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p>Fill in the form and our team will call you to confirm your slot. For emergencies, please call <a href={`tel:${site.emergencyHref}`}><strong>{site.emergency}</strong></a> right away.</p>
          <AppointmentForm light />
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <PageBanner title="Page not found" />
      <section className="section center"><div className="wrap"><p>The page you are looking for does not exist.</p><Link className="btn btn-primary" to="/">Back to home</Link></div></section>
    </>
  );
}
