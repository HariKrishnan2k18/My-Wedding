"use client";

import { useEffect, useRef, useState } from "react";
import VENUE_IMG from './../public/assets/img/mandapam.jpg'

// ── Constants ──────────────────────────────────────────────────────────────────
const WEDDING_DATE = new Date("June 24, 2026 08:00:00").getTime();
const GANESH_IMG   = "https://pub-1953a6673e864f3488c645252f75de98.r2.dev/Shriya%20%26%20Ashutosh/Vianyak%20png.png";

const GOLD   = "#C9A84C";
const GOLD_D = "#A07C2A";
const MAROON = "#8B2635";
const CREAM  = "#FDF8F0";
const WHITE  = "#FFFFFF";
const TEXT   = "#2C2015";
const TMED   = "#6B5B3E";
const BORDER = "#E8D9BC";


// ── Ceremony data ──────────────────────────────────────────────────────────────
const CEREMONIES = [
  { num: "I",   icon: "✨", name: "Shagun & Shades",         sub: "",                          day: "Tue, 23th Jun" },
  { num: "II",  icon: "🙏", name: "Parampara & Pratishtha",  sub: "",                          day: "Wed, 24th Jun" },
  { num: "III", icon: "🎶", name: "Sitaron Wali Shaam",      sub: "A Bollywood Musical Night", day: "Wed, 24th Jun" },
  { num: "IV",  icon: "💐", name: "Phoolon Ki Mehfil",       sub: "",                          day: "Wed, 24th Jun" },
  { num: "V",   icon: "💍", name: "Together Forever",        sub: "Shubh Vivah",               day: "Wed, 24th Jun" },
  { num: "VI",  icon: "🌙", name: "Bheegi Palkein",          sub: "",                          day: "Wed, 24th Jun" },
];

// ── Shared inline-style helpers ────────────────────────────────────────────────
const WRAP: React.CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "68px 20px" };

// ── Sub-components ─────────────────────────────────────────────────────────────
function HRule() {
  return <div className="hline" />;
}

function Ornament() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", margin: "10px 0 32px" }}>
      <div className="orn-line" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <span className="orn-star" style={{ color: GOLD, fontSize: 14 }}>✦</span>
      <div className="orn-line" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

function SectionHead({ title, sub, sub2 }: { title: string; sub?: string; sub2?: string }) {
  return (
    <div className="reveal" style={{ textAlign: "center" }}>
      <h2 style={{
        fontFamily: "'Cormorant Garant', serif",
        fontSize: "clamp(28px, 6vw, 44px)",
        fontWeight: 600, color: MAROON,
        letterSpacing: "0.04em", margin: 0,
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{
          fontFamily: "'Lato', sans-serif",
          fontSize: 10, color: GOLD_D,
          letterSpacing: 3, textTransform: "uppercase", marginTop: 6,
        }}>
          {sub}
        </p>
      )}
      {sub2 && (
        <p style={{
          fontFamily: "'Cormorant Garant', serif",
          fontStyle: "italic", fontSize: 16, color: TMED, marginTop: 4,
        }}>
          {sub2}
        </p>
      )}
      <Ornament />
    </div>
  );
}

// ── Gallery carousel ───────────────────────────────────────────────────────────
const GALLERY_IMGS = [
  "/img/image%201.jpeg",
  "/img/image%202.jpeg",
  "/img/image%203.jpeg",
  "/img/image%204.jpeg",
];

function PhotoCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx(p => (p + 1) % GALLERY_IMGS.length), 3500);
    return () => clearInterval(id);
  }, []);

  const prev = () => setIdx(p => (p - 1 + GALLERY_IMGS.length) % GALLERY_IMGS.length);
  const next = () => setIdx(p => (p + 1) % GALLERY_IMGS.length);

  const btnStyle: React.CSSProperties = {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: WHITE, border: `1px solid ${BORDER}`,
    borderRadius: "50%", width: 36, height: 36,
    cursor: "pointer", fontSize: 20, lineHeight: "1",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 10px rgba(44,32,21,0.12)",
    color: TMED, zIndex: 2,
  };

  return (
    <div className="reveal" style={{ maxWidth: 480, margin: "0 auto", position: "relative", padding: "0 24px" }}>
      {/* Images */}
      <div style={{ position: "relative", width: "100%", overflow: "hidden", borderRadius: 8 }}>
        {GALLERY_IMGS.map((src, i) => (
          <img
            key={i} src={src} alt={`Photo ${i + 1}`}
            style={{
              position: i === 0 ? "relative" : "absolute",
              top: 0, left: 0,
              width: "100%", height: "auto",
              display: "block",
              opacity: i === idx ? 1 : 0,
              transition: "opacity 0.7s ease",
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button onClick={prev} style={{ ...btnStyle, left: 0 }}>‹</button>
      <button onClick={next} style={{ ...btnStyle, right: 0 }}>›</button>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 18 }}>
        {GALLERY_IMGS.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 22 : 8, height: 8, borderRadius: 4,
            border: "none", cursor: "pointer", padding: 0,
            background: i === idx ? GOLD : BORDER,
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const [time,       setTime]      = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [done,       setDone]      = useState(false);
  const [submitted,  setSubmitted] = useState(false);
  const [scrollPct,  setScrollPct] = useState(0);
  const [venueY,     setVenueY]    = useState(0);
  const venueRef  = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef  = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [splashClosing, setSplashClosing] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "",
    attending:  "",
    guests:     "1",
    events:     [] as string[],
    emotional:  "",
    mood:       "",
    note:       "",
    advice:     "",
  });

  // Countdown
  useEffect(() => {
    const tick = () => {
      const dist = WEDDING_DATE - Date.now();
      if (dist <= 0) { setDone(true); return; }
      setTime({
        d: Math.floor(dist / 86400000),
        h: Math.floor((dist % 86400000) / 3600000),
        m: Math.floor((dist % 3600000)  / 60000),
        s: Math.floor((dist % 60000)    / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);


  // Scroll progress bar + venue parallax
  useEffect(() => {
    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setScrollPct((scrollTop / (scrollHeight - clientHeight)) * 100);

      if (venueRef.current) {
        const rect = venueRef.current.getBoundingClientRect();
        setVenueY(Math.max(-28, Math.min(28, rect.top * 0.14)));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Autumn leaves canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type Leaf = {
      x: number; y: number; vx: number; vy: number;
      size: number; rot: number; rotS: number;
      op: number; col: string;
      sway: number; swaySpeed: number; swayAmp: number;
      shape: number;
    };

    const colors = ["#CC3300","#E05C00","#FF8C00","#C0392B","#D97706","#8B2500","#B45309","#E07B39","#A0522D","#DAA520"];

    const mkLeaf = (): Leaf => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 0.6 + Math.random() * 1.4,
      size: 3 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      rotS: (Math.random() - 0.5) * 0.04,
      op: 0.45 + Math.random() * 0.45,
      col: colors[Math.floor(Math.random() * colors.length)],
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.018 + Math.random() * 0.022,
      swayAmp: 0.5 + Math.random() * 1.0,
      shape: 1,
    });

    const leaves: Leaf[] = Array.from({ length: 16 }, (_, i) => ({ ...mkLeaf(), y: (i / 16) * canvas.height }));

    const drawLeaf = (l: Leaf) => {
      const s = l.size;
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      ctx.globalAlpha = l.op;
      ctx.fillStyle = l.col;
      ctx.beginPath();
      // Pointed leaf
      ctx.moveTo(0, -s);
      ctx.quadraticCurveTo(s * 0.9, 0, 0, s);
      ctx.quadraticCurveTo(-s * 0.9, 0, 0, -s);
      ctx.fill();
      // Midrib line
      ctx.strokeStyle = `${l.col}88`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.8);
      ctx.lineTo(0, s * 0.8);
      ctx.stroke();
      ctx.restore();
    };

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      leaves.forEach(l => {
        l.sway += l.swaySpeed;
        l.x += Math.sin(l.sway) * l.swayAmp + l.vx;
        l.y += l.vy;
        l.rot += l.rotS;
        if (l.y > canvas.height + 30) { Object.assign(l, mkLeaf()); l.y = -30; }
        drawLeaf(l);
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // Sync play/pause button icon with actual audio state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play",  onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play",  onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const openInvitation = () => {
    if (splashClosing) return;
    setSplashClosing(true);
    const audio = audioRef.current;
    if (audio) { audio.volume = 0.5; audio.play().catch(() => {}); }
    setTimeout(() => setShowSplash(false), 2500);
  };

  // Auto-open after 8 seconds
  useEffect(() => {
    const t = setTimeout(openInvitation, 8000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().catch(() => {}); }
  };

  // Scroll-reveal — covers all variant classes
  useEffect(() => {
    const sel = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .hline";
    const els = document.querySelectorAll<Element>(sel);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const sf  = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const tog = (name: string) =>
    setForm(p => ({
      ...p,
      events: p.events.includes(name)
        ? p.events.filter(e => e !== name)
        : [...p.events, name],
    }));

    const handleSubmit = async () => {
  try {
    const payload = {
      form: form,
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      console.log("Submitted successfully ✅");
    } else {
      console.log(data.message || "Failed ❌");
    }
  } catch (error) {
    console.error(error);
    console.log("Error occurred");
  }
};

  return (
    <main style={{ background: CREAM, minHeight: "100vh" }}>

      {/* ══ AUTUMN LEAVES ═══════════════════════════════════════════════════ */}
      <canvas ref={canvasRef} style={{
        position: "fixed", top: 0, left: 0, zIndex: 10,
        width: "100%", height: "100%", pointerEvents: "none",
      }} />

      {/* ══ BACKGROUND MUSIC ════════════════════════════════════════════════ */}
      <audio ref={audioRef} src="/assets/mp3/music.mp3" loop />

      {/* ══ SPLASH OVERLAY ══════════════════════════════════════════════════ */}
      {showSplash && (
        <div
          onClick={openInvitation}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            overflow: "hidden",
            background: "radial-gradient(ellipse at center, #6B1A2A 0%, #2D0610 100%)",
            pointerEvents: splashClosing ? "none" : "auto",
            cursor: "pointer",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
          }}
        >
          {/* ── Dark curtains (slide away horizontally) ── */}
          <div style={{
            position: "absolute", top: 0, left: 0,
            width: "50%", height: "100%",
            background: "linear-gradient(to right, #1E0408, #5A1020)",
            transition: "transform 0.95s cubic-bezier(.76,0,.24,1) 0.55s",
            transform: splashClosing ? "translateX(-101%)" : "translateX(0)",
            zIndex: 1,
          }} />
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "50%", height: "100%",
            background: "linear-gradient(to left, #1E0408, #5A1020)",
            transition: "transform 0.95s cubic-bezier(.76,0,.24,1) 0.55s",
            transform: splashClosing ? "translateX(101%)" : "translateX(0)",
            zIndex: 1,
          }} />

          {/* ── Top content: names ── */}
          <div style={{
            position: "relative", zIndex: 2, textAlign: "center",
            padding: "0 24px 18px", width: "100%",
            opacity: splashClosing ? 0 : 1,
            transform: splashClosing ? "translateY(-20px)" : "translateY(0)",
            transition: "opacity 0.28s ease, transform 0.28s ease",
          }}>
            <img src={GANESH_IMG} alt="Shri Ganesh" style={{
              width: 72, height: 72, objectFit: "contain",
              margin: "0 auto 12px",
              animation: "float-ganesh 3.8s ease-in-out infinite",
              filter: "brightness(0) invert(1)",
            }} />
            <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:"clamp(38px,10vw,60px)", color: GOLD, lineHeight:1.1, margin:0, textShadow:"0 2px 16px rgba(201,168,76,0.45)" }}>
              Harikrishnan
            </p>
            <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, color:"#E8D9BC", letterSpacing:5, textTransform:"uppercase", margin:"5px 0" }}>
              Weds
            </p>
            <p style={{ fontFamily:"'Great Vibes',cursive", fontSize:"clamp(38px,10vw,60px)", color: GOLD, lineHeight:1.1, margin:"0 0 12px", textShadow:"0 2px 16px rgba(201,168,76,0.45)" }}>
              Dhanalakshmi
            </p>
            <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:14, color:"#E8D9BC" }}>
              Wednesday · 24 June 2026
            </p>
          </div>

          {/* ── Horizontal Ribbon ── */}
          <div style={{ position: "relative", zIndex: 3, width: "100%", height: 64, flexShrink: 0 }}>
            {/* Left ribbon half */}
            <div style={{
              position: "absolute", top: 0, left: 0, width: "50%", height: "100%",
              background: "linear-gradient(to bottom, #AA1500 0%, #EE2200 45%, #FF4422 50%, #EE2200 55%, #AA1500 100%)",
              transition: "transform 0.48s cubic-bezier(.76,0,.24,1)",
              transform: splashClosing ? "translateX(-101%)" : "translateX(0)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.25)",
            }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:"linear-gradient(to right, #A07C2A, #FFE066, #C9A84C, #FFE066, #A07C2A)", opacity:0.9 }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:5, background:"linear-gradient(to right, #A07C2A, #FFE066, #C9A84C, #FFE066, #A07C2A)", opacity:0.9 }} />
            </div>
            {/* Right ribbon half */}
            <div style={{
              position: "absolute", top: 0, right: 0, width: "50%", height: "100%",
              background: "linear-gradient(to bottom, #AA1500 0%, #EE2200 45%, #FF4422 50%, #EE2200 55%, #AA1500 100%)",
              transition: "transform 0.48s cubic-bezier(.76,0,.24,1)",
              transform: splashClosing ? "translateX(101%)" : "translateX(0)",
              boxShadow: "inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.25)",
            }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:5, background:"linear-gradient(to right, #A07C2A, #FFE066, #C9A84C, #FFE066, #A07C2A)", opacity:0.9 }} />
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:5, background:"linear-gradient(to right, #A07C2A, #FFE066, #C9A84C, #FFE066, #A07C2A)", opacity:0.9 }} />
            </div>
            {/* ✂ Scissors at center */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              fontSize: 34, color: GOLD,
              filter: "drop-shadow(0 2px 10px rgba(201,168,76,0.7))",
              animation: splashClosing ? "scissorSnip 0.55s cubic-bezier(.34,1.56,.64,1) forwards" : "ribbonGlow 2s ease-in-out infinite",
              zIndex: 4,
              transformOrigin: "center",
              transform: "translate(-50%, -50%) rotate(-15deg)",
            }}>✂</div>
          </div>

      
        </div>
      )}

      {/* Floating music toggle */}
      <button
        onClick={toggleMusic}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 998,
          width: 48, height: 48, borderRadius: "50%",
          background: "#B85940", border: "none",
          boxShadow: "0 4px 16px rgba(184,89,64,0.45)",
          cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: 20, transition: "transform 0.2s, opacity 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>

      {/* ══ SCROLL PROGRESS BAR ═════════════════════════════════════════════ */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 999,
        height: 3, width: `${scrollPct}%`,
        background: `linear-gradient(to right, ${GOLD}, ${MAROON})`,
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }} />


      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: "100svh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "16px 20px",
      }}>
        <div style={{
          maxWidth: 560, width: "100%",
          background: WHITE,
          border: `1px solid ${BORDER}`,
          borderRadius: 24,
          padding: "28px 28px 32px",
          boxShadow: "0 8px 40px rgba(44,32,21,0.10)",
          textAlign: "center",
        }}>

          {/* Ganesh — floats */}
          <div className="hi">
            <img
              src={GANESH_IMG}
              alt="Shri Ganesh"
              style={{
                width: 80, height: 80, objectFit: "contain",
                margin: "0 auto",
                animation: "float-ganesh 3.8s ease-in-out infinite",
              }}
            />
          </div>

          {/* Tamil shloka */}
          <div className="hi">
            <p style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: 13,
              color: TMED, lineHeight: 1.8, marginBottom: 12,
            }}>
              அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை<br />
              பண்பும் பயனும் அது.
            </p>
          </div>

          {/* Intro */}
          <div className="hi">
            <p style={{
              fontFamily: "'Cormorant Garant', serif",
              fontStyle: "italic",
              fontSize: "clamp(13px, 2.6vw, 16px)",
              color: TMED, lineHeight: 1.7,
              maxWidth: 420, margin: "0 auto 16px",
            }}>
              With the blessings of the Almighty &amp; our respected elders,
              we joyfully request your gracious presence on the
              wedding celebration of
            </p>
          </div>

          {/* Groom */}
          <div className="hi">
            <h1 className="name-glow" style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(38px, 9vw, 58px)",
              fontWeight: 400, color: MAROON, lineHeight: 1, margin: 0,
            }}>
              Harikrishnan
            </h1>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 12, color: TMED, lineHeight: 1.8, marginTop: 4,
            }}>
              Son of <br/> <strong>Mr. K.A.Thirupathi &amp; Mrs. T.Poongodi</strong><br />
              <span style={{ fontSize: 11, opacity: 0.7 }}>
                Grandson of Annamalai-Jayalakshmi &amp; Annamalai-Saroja
              </span>
            </p>
          </div>

          {/* Heart divider */}
          <div className="hi" style={{ margin: "10px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <div style={{ height: 1, flex: 1, maxWidth: 80, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
              <span style={{
                color: MAROON, fontSize: 24,
                display: "inline-block",
                animation: "pulse-heart 1.8s ease infinite",
              }}>❤</span>
              <div style={{ height: 1, flex: 1, maxWidth: 80, background: `linear-gradient(to left, transparent, ${GOLD})` }} />
            </div>
          </div>

          {/* Bride */}
          <div className="hi">
            <h1 className="name-glow" style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "clamp(38px, 9vw, 58px)",
              fontWeight: 400, color: MAROON, lineHeight: 1, margin: 0,
            }}>
              Dhanalakshmi
            </h1>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 12, color: TMED, lineHeight: 1.8, marginTop: 4,
            }}>
              Daughter of <br/> <strong>Mr. S.Venkatasalam &amp; Mrs. V.Rani</strong><br />
              <span style={{ fontSize: 11, opacity: 0.7 }}>
                Granddaughter of Sundara Moorthi - Rajalakshmi &amp; Annamalai - Kanagammal
              </span>
            </p>
          </div>


        </div>

        {/* Date box — outside card */}
        <div className="hi" style={{ marginTop: 24, textAlign: "center" }}>
          <div className="date-box" style={{
            display: "inline-block",
            border: `1px solid ${GOLD}`,
            borderRadius: 12,
            padding: "16px 36px",
            background: `${GOLD}09`,
          }}>
            <p style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(17px, 3.5vw, 22px)",
              fontWeight: 600, color: MAROON,
              marginBottom: 6, letterSpacing: "0.05em",
            }}>
              Wednesday · 24 June 2026
            </p>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 12, color: TMED, lineHeight: 1.8,
            }}>
              Srinivasa Mandapam · UdayarPalayam, Thammampatti · Salem
            </p>
          </div>
        </div>

      </section>

      <HRule />

      {/* ══ THE BIG DAY — COUNTDOWN ═════════════════════════════════════════ */}
      <section style={WRAP}>
        <SectionHead
          title="The Big Day"
          sub2="The start of a beautiful journey, shared with the ones we love most"
        />
        <div style={{ textAlign: "center" }}>
          {done ? (
            <div className="reveal-scale" style={{
              background: WHITE, border: `1px solid ${BORDER}`,
              borderRadius: 20, padding: "56px 32px",
            }}>
              <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 54, color: MAROON }}>
                Together Forever 💍
              </p>
            </div>
          ) : (
            <>
              <p className="reveal" style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: "clamp(20px, 4vw, 26px)",
                fontWeight: 600, color: MAROON,
                marginBottom: 28, letterSpacing: "0.04em",
              }}>
                Wednesday · 24th June 2026
              </p>
              <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                {([ ["d","Days"], ["h","Hours"], ["m","Mins"], ["s","Secs"] ] as [keyof typeof time, string][])
                  .map(([key, label], idx) => (
                  <div
                    key={label}
                    className="reveal-scale hover-lift"
                    style={{
                      background: WHITE,
                      border: `2px solid ${GOLD}`,
                      borderRadius: 14,
                      padding: "20px 26px",
                      minWidth: 88,
                      textAlign: "center",
                      boxShadow: `0 4px 20px ${GOLD}28`,
                      overflow: "hidden",
                      transitionDelay: `${idx * 0.1}s`,
                    }}
                  >
                    <p
                      key={time[key]}
                      className="tick"
                      style={{
                        fontFamily: "'Cormorant Garant', serif",
                        fontSize: "clamp(38px, 8vw, 54px)",
                        fontWeight: 700, color: MAROON,
                        lineHeight: 1, marginBottom: 6,
                      }}
                    >
                      {String(time[key]).padStart(2, "0")}
                    </p>
                    <p style={{
                      fontFamily: "'Lato', sans-serif",
                      fontSize: 10, color: TMED,
                      letterSpacing: 2.5, textTransform: "uppercase",
                    }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <HRule />

      {/* ══ A GLIMPSE OF US ═════════════════════════════════════════════════ */}
      <section style={WRAP}>
        <SectionHead
          title="A Glimpse of Us"
          sub="Our Beautiful Moments"
          sub2="A moment captured in time, forever in our hearts"
        />
        <PhotoCarousel />
      </section>

      <HRule />

      {/* ══ WHERE LOVE AWAITS — VENUE ════════════════════════════════════════ */}
      <section style={WRAP} ref={venueRef}>
        <SectionHead title="Where Love Awaits" sub="Our Cherished Venue" />
        <div className="reveal-scale">
          <div
            className="hover-lift"
            style={{
              background: WHITE,
              border: `1px solid ${BORDER}`,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 4px 28px rgba(44,32,21,0.08)",
            }}
          >
            {/* Venue photo */}
            <div style={{ overflow: "hidden", height: 220 }}>
              <img
                src={VENUE_IMG.src}
                alt="Srinivasa Mandapam"
                style={{
                  width: "100%", height: 250, objectFit: "cover",
                  transform: `translateY(${venueY}px)`,
                  willChange: "transform",
                }}
              />
            </div>

            <div style={{ padding: "24px 24px 28px", textAlign: "center" }}>
              {/* Venue name in script */}
              <h3 style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(36px, 10vw, 52px)",
                fontWeight: 400, color: MAROON,
                lineHeight: 1.2, marginBottom: 8,
              }}>
                Srinivasa Mandapam
              </h3>

              {/* Address */}
              <p style={{
                fontFamily: "'Cormorant Garant', serif",
                fontStyle: "italic",
                fontSize: 15, color: TMED, lineHeight: 1.7, marginBottom: 20,
              }}>
                Udayarpalayam, Thammampatti<br />
                Salem
              </p>

              {/* Google Maps embed */}
              <div style={{
                width: "100%", height: 200,
                borderRadius: 12, overflow: "hidden",
                border: `1px solid ${BORDER}`,
                marginBottom: 20,
              }}>
                <iframe
                  src="https://maps.google.com/maps?q=Srinivasa+Mandapam,+Thammampatti,+Salem&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Get Directions — full-width terracotta pill */}
              <a
                href="https://maps.app.goo.gl/TmqPPJ9rDaq2NxAEA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block" }}
              >
                <button style={{
                  width: "100%",
                  background: "#B85940",
                  color: WHITE,
                  border: "none",
                  borderRadius: 50,
                  padding: "15px",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 700, fontSize: 12,
                  letterSpacing: 3, textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}>
                  GET DIRECTIONS
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <HRule />

      {/* ══ THE CELEBRATION UNFOLDS — CEREMONIES ════════════════════════════ */}
      <section style={WRAP}>
        <SectionHead title="The Celebration Unfolds" sub="Six Sacred Ceremonies" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 18,
        }}>
          {CEREMONIES.map((c, i) => (
            <div
              key={c.num}
              className="reveal hover-lift"
              style={{
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: "24px 26px",
                boxShadow: "0 2px 16px rgba(44,32,21,0.06)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{c.icon}</span>
                <div>
                  <p style={{
                    fontFamily: "'Lato', sans-serif",
                    fontSize: 9, color: GOLD_D,
                    letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 5,
                  }}>
                    Ceremony {c.num} · {c.day}
                  </p>
                  <p style={{
                    fontFamily: "'Cormorant Garant', serif",
                    fontSize: 20, fontWeight: 600, color: MAROON,
                    marginBottom: c.sub ? 4 : 0,
                  }}>
                    {c.name}
                  </p>
                  {c.sub && (
                    <p style={{
                      fontFamily: "'Cormorant Garant', serif",
                      fontStyle: "italic", fontSize: 14, color: TMED,
                    }}>
                      {c.sub}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <HRule />

      {/* ══ JOIN THE CELEBRATION — RSVP FORM ════════════════════════════════ */}
      <section style={WRAP}>

        {/* Custom heading */}
        <div className="reveal" style={{ textAlign: "center", marginBottom: 36 }}>
          <p style={{
            fontFamily: "'Lato', sans-serif", fontSize: 10,
            letterSpacing: 3, textTransform: "uppercase",
            color: "#B85940", marginBottom: 10,
          }}>
            Join the Celebration
          </p>
          <h2 style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(52px, 14vw, 80px)",
            color: MAROON, lineHeight: 1.15, margin: "0 0 12px",
          }}>
            Celebrate<br />With Us
          </h2>
          <p style={{
            fontFamily: "'Cormorant Garant', serif",
            fontStyle: "italic", fontSize: 17, color: TMED,
          }}>
            A few fun questions before the big day!
          </p>
        </div>

        {submitted ? (
          <div style={{
            background: WHITE, border: `1px solid ${BORDER}`,
            borderRadius: 20, padding: "64px 32px",
            textAlign: "center",
            boxShadow: "0 4px 28px rgba(44,32,21,0.08)",
          }}>
            <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: 58, color: MAROON, marginBottom: 14 }}>
              Thank You!
            </p>
            <p style={{
              fontFamily: "'Cormorant Garant', serif",
              fontStyle: "italic", fontSize: 20, color: TMED,
            }}>
              We can&apos;t wait to celebrate with you, {form.name}! 🎉
            </p>
          </div>
        ) : (
          <form
            className="reveal-left"
            onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >

            {/* ─ Guest Details ─ */}
            <div style={{
              background: WHITE, border: `1px solid ${BORDER}`,
              borderRadius: 20, padding: "24px 28px",
              boxShadow: "0 2px 16px rgba(44,32,21,0.06)",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garant', serif",
                fontStyle: "italic", fontSize: 20, fontWeight: 600,
                color: "#B85940", marginBottom: 20,
              }}>Guest Details</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: TMED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Your Name</p>
                  <input
                    required placeholder="Full name"
                    value={form.name} onChange={e => sf("name", e.target.value)}
                    style={{ width:"100%", padding:"10px 0", border:"none", borderBottom:`1px solid ${BORDER}`, background:"transparent", fontFamily:"'Lato',sans-serif", fontSize:14, color:TEXT, outline:"none", boxSizing:"border-box" }}
                  />
                </div>
                <div>
                  <p style={{ fontFamily: "'Lato',sans-serif", fontSize: 10, color: TMED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Phone Number</p>
                  <input
                    placeholder="+91 00000 00000"
                    value={form.phone} onChange={e => sf("phone", e.target.value)}
                    style={{ width:"100%", padding:"10px 0", border:"none", borderBottom:`1px solid ${BORDER}`, background:"transparent", fontFamily:"'Lato',sans-serif", fontSize:14, color:TEXT, outline:"none", boxSizing:"border-box" }}
                  />
                </div>
              </div>
            </div>

            {/* ─ Will you join us? ─ */}
            <div style={{
              background: WHITE, border: `1px solid ${BORDER}`,
              borderRadius: 20, padding: "24px 28px",
              boxShadow: "0 2px 16px rgba(44,32,21,0.06)",
            }}>
              <p style={{
                fontFamily: "'Cormorant Garant', serif",
                fontStyle: "italic", fontSize: 20, fontWeight: 600,
                color: "#B85940", marginBottom: 16,
              }}>Will you join us?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { val: "yes", lbl: "JOYFULLY ACCEPT 🎉" },
                  { val: "no",  lbl: "REGRETTABLY DECLINE" },
                ].map(o => (
                  <button key={o.val} type="button" onClick={() => sf("attending", o.val)} style={{
                    width: "100%", padding: "14px",
                    background: form.attending === o.val ? MAROON : "transparent",
                    color: form.attending === o.val ? WHITE : TEXT,
                    border: `1.5px solid ${form.attending === o.val ? MAROON : BORDER}`,
                    borderRadius: 8, fontFamily: "'Lato',sans-serif",
                    fontSize: 12, fontWeight: 700, letterSpacing: 2,
                    textTransform: "uppercase", cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}>
                    {o.lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* ─ Party Size ─ */}
            <div style={{ background:WHITE, border:`1px solid ${BORDER}`, borderRadius:20, padding:"24px 28px", boxShadow:"0 2px 16px rgba(44,32,21,0.06)" }}>
              <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:20, fontWeight:600, color:"#B85940", marginBottom:16 }}>Party Size</p>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, color:TMED, letterSpacing:2, textTransform:"uppercase", marginBottom:6 }}>Including yourself, how many guests?</p>
              <select value={form.guests} onChange={e => sf("guests", e.target.value)} style={{ width:"100%", padding:"10px 0", border:"none", borderBottom:`1px solid ${BORDER}`, background:"transparent", fontFamily:"'Lato',sans-serif", fontSize:14, color:TEXT, outline:"none" }}>
                <option value="1">1 (Just me)</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6+">6+ Guests</option>
              </select>
            </div>

            {/* ─ Events ─ */}
            <div style={{ background:WHITE, border:`1px solid ${BORDER}`, borderRadius:20, padding:"24px 28px", boxShadow:"0 2px 16px rgba(44,32,21,0.06)" }}>
              <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:20, fontWeight:600, color:"#B85940", marginBottom:16 }}>Events You&apos;ll Attend</p>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, color:TMED, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Select the days you will be joining us</p>
              {[
                { id: "day1", lbl: "Day 1: Reception", sub: "Tuesday, 23rd June 2026" },
                { id: "day2", lbl: "Day 2: Wedding Day", sub: "Wednesday, 24th June 2026" },
              ].map(ev => (
                <div key={ev.id} onClick={() => tog(ev.id)} style={{
                  border: `1px solid ${form.events.includes(ev.id) ? "#B85940" : BORDER}`,
                  borderRadius: 12, padding: "16px 20px", marginBottom: 10,
                  cursor: "pointer", background: form.events.includes(ev.id) ? "#B8594008" : "transparent",
                  transition: "all 0.2s ease",
                }}>
                  <p style={{ fontFamily:"'Cormorant Garant',serif", fontSize:16, fontWeight:600, color: form.events.includes(ev.id) ? "#B85940" : TEXT, marginBottom:4 }}>{ev.lbl}</p>
                  <p style={{ fontFamily:"'Lato',sans-serif", fontSize:12, color:TMED }}>{ev.sub}</p>
                </div>
              ))}
            </div>

            {/* ─ Emotional guess ─ */}
            <div style={{ background:WHITE, border:`1px solid ${BORDER}`, borderRadius:20, padding:"24px 28px", boxShadow:"0 2px 16px rgba(44,32,21,0.06)" }}>
              <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:20, fontWeight:600, color:"#B85940", marginBottom:16 }}>Make a Guess</p>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, color:TMED, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>Who will get emotional first?</p>
              <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 12 }}>
                {[
                  { val: "Hari",  letter: "H", name: "HARI" },
                  { val: "Dhana", letter: "D", name: "DHANA" },
                  { val: "both",  letter: "B", name: "BOTH" },
                ].map(o => (
                  <div key={o.val} onClick={() => sf("emotional", o.val)} style={{ cursor:"pointer", textAlign:"center" }}>
                    <div style={{
                      width: 70, height: 70, borderRadius: "50%",
                      border: `1.5px solid ${form.emotional === o.val ? "#B85940" : BORDER}`,
                      background: form.emotional === o.val ? "#B8594015" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      margin: "0 auto 8px", transition: "all 0.2s ease",
                    }}>
                      <span style={{ fontFamily:"'Great Vibes',cursive", fontSize:32, color:"#B85940" }}>{o.letter}</span>
                    </div>
                    <p style={{ fontFamily:"'Lato',sans-serif", fontSize:9, letterSpacing:2, color:TMED, textTransform:"uppercase" }}>{o.name}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:13, color:TMED, textAlign:"center" }}>
                Reveal after the wedding 😉
              </p>
            </div>

            {/* ─ Mood ─ */}
            <div style={{ background:WHITE, border:`1px solid ${BORDER}`, borderRadius:20, padding:"24px 28px", boxShadow:"0 2px 16px rgba(44,32,21,0.06)" }}>
              <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:20, fontWeight:600, color:"#B85940", marginBottom:16 }}>Your Wedding Mood</p>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, color:TMED, letterSpacing:2, textTransform:"uppercase", marginBottom:12 }}>I&apos;m coming for...</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  { val: "food",  lbl: "The Food 🍛" },
                  { val: "dance", lbl: "Dance Floor 💃" },
                  { val: "love",  lbl: "The Love ❤️" },
                  { val: "all",   lbl: "All of It ✨" },
                ].map(o => (
                  <button key={o.val} type="button" onClick={() => sf("mood", o.val)} style={{
                    padding: "20px 14px", textAlign: "left",
                    border: `1px solid ${form.mood === o.val ? "#B85940" : BORDER}`,
                    borderRadius: 12, cursor: "pointer",
                    background: form.mood === o.val ? "#B8594010" : "transparent",
                    fontFamily: "'Lato',sans-serif", fontSize: 13, color: TEXT,
                    transition: "all 0.2s ease",
                  }}>
                    {o.lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* ─ Note ─ */}
            <div style={{ background:WHITE, border:`1px solid ${BORDER}`, borderRadius:20, padding:"24px 28px", boxShadow:"0 2px 16px rgba(44,32,21,0.06)" }}>
              <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:20, fontWeight:600, color:"#B85940", marginBottom:16 }}>Leave Us a Note</p>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, color:TMED, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Share a wish or memory</p>
              <textarea
                placeholder="Write something from the heart..."
                value={form.note}
                onChange={e => sf("note", e.target.value)}
                rows={4}
                style={{ width:"100%", padding:"14px", border:`1px solid ${BORDER}`, borderRadius:12, background:CREAM, fontFamily:"'Lato',sans-serif", fontSize:14, color:TEXT, outline:"none", resize:"vertical", boxSizing:"border-box" }}
              />
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 11, color: GOLD_D, marginTop: 5,
              }}>
                🔥 This becomes a digital memory book.
              </p>
            </div>

            {/* ─ Advice ─ */}
            <div style={{ background:WHITE, border:`1px solid ${BORDER}`, borderRadius:20, padding:"24px 28px", boxShadow:"0 2px 16px rgba(44,32,21,0.06)" }}>
              <p style={{ fontFamily:"'Cormorant Garant',serif", fontStyle:"italic", fontSize:20, fontWeight:600, color:"#B85940", marginBottom:16 }}>Words for Forever</p>
              <p style={{ fontFamily:"'Lato',sans-serif", fontSize:10, color:TMED, letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Advice for married life</p>
              <textarea
                placeholder="One piece of advice..."
                value={form.advice}
                onChange={e => sf("advice", e.target.value)}
                rows={4}
                style={{ width:"100%", padding:"14px", border:`1px solid ${BORDER}`, borderRadius:12, background:CREAM, fontFamily:"'Lato',sans-serif", fontSize:14, color:TEXT, outline:"none", resize:"vertical", boxSizing:"border-box" }}
              />
            </div>

            {/* ─ Submit ─ */}
            <button
              type="submit"
              style={{
                background: "#B85940",
                color: WHITE, border: "none",
                borderRadius: 50, padding: "16px",
                width: "100%",
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700, fontSize: 12,
                letterSpacing: 3, textTransform: "uppercase",
                cursor: "pointer",
                transition: "opacity 0.2s, transform 0.15s",
              }}
              onClick={handleSubmit}
              onMouseEnter={e => { (e.target as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.opacity = "1"; }}
            >
              SEND LOVE
            </button>

          </form>
        )}
      </section>
    </main>
  );
}
