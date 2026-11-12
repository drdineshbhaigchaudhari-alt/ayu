import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "data");
// Prefer a copy of the built site inside server/ (self-contained deploys), else client/dist.
const localDist = path.join(__dirname, "public");
const distDir = fs.existsSync(localDist) ? localDist : path.join(__dirname, "..", "client", "dist");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({ limit: "20kb" }));

const clean = (v, max = 500) => String(v ?? "").trim().slice(0, max);

function save(file, record) {
  fs.mkdirSync(dataDir, { recursive: true });
  const p = path.join(dataDir, file);
  let list = [];
  try { list = JSON.parse(fs.readFileSync(p, "utf8")); } catch { /* new file */ }
  list.push(record);
  fs.writeFileSync(p, JSON.stringify(list, null, 2));
}

const phoneOk = (p) => /^[+]?[0-9\s-]{10,15}$/.test(p);

app.post("/api/appointments", (req, res) => {
  const b = req.body || {};
  const rec = {
    name: clean(b.name, 80), phone: clean(b.phone, 20), department: clean(b.department, 80),
    date: clean(b.date, 20), message: clean(b.message, 600), createdAt: new Date().toISOString(),
  };
  if (rec.name.length < 2) return res.status(400).json({ error: "Please enter your name." });
  if (!phoneOk(rec.phone)) return res.status(400).json({ error: "Please enter a valid phone number." });
  save("appointments.json", rec);
  res.json({ ok: true });
});

app.post("/api/contact", (req, res) => {
  const b = req.body || {};
  const rec = {
    name: clean(b.name, 80), phone: clean(b.phone, 20), email: clean(b.email, 120),
    message: clean(b.message, 1000), createdAt: new Date().toISOString(),
  };
  if (rec.name.length < 2) return res.status(400).json({ error: "Please enter your name." });
  if (!phoneOk(rec.phone)) return res.status(400).json({ error: "Please enter a valid phone number." });
  if (rec.message.length < 3) return res.status(400).json({ error: "Please write a short message." });
  save("enquiries.json", rec);
  res.json({ ok: true });
});

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get("*", (_req, res) => res.sendFile(path.join(distDir, "index.html")));
}

app.listen(PORT, () => console.log(`Ayuvivant server running on http://localhost:${PORT}`));
