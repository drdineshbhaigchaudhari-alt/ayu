import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCheckCircle, FaPhoneAlt, FaAmbulance, FaUserMd, FaChevronLeft, FaChevronRight, FaCalendarCheck, FaWhatsapp, FaCheck } from "react-icons/fa";
import { site, wa } from "../config/site";
import { departments, centres } from "../data/departments";
import { doctors } from "../data/doctors";
import { testimonials, blogs, whyUs, gallery, packages, journey } from "../data/content";
import { Reveal, SectionHead, Counter, AppointmentForm, Icon, img, Seo } from "../components/ui";

const slides = [
  { img: "slide-0.jpg", eyebrow: "Welcome to Ayuvivant", title: <>Complete care, <em>under one roof</em></>, text: "A modern multispeciality hospital in Sector 12, Chandigarh, with 24-hour emergency care, expert doctors and in-house diagnostics.", a: ["Book appointment", "/book-appointment"], b: ["About the hospital", "/about"] },
  { img: "slide-1.jpg", eyebrow: "Compassionate consultations", title: <>Care that feels <em>personal</em></>, text: "Experienced doctors who listen first, explain clearly and plan your treatment with you and your family.", a: ["Book appointment", "/book-appointment"], b: ["Meet our doctors", "/doctors"] },
  { img: "slide-2.jpg", eyebrow: "Surgery & day care", title: <>Advanced surgery, <em>faster recovery</em></>, text: "Modern operation theatres and keyhole techniques for smaller scars, less pain and a shorter hospital stay.", a: ["Explore surgery", "/departments/general-surgery"], b: ["Book consultation", "/book-appointment"] },
  { img: "slide-3.jpg", eyebrow: "Emergency & ambulance", title: <>Emergency care, <em>24 × 7</em></>, text: "A round-the-clock emergency desk with trained staff and ambulance support. We are always here when you need us.", a: ["call", "tel"], b: ["Our facilities", "/facilities"] },
  { img: "slide-4.jpg", eyebrow: "Women & maternity care", title: <>Every stage of <em>motherhood</em></>, text: "From the first antenatal visit to a safe delivery and newborn care, in a calm and caring environment.", a: ["Maternity care", "/departments/obstetrics-gynaecology"], b: ["Book appointment", "/book-appointment"] },
  { img: "slide-5.jpg", eyebrow: "Our specialists", title: <>Specialists you can <em>trust</em></>, text: "Consultants across 12+ specialities working together under one roof in Sector 12, Chandigarh.", a: ["Find a doctor", "/doctors"], b: ["Contact us", "/contact"] },
];

function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setI((x) => (x + 1) % slides.length), 6500);
    return () => clearTimeout(t);
  }, [i, paused, reduce]);
  const go = (n) => setI((n + slides.length) % slides.length);
  let startX = null;
  return (
    <section
      className="slider"
      aria-roledescription="carousel"
      aria-label="Featured services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => { startX = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (startX == null) return;
        const d = e.changedTouches[0].clientX - startX;
        if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1));
        startX = null;
      }}
    >
      <div className="slides">
        {slides.map((s, n) => (
          <div key={s.img} className={`slide ${n === i ? "on" : ""}`} aria-hidden={n !== i} role="group" aria-label={`Slide ${n + 1} of ${slides.length}`}>
            <div className="slide-img">
              <img src={img(s.img)} alt="" fetchPriority={n === 0 ? "high" : "low"} loading={n === 0 ? "eager" : "lazy"} />
            </div>
            <div className="wrap">
              <div className="txt">
                <span className="eyebrow">{s.eyebrow}</span>
                {n === 0 ? <h1>{s.title}</h1> : <h2 className="h1">{s.title}</h2>}
                <p>{s.text}</p>
                <div className="hero-cta">
                  {s.a[1] === "tel" ? (
                    <a className="btn btn-red" href={`tel:${site.emergencyHref}`} tabIndex={n === i ? 0 : -1}><FaPhoneAlt size={13} /> Call {site.emergency}</a>
                  ) : (
                    <Link className="btn btn-primary" to={s.a[1]} tabIndex={n === i ? 0 : -1}>{s.a[0]} <FaArrowRight /></Link>
                  )}
                  <Link className="btn btn-ghost" to={s.b[1]} tabIndex={n === i ? 0 : -1}>{s.b[0]}</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="wrap ctrl">
        <div className="dots-pro" role="tablist" aria-label="Choose slide">
          {slides.map((_, n) => (
            <button key={n} role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1}`} className={n === i ? "on" : ""} onClick={() => go(n)}>
              <span style={n === i && !paused && !reduce ? { animation: "fill 6.5s linear forwards" } : undefined} />
            </button>
          ))}
        </div>
        <div className="arrows">
          <button onClick={() => go(i - 1)} aria-label="Previous slide"><FaChevronLeft /></button>
          <button onClick={() => go(i + 1)} aria-label="Next slide"><FaChevronRight /></button>
        </div>
      </div>
    </section>
  );
}

function QuickBar() {
  const items = [
    { I: FaCalendarCheck, t: "Book Appointment", s: "Choose your doctor & slot", to: "/book-appointment", c: "teal" },
    { I: FaUserMd, t: "Find a Doctor", s: "Browse our specialists", to: "/doctors", c: "" },
    { I: FaAmbulance, t: "Emergency 24×7", s: site.emergency, href: `tel:${site.emergencyHref}`, c: "red" },
    { I: FaWhatsapp, t: "Chat on WhatsApp", s: "Quick answers, no waiting", href: wa(), c: "wa" },
  ];
  return (
    <div className="quick wrap">
      {items.map(({ I, t, s, to, href, c }) => {
        const inner = (
          <>
            <span className="qi"><I /></span>
            <span className="qt"><b>{t}</b><small>{s}</small></span>
            <FaArrowRight className="qa" />
          </>
        );
        return to ? (
          <Link key={t} to={to} className={`q ${c}`}>{inner}</Link>
        ) : (
          <a key={t} href={href} className={`q ${c}`} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a>
        );
      })}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <QuickBar />

      <section className="section">
        <div className="wrap about-grid">
          <Reveal className="about-art wide">
            <div className="frame"><img src={img("about-building.jpg")} alt="Ayuvivant Multispeciality Hospital building, Sector 12, Chandigarh" loading="lazy" /></div>
            <div className="badge"><b>15+</b><span>YEARS OF CARE</span></div>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">01 · About us</span>
            <h2>A hospital built around <em>people</em>, not paperwork.</h2>
            <p>Ayuvivant, from <em>ayu</em> (life) and <em>vivant</em> (living), stands for adding healthy years to life. Our doctors take time to listen, explain and plan treatment with you and your family.</p>
            <p>Located in Sector 12, Chandigarh, we offer consultation, diagnostics, surgery, maternity and emergency care under one roof, so you do not have to run from place to place when someone you love is unwell.</p>
            <ul className="ticks">{whyUs.slice(0, 3).map((w) => <li key={w}><FaCheckCircle /> {w}</li>)}</ul>
            <Link className="btn btn-ink" to="/about">Know more about us <FaArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <SectionHead no="02" label="Centres of care" title={<>Where we go the <em>extra mile</em></>} />
          <div className="centres">
            {centres.map((c, n) => (
              <Reveal key={c.title} delay={n % 4}>
                <Link to={c.to} className="centre">
                  <img src={img(c.img)} alt={c.title} loading="lazy" />
                  <div><span className="num">0{n + 1}</span><h3>{c.title}</h3><p>{c.text}</p></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead no="03" label="Specialities" title={<>Every speciality, <em>one roof</em></>}
            action={<Link className="link-arrow" to="/departments">View all departments <FaArrowRight /></Link>}>
            From first consultation to advanced treatment, our departments work together for you.
          </SectionHead>
          <div className="bento">
            {[0, 1, 2, 3, 4].map((n) => {
              const d = departments[[2, 0, 1, 3, 4][n]];
              const photo = n === 0;
              return (
                <Reveal key={d.slug} delay={n % 3} className={`tile ${photo ? "photo" : ""}`}>
                  {photo && <img src={img(d.img)} alt="" loading="lazy" />}
                  <span className="ic"><Icon name={d.icon} /></span>
                  <h3>{d.name}</h3>
                  <p>{d.short}</p>
                  <Link className="link-arrow" to={`/departments/${d.slug}`}>Explore <FaArrowRight size={12} /></Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark" style={{ padding: "60px 0" }}>
        <div className="wrap counters">
          <Counter to={50000} suffix="+" label="Patients served" />
          <Counter to={40} suffix="+" label="Consultants" />
          <Counter to={100} suffix="+" label="Beds" />
          <Counter to={15} suffix="+" label="Years of care" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead no="04" label="Our doctors" title={<>Meet the people <em>who care</em></>} center
            action={null}>Experienced, approachable and committed to clear communication.</SectionHead>
          <div className="docs">
            {doctors.map((d, n) => (
              <Reveal className="doc" key={d.slug} delay={n}>
                <div className="arch"><img src={img(d.img)} alt={d.name} loading="lazy" /></div>
                <h3>{d.name}</h3>
                <div className="role">{d.role}</div>
                <div className="qual">{d.qual} · {d.exp}</div>
                <Link className="btn btn-gold" to={`/doctors/${d.slug}`} style={{ padding: "10px 22px" }}>View profile</Link>
              </Reveal>
            ))}
          </div>
          <p className="note">Doctor profiles shown are sample placeholders and will be replaced with our consultants.</p>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap why-grid">
          <Reveal className="why-art">
            <div><img className="tall" src={img("surgery.jpg")} alt="Surgeons in an operating theatre" loading="lazy" /></div>
            <div><img className="tall" src={img("medicine.jpg")} alt="Doctors examining a patient" loading="lazy" /></div>
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">05 · Why Ayuvivant</span>
            <h2>Six reasons families <em>choose us</em></h2>
            <ul className="ticks">{whyUs.map((w) => <li key={w}><FaCheckCircle /> {w}</li>)}</ul>
            <Link className="btn btn-primary" to="/facilities">Our facilities <FaArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section mist">
        <div className="wrap">
          <SectionHead no="05" label="Health packages" title={<>Prevention is the <em>best medicine</em></>} center>
            Preventive health checks designed for every stage of life. Ask our desk about current offers and home sample collection.
          </SectionHead>
          <div className="pkgs">
            {packages.map((p, n) => (
              <Reveal className="pkg" key={p.title} delay={n % 4}>
                <span className="tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <ul>{p.tests.map((t) => <li key={t}><FaCheck /> {t}</li>)}</ul>
                <a className="btn btn-primary" href={wa(`Hello, I would like to know more about the ${p.title} package.`)} target="_blank" rel="noreferrer"><FaWhatsapp /> Enquire now</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <SectionHead no="06" label="How it works" title={<>Your care, in <em>four simple steps</em></>} center />
          <div className="steps">
            {journey.map((j, n) => (
              <Reveal className="step" key={j.n} delay={n}><span className="sn">{j.n}</span><h3>{j.t}</h3><p>{j.x}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="appoint">
            <div>
              <span className="eyebrow">07 · Appointment</span>
              <h2>Book your visit in <em style={{ color: "#6fd6c8" }}>two minutes</em></h2>
              <p>Share a few details and our team will call you back to confirm a convenient slot with the right specialist.</p>
              <div className="contact-line"><FaPhoneAlt /> {site.phone}</div>
            </div>
            <AppointmentForm />
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap center">
          <Reveal>
            <span className="eyebrow">Insurance & cashless</span>
            <h3 style={{ fontSize: "1.8rem" }}>Hassle-free insurance and TPA support</h3>
            <p style={{ maxWidth: 620, margin: "0 auto 22px" }}>Our insurance desk helps with pre-authorisation, paperwork and claims for cashless treatment. Please confirm your insurer with the desk before admission.</p>
            <div className="chips">{["Cashless desk", "TPA coordination", "Pre-authorisation help", "Government health schemes*", "Corporate tie-ups"].map((c) => <span className="chip" key={c}>{c}</span>)}</div>
          </Reveal>
        </div>
      </section>

      <Testimonials />

      <section className="section mist">
        <div className="wrap">
          <SectionHead no="09" label="Gallery" title={<>Inside <em>Ayuvivant</em></>}
            action={<Link className="link-arrow" to="/gallery">Full gallery <FaArrowRight /></Link>} />
          <div className="gal">
            {gallery.slice(0, 5).map((g) => <Reveal key={g} className="g" style={{ padding: 0 }}><img src={img(g)} alt="Ayuvivant Hospital" loading="lazy" /></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead no="10" label="Health blog" title={<>Advice you can <em>use</em></>}
            action={<Link className="link-arrow" to="/blog">All articles <FaArrowRight /></Link>} />
          <div className="blogs">
            {blogs.map((b, n) => (
              <Reveal key={b.slug} delay={n}>
                <Link to={`/blog/${b.slug}`} className="post">
                  <div className="ph"><img src={img(b.img)} alt="" loading="lazy" /></div>
                  <div className="bd"><span className="tag">{b.tag}</span><h3>{b.title}</h3><p>{b.excerpt}</p><span className="date">{b.date}</span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="section dark">
      <div className="wrap">
        <div className="testi">
          <span className="eyebrow" style={{ justifyContent: "center" }}>08 · Patient stories</span>
          <span className="q" aria-hidden="true">“</span>
          <blockquote style={{ color: "#fff" }} aria-live="polite">{t.text}</blockquote>
          <div className="who"><b style={{ color: "#fff" }}>{t.name}</b><span>{t.place} · {t.dept}</span></div>
          <div className="dots">{testimonials.map((_, n) => <button key={n} className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={`Show story ${n + 1}`} />)}</div>
        </div>
      </div>
    </section>
  );
}
