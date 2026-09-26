import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";

/* Latar belakang: blob warna bergerak + grid */
export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg" />
      <StarField />
      <motion.div
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-fuchsia-600/25 blur-[120px]"
        animate={{ x: [0, 120, -40, 0], y: [0, 80, 140, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full bg-violet-600/25 blur-[120px]"
        animate={{ x: [0, -140, 30, 0], y: [0, -60, 90, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-pink-500/20 blur-[120px]"
        animate={{ x: [0, 90, -90, 0], y: [0, -80, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* Latar seluruh halaman: bintang berkelip, partikel melayang, bintang jatuh */
export function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current,
      ctx = canvas.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 2);
    let W,
      H,
      stars = [],
      motes = [],
      shooters = [],
      raf,
      t = 0;
    const colors = ["244,114,182", "232,121,249", "167,139,250", "255,255,255"];
    const resize = () => {
      W = canvas.width = innerWidth * dpr;
      H = canvas.height = innerHeight * dpr;
      const area = innerWidth * innerHeight;
      stars = Array.from(
        { length: Math.min(160, Math.floor(area / 9000)) },
        () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          r: (Math.random() * 1.2 + 0.3) * dpr,
          p: Math.random() * Math.PI * 2,
          s: Math.random() * 0.03 + 0.008,
          c: colors[Math.floor(Math.random() * colors.length)],
        }),
      );
      motes = Array.from(
        { length: Math.min(40, Math.floor(area / 35000)) },
        () => newMote(true),
      );
    };
    const newMote = (anywhere) => ({
      x: Math.random() * W,
      y: anywhere ? Math.random() * H : H + 20 * dpr,
      r: (Math.random() * 2.2 + 1) * dpr,
      vy: (Math.random() * 0.35 + 0.15) * dpr,
      drift: Math.random() * Math.PI * 2,
      c: colors[Math.floor(Math.random() * 3)],
    });
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, W, H);
      for (const st of stars) {
        st.p += st.s;
        ctx.globalAlpha = 0.25 + Math.abs(Math.sin(st.p)) * 0.75;
        ctx.fillStyle = `rgb(${st.c})`;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.y -= m.vy;
        m.drift += 0.01;
        m.x += Math.sin(m.drift) * 0.3 * dpr;
        if (m.y < -20 * dpr) motes[i] = newMote(false);
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
        g.addColorStop(0, `rgba(${m.c},.55)`);
        g.addColorStop(1, `rgba(${m.c},0)`);
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (t % 260 === 0 && shooters.length < 2) {
        shooters.push({
          x: Math.random() * W * 0.7 + W * 0.3,
          y: Math.random() * H * 0.4,
          v: (8 + Math.random() * 5) * dpr,
          life: 0,
        });
      }
      shooters = shooters.filter((sh) => sh.life < 70);
      for (const sh of shooters) {
        sh.life++;
        sh.x -= sh.v;
        sh.y += sh.v * 0.45;
        const tail = 90 * dpr;
        const g = ctx.createLinearGradient(
          sh.x,
          sh.y,
          sh.x + tail,
          sh.y - tail * 0.45,
        );
        g.addColorStop(0, "rgba(255,255,255,.9)");
        g.addColorStop(1, "rgba(232,121,249,0)");
        ctx.globalAlpha = 1 - sh.life / 70;
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6 * dpr;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(sh.x + tail, sh.y - tail * 0.45);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
    />
  );
}

/* Garis progres scroll di atas layar */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500"
    />
  );
}

/* Kanvas jaringan data (titik & garis) */
export function DataNetwork() {
  const ref = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current,
      ctx = canvas.getContext("2d");
    const dpr = devicePixelRatio || 1;
    let W,
      H,
      pts = [],
      raf;
    const mouse = { x: -9999, y: -9999 };
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      W = canvas.width = r.width * dpr;
      H = canvas.height = r.height * dpr;
      const n = Math.min(70, Math.floor(r.width / 20));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.45 * dpr,
        vy: (Math.random() - 0.5) * 0.45 * dpr,
      }));
    };
    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    const link = 130 * dpr;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dm < 150 * dpr) {
          p.x += (p.x - mouse.x) * 0.015;
          p.y += (p.y - mouse.y) * 0.015;
        }
      }
      for (let a = 0; a < pts.length; a++) {
        for (let b = a + 1; b < pts.length; b++) {
          const d = Math.hypot(pts[a].x - pts[b].x, pts[a].y - pts[b].y);
          if (d < link) {
            ctx.strokeStyle = `rgba(232,121,249,${(1 - d / link) * 0.25})`;
            ctx.lineWidth = dpr;
            ctx.beginPath();
            ctx.moveTo(pts[a].x, pts[a].y);
            ctx.lineTo(pts[b].x, pts[b].y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(244,114,182,.7)";
        ctx.beginPath();
        ctx.arc(pts[a].x, pts[a].y, 1.8 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    addEventListener("resize", resize);
    addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("mousemove", move);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full -z-[1]"
    />
  );
}

/* Efek mengetik bergantian */
export function Typewriter({ words }) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0,
      i = words[0].length,
      del = true,
      t;
    const tick = () => {
      setText(words[w].slice(0, i));
      if (del) {
        i--;
        if (i < 0) {
          del = false;
          w = (w + 1) % words.length;
          i = 0;
        }
      } else {
        i++;
        if (i > words[w].length) {
          del = true;
          t = setTimeout(tick, 1800);
          return;
        }
      }
      t = setTimeout(tick, del ? 45 : 95);
    };
    t = setTimeout(tick, 2600);
    return () => clearTimeout(t);
  }, [words]);
  return (
    <span>
      <span className="text-gradient">{text}</span>
      <span className="caret inline-block w-[3px] h-[0.85em] ml-1 align-[-0.05em] bg-fuchsia-400" />
    </span>
  );
}

/* Angka menghitung naik */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now(),
      dur = 1600;
    let raf;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setN(value * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Kartu miring 3D mengikuti kursor */
export function TiltCard({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const onMove = (e) => {
    if (!matchMedia("(hover: hover)").matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width,
      y = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg) translateY(-4px)`,
      "--mx": `${x * 100}%`,
      "--my": `${y * 100}%`,
    });
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setStyle({})}
      style={style}
      className={`group relative transition-transform duration-200 ease-out ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx,50%) var(--my,50%), rgba(232,121,249,.15), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

/* Pembungkus animasi muncul saat scroll */
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] },
  }),
};
export function Reveal({ children, i = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="text-center mb-14">
      <p className="text-xs font-bold tracking-[.25em] uppercase text-fuchsia-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl md:text-5xl font-extrabold text-gradient">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-slate-400 max-w-xl mx-auto">{subtitle}</p>
      )}
    </Reveal>
  );
}
