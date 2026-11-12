// Single source of truth. Replace the placeholder phone numbers with real ones.
export const site = {
  name: "Ayuvivant Multispeciality Hospital",
  short: "Ayuvivant",
  domain: "https://ayuvivantmultihospital.com",
  tagline: "Where healing meets heritage",
  // DUMMY numbers that look real. Replace with the hospital's actual numbers before launch.
  phone: "0172 469 1200", // main line / appointments (Chandigarh landline style)
  phoneHref: "+911724691200",
  emergency: "+91 98723 61450", // emergency + WhatsApp (mobile)
  emergencyHref: "+919872361450",
  whatsapp: "919872361450", // country code + number, no +
  email: "info@ayuvivantmultihospital.com", // general enquiries (top bar, footer)
  careEmail: "care@ayuvivantmultihospital.com", // patient care / feedback
  contactEmail: "contact@ayuvivantmultihospital.com", // contact page / business
  hrEmail: "hr@ayuvivantmultihospital.com", // careers / recruitment
  address:
    "Plot No 26, Multispeciality Hospital, Chouhan Raja Colony Road, Makhmalabad, Sector 12, Chandigarh 160012",
  timings: "OPD: Mon – Sat, 9:00 AM – 7:00 PM · Emergency: 24 × 7",
  mapEmbed:
    "https://www.google.com/maps?q=Makhmalabad+Sector+12+Chandigarh+160012&output=embed",
  social: { facebook: "#", instagram: "#", youtube: "#" },
};

export const wa = (text = "Hello Ayuvivant Hospital, I would like to book an appointment.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
