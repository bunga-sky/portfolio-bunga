import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { FaBrain, FaDatabase, FaPython } from "react-icons/fa6";
import {
  about,
  certificates,
  journey,
  profile,
  projects,
  techStack,
} from "../data";
import {
  CountUp,
  DataNetwork,
  Reveal,
  SectionTitle,
  TiltCard,
  Typewriter,
} from "./Effects";

/* ================= WELCOME SCREEN ================= */
export function WelcomeScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  const icons = [Database, BarChart3, Code2];
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-night flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.7 }}
    >
      <div className="flex gap-4 mb-8">
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.15, type: "spring" }}
            className="p-3 rounded-full glass"
          >
            <Icon className="w-6 h-6 text-fuchsia-300" />
          </motion.div>
        ))}
      </div>
      <motion.h1
        className="text-3xl md:text-5xl font-extrabold text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Welcome to my <span className="text-gradient">Portfolio</span>
      </motion.h1>
      <motion.p
        className="mt-4 font-script text-3xl text-pink-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        {profile.name}
      </motion.p>
      <motion.div className="mt-8 h-1 w-48 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 to-violet-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ================= NAVBAR ================= */
const links = ["Home", "About", "Portfolio", "Journey", "Contact"];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const onScroll = () => {
      setScrolled(scrollY > 20);
      for (const l of [...links].reverse()) {
        const el = document.getElementById(l.toLowerCase());
        if (el && el.getBoundingClientRect().top < 160) {
          setActive(l);
          break;
        }
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-night/70 backdrop-blur-xl border-b border-white/10" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="font-script text-2xl md:text-3xl text-gradient whitespace-nowrap"
        >
          Bunga Rahmadani
        </a>
        <ul className="hidden md:flex gap-8">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`relative text-sm font-medium transition-colors ${active === l ? "text-white" : "text-slate-400 hover:text-white"}`}
              >
                {l}
                {active === l && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden p-2 text-slate-200"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-night/95 backdrop-blur-xl border-b border-white/10"
          >
            {links.map((l, i) => (
              <motion.li
                key={l}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3.5 text-slate-200"
                >
                  {l}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ================= HOME ================= */
export function Home() {
  const chips = ["Python", "SQL", "Machine Learning", "Looker Studio"];
  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden"
    >
      {/* Latar khusus Home: menutupi bintang, diganti gradasi sendiri */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-night">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(217,70,239,.28),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(124,58,237,.30),transparent_55%)]" />
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-night" />
      </div>
      <DataNetwork />
      <div className="max-w-6xl mx-auto px-5 w-full grid lg:grid-cols-[1.25fr_1fr] gap-14 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-fuchsia-200">
              <Sparkles className="w-4 h-4" /> Ready to turn data into insights
            </span>
          </Reveal>
          <Reveal i={1}>
            <h1 className="mt-6 text-5xl md:text-7xl font-extrabold leading-[1.05]">
              Aspiring
              <br />
              <Typewriter words={profile.roles} />
            </h1>
          </Reveal>
          <Reveal i={2}>
            <p className="mt-6 text-lg text-slate-400 max-w-xl">
              {profile.tagline}
            </p>
          </Reveal>
          <Reveal i={3}>
            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="px-3 py-1 rounded-full text-xs font-semibold glass text-slate-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal i={4}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-600 overflow-hidden shadow-lg shadow-fuchsia-900/40 hover:scale-105 transition-transform"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                Projects{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass hover:bg-white/10 transition-colors"
              >
                Contact <Mail className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
          <Reveal i={5}>
            <div className="mt-8 flex gap-3">
              {[
                { Icon: Github, href: profile.github, label: "GitHub" },
                { Icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
                {
                  Icon: Mail,
                  href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`,
                  label: "Email",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl glass hover:bg-white/10 hover:-translate-y-1 transition-all"
                >
                  <Icon className="w-5 h-5 text-slate-300" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Foto / avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
          className="relative justify-self-center w-64 md:w-80 aspect-square"
        >
          <motion.div
            className="absolute -inset-5 rounded-full border-2 border-dashed border-fuchsia-400/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-violet-600 blur-xl opacity-50 animate-pulse" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-pink-500 to-violet-600"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-night grid place-items-center">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="font-script text-7xl text-gradient">BR</span>
              )}
            </div>
          </motion.div>
          {[
            {
              t: "Python",
              Icon: FaPython,
              color: "#FFD43B",
              c: "top-2 -right-6",
              d: 0,
            },
            {
              t: "SQL",
              Icon: FaDatabase,
              color: "#F29111",
              c: "bottom-10 -left-10",
              d: 1,
            },
            {
              t: "ML",
              Icon: FaBrain,
              color: "#E879F9",
              c: "top-1/2 -right-12",
              d: 2,
            },
          ].map(({ t, Icon, color, c, d }) => (
            <motion.span
              key={t}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: d }}
              className={`hidden sm:flex absolute ${c} items-center gap-2 px-3 py-1.5 rounded-xl glass text-sm font-bold`}
            >
              <Icon style={{ color }} className="text-base" />
              {t}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-slate-500 flex justify-center pt-2"
      >
        <motion.span
          className="w-1 h-2 rounded-full bg-fuchsia-400"
          animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </a>
    </section>
  );
}

/* ================= MARQUEE ================= */
export function Marquee() {
  const items = [...techStack, ...techStack];
  return (
    <div
      className="relative py-6 border-y border-white/10 bg-white/[0.02] overflow-hidden"
      aria-hidden="true"
    >
      <div className="marquee flex gap-12 w-max">
        {items.map((t, i) => (
          <span
            key={i}
            className="group flex items-center gap-3 text-slate-400 font-semibold whitespace-nowrap hover:text-white transition-colors"
          >
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/15 to-violet-500/15 border border-white/10">
              <t.icon
                className="text-lg text-fuchsia-300 transition-colors duration-300 group-hover:[color:var(--c)]"
                style={{ "--c": t.color }}
              />
            </span>
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================= ABOUT ================= */
export function About() {
  const stats = [
    {
      Icon: Code2,
      value: projects.length,
      label: "Projects",
      note: "Data & dev projects",
    },
    {
      Icon: Award,
      value: certificates.length,
      label: "Certificates",
      note: "Dicoding certified",
    },
    {
      Icon: Layers,
      value: techStack.length,
      label: "Tools",
      note: "In my toolkit",
    },
  ];
  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle
          eyebrow="About me"
          title="Hello, I'm Bunga"
          subtitle="Transforming data into stories that drive decisions."
        />
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          <div className="space-y-5 text-slate-300 text-lg leading-relaxed">
            {about.map((p, i) => (
              <Reveal key={i} i={i}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal i={3}>
              <div className="flex flex-wrap gap-4 pt-3">
                <a
                  href={profile.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-600 hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4" /> Download CV
                </a>
                <a
                  href="#portfolio"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold glass hover:bg-white/10 transition-colors"
                >
                  View Projects <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
          <div className="space-y-4">
            {[
              {
                Icon: GraduationCap,
                t: "Education",
                v: "Informatics, Universitas Negeri Padang",
              },
              {
                Icon: Briefcase,
                t: "Program",
                v: "Data Science Specialist Cohort, Asah led by Dicoding",
              },
            ].map(({ Icon, t, v }, i) => (
              <Reveal key={t} i={i}>
                <TiltCard
                  className="rounded-2xl glass p-5 flex gap-4 items-start"
                  max={6}
                >
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-500/20">
                    <Icon className="w-5 h-5 text-fuchsia-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-fuchsia-300 font-bold">
                      {t}
                    </p>
                    <p className="text-slate-200 mt-1">{v}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-16 grid sm:grid-cols-3 gap-5">
          {stats.map(({ Icon, value, label, note }, i) => (
            <Reveal key={label} i={i}>
              <TiltCard className="rounded-2xl glass p-6 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-full bg-white/5">
                    <Icon className="w-6 h-6 text-fuchsia-300" />
                  </div>
                  <span className="text-5xl font-extrabold text-gradient">
                    <CountUp value={value} />
                  </span>
                </div>
                <p className="mt-4 font-bold uppercase tracking-wider text-sm">
                  {label}
                </p>
                <p className="text-slate-400 text-sm">{note}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PORTFOLIO (TABS) ================= */
const tabs = [
  { id: "projects", label: "Projects", Icon: Code2 },
  { id: "certificates", label: "Certificates", Icon: Award },
  { id: "tech", label: "Tech Stack", Icon: Layers },
];
export function Portfolio() {
  const [tab, setTab] = useState("projects");
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  return (
    <section id="portfolio" className="py-28">
      <div className="max-w-6xl mx-auto px-5">
        <SectionTitle
          eyebrow="Portfolio"
          title="Portfolio Showcase"
          subtitle="Projects, certifications, and the tools I use along my data journey."
        />

        <Reveal>
          <div className="relative flex p-1.5 rounded-2xl glass max-w-xl mx-auto mb-12">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${tab === id ? "text-white" : "text-slate-400 hover:text-slate-200"}`}
              >
                {tab === id && (
                  <motion.span
                    layoutId="tab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/80 to-violet-600/80"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="relative w-4 h-4" />
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            {tab === "projects" && (
              <>
                <TiltCard
                  className="rounded-3xl glass p-5 md:p-7 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center mb-8"
                  max={4}
                >
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold tracking-widest uppercase text-fuchsia-300">
                      ⭐ Featured project
                    </span>
                    <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-slate-400">
                      {featured.description}
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {featured.stats.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-xl bg-white/5 p-3 text-center"
                        >
                          <p className="text-xl md:text-2xl font-extrabold text-gradient">
                            <CountUp {...s} />
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {s.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {featured.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={featured.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-pink-500 to-violet-600 hover:scale-105 transition-transform"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Dashboard
                      </a>
                      <a
                        href={featured.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold glass hover:bg-white/10"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </a>
                    </div>
                  </div>
                </TiltCard>
                <div className="grid sm:grid-cols-2 gap-6">
                  {others.map((p, i) => (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <TiltCard className="h-full rounded-2xl glass p-6 flex flex-col">
                        <h3 className="text-xl font-bold">{p.title}</h3>
                        <p className="mt-2 text-slate-400 text-sm flex-1">
                          {p.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-slate-300 border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fuchsia-300 hover:gap-3 transition-all w-fit"
                        >
                          View on GitHub <ArrowRight className="w-4 h-4" />
                        </a>
                      </TiltCard>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {tab === "certificates" && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <TiltCard
                      className={`h-full rounded-2xl glass overflow-hidden flex flex-col ${c.award ? "ring-2 ring-amber-400/60" : ""}`}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-full aspect-[1.41] object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {c.award && (
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-night shadow-lg">
                            🏆 Award
                          </span>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p
                          className={`text-xs font-semibold ${c.award ? "text-amber-300" : "text-fuchsia-300"}`}
                        >
                          {c.issuer || "Dicoding Indonesia"} · {c.date}
                        </p>
                        <h3 className="mt-1.5 font-bold flex-1">{c.title}</h3>
                        <a
                          href={c.url || c.image}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fuchsia-300 hover:gap-3 transition-all w-fit"
                        >
                          {c.url ? "Verify" : "View Certificate"}{" "}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "tech" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {techStack.map((t, i) => (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <TiltCard className="rounded-2xl glass p-6 flex flex-col items-center gap-3 text-center">
                      <span className="grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        <t.icon
                          className="text-3xl text-fuchsia-300 transition-colors duration-300 group-hover:[color:var(--c)]"
                          style={{ "--c": t.color }}
                        />
                      </span>
                      <span className="font-semibold text-slate-200 text-sm">
                        {t.name}
                      </span>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ================= JOURNEY ================= */
export function Journey() {
  return (
    <section id="journey" className="py-28">
      <div className="max-w-3xl mx-auto px-5">
        <SectionTitle eyebrow="Experience" title="My Journey" />
        <div className="relative pl-8">
          <motion.div
            className="absolute left-2 top-0 w-[2px] bg-gradient-to-b from-pink-500 via-fuchsia-500 to-violet-600 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            style={{ height: "100%" }}
          />
          <div className="space-y-10">
            {journey.map((j, i) => (
              <Reveal key={j.title} i={i} className="relative">
                <span className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-fuchsia-500 ring-4 ring-night">
                  <span className="absolute inset-0 rounded-full bg-fuchsia-500 animate-ping opacity-60" />
                </span>
                <TiltCard className="rounded-2xl glass p-6" max={5}>
                  <p className="text-xs font-bold text-fuchsia-300 tracking-wider">
                    {j.date}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{j.title}</h3>
                  <p className="text-slate-300 text-sm">{j.place}</p>
                  <p className="mt-3 text-slate-400">{j.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= CONTACT ================= */
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New message from ${form.name} (Portfolio)`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success === "false" || data.success === false)
        throw new Error(data.message);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const input =
    "mt-1.5 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 transition";

  return (
    <section id="contact" className="py-28">
      <div className="max-w-5xl mx-auto px-5">
        <SectionTitle
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="I'm open to internships and entry-level roles in Data Science, Data Analytics, and Data Engineering."
        />
        <div className="grid md:grid-cols-2 gap-8">
          <Reveal>
            <form onSubmit={submit} className="rounded-3xl glass p-7 space-y-5">
              <h3 className="text-2xl font-bold text-gradient">
                Send me a message
              </h3>
              <div>
                <label htmlFor="name" className="text-sm text-slate-400">
                  Your name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  className={input}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-slate-400">
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  className={input}
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update("message")}
                  className={`${input} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-violet-600 hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? (
                  "Sending…"
                ) : (
                  <>
                    Send Message{" "}
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3"
                  >
                    ✅ Message sent! Thank you, I'll get back to you soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3"
                  >
                    ❌ Message failed to send. Please email me directly at{" "}
                    {profile.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
          <div className="space-y-4">
            {[
              {
                Icon: Mail,
                t: "Email",
                v: profile.email,
                href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`,
              },
              {
                Icon: Linkedin,
                t: "LinkedIn",
                v: "bungarahmadani-ds",
                href: profile.linkedin,
              },
              {
                Icon: Github,
                t: "GitHub",
                v: "bunga-sky",
                href: profile.github,
              },
            ].map(({ Icon, t, v, href }, i) => (
              <Reveal key={t} i={i}>
                <TiltCard className="rounded-2xl glass" max={6}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-5"
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-violet-500/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-fuchsia-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">{t}</p>
                      <p className="font-semibold truncate">{v}</p>
                    </div>
                    {href && (
                      <ArrowRight className="ml-auto w-4 h-4 text-slate-500 group-hover:text-fuchsia-300 group-hover:translate-x-1 transition-all" />
                    )}
                  </a>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-500">
      © {new Date().getFullYear()}{" "}
      <span className="text-slate-300">{profile.name}</span>. Built with React,
      Tailwind & Framer Motion.
    </footer>
  );
}
