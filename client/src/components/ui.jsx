import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FaHeartbeat, FaBone, FaBaby, FaChild, FaBrain, FaUserMd, FaStethoscope, FaTint, FaNotesMedical,
  FaAssistiveListeningSystems, FaSmile, FaWalking, FaAmbulance, FaProcedures, FaCut, FaVials, FaXRay,
  FaPills, FaBed, FaHandHoldingMedical, FaPlus, FaArrowRight,
} from "react-icons/fa";
import { site } from "../config/site";
import { departments } from "../data/departments";

const Fa = {
  FaHeartbeat, FaBone, FaBaby, FaChild, FaBrain, FaUserMd, FaStethoscope, FaTint, FaNotesMedical,
  FaAssistiveListeningSystems, FaSmile, FaWalking, FaAmbulance, FaProcedures, FaCut, FaVials, FaXRay,
  FaPills, FaBed, FaHandHoldingMedical, FaPlus, FaArrowRight,
};

export const Icon = ({ name }) => {
  const C = Fa[name] || Fa.FaPlus;
  return <C aria-hidden="true" />;
};

export const img = (f) => `/images/${f}`;

/** Fade-up on scroll. */
export function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setOn(true);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`rv ${on ? "in" : ""} ${delay ? "d" + delay : ""} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Counter({ to, suffix = "", label }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const run = () => {
      if (reduce) return setN(to);
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <div className="counter" ref={ref}>
      <b>{n.toLocaleString("en-IN")}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

export function SectionHead({ no, label, title, children, center, action }) {
  return (
    <Reveal className={`sec-head ${center ? "center" : ""}`} style={center ? { justifyContent: "center" } : undefined}>
      <div>
        <span className="eyebrow">{no ? `${no} · ` : ""}{label}</span>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {action}
    </Reveal>
  );
}

export function PageBanner({ title, crumbs = [] }) {
  return (
    <section className="banner">
      <div className="wrap">
        <div className="crumbs">
          <Link to="/">Home</Link>
          {crumbs.map((c) => (<span key={c.label}> / {c.to ? <Link to={c.to}>{c.label}</Link> : c.label}</span>))}
        </div>
        <h1>{title}</h1>
      </div>
    </section>
  );
}

export function Seo({ title, description, path = "/" }) {
  const full = title ? `${title} | ${site.name}` : `${site.name}, Chandigarh`;
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description || "Ayuvivant Multispeciality Hospital in Sector 12, Chandigarh: 24×7 emergency, maternity, surgery, cardiology, paediatrics and more."} />
      <link rel="canonical" href={`${site.domain}${path}`} />
      <meta property="og:title" content={full} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${site.domain}${path}`} />
      <meta property="og:image" content={`${site.domain}/images/hospital.jpg`} />
    </Helmet>
  );
}

export function AppointmentForm({ light = false }) {
  const [state, setState] = useState({ status: "idle", msg: "" });
  const [dept, setDept] = useState("");
  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: "busy", msg: "" });
    try {
      const r = await fetch("/api/appointments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Something went wrong. Please call us.");
      e.currentTarget.reset(); setDept("");
      setState({ status: "ok", msg: "Thank you! Our team will call you shortly to confirm your appointment." });
    } catch (err) {
      setState({ status: "err", msg: err.message || "Could not send. Please call us directly." });
    }
  }
  return (
    <form className={`form ${light ? "form-light" : ""}`} onSubmit={submit} noValidate>
      <label className="field"><span className="skip">Your name</span><input name="name" placeholder="Your name" required autoComplete="name" /></label>
      <label className="field"><span className="skip">Phone</span><input name="phone" placeholder="Phone number" type="tel" required autoComplete="tel" /></label>
      <label className="field"><span className="skip">Department</span>
        <select name="department" value={dept} onChange={(e) => setDept(e.target.value)}>
          <option value="">Select department</option>
          {departments.map((d) => <option key={d.slug}>{d.name}</option>)}
        </select></label>
      <label className="field"><span className="skip">Preferred date</span><input name="date" type="date" min={new Date().toISOString().slice(0, 10)} /></label>
      <label className="field full"><span className="skip">Message</span><textarea name="message" placeholder="Briefly tell us about your concern (optional)" /></label>
      <div className="full"><button className="btn btn-primary" disabled={state.status === "busy"}>{state.status === "busy" ? "Sending…" : "Request appointment"} <Fa.FaArrowRight /></button></div>
      {state.msg && <div className={`msg ${state.status}`} role="status">{state.msg}</div>}
    </form>
  );
}
