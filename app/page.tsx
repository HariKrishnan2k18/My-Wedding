"use client";

import { useEffect, useRef, useState } from "react";

// ── Constants ──────────────────────────────────────────────────────────────────
const WEDDING_DATE = new Date("June 24, 2026 00:00:00").getTime();
const GANESH_IMG   = "https://pub-1953a6673e864f3488c645252f75de98.r2.dev/Shriya%20%26%20Ashutosh/Vianyak%20png.png";
const VENUE_IMG    = "https://pub-1953a6673e864f3488c645252f75de98.r2.dev/Ashish%20%26%20Ayushi/Venue.webp";

const GOLD   = "#C9A84C";
const GOLD_D = "#A07C2A";
const MAROON = "#8B2635";
const CREAM  = "#FDF8F0";
const CREAM2 = "#F5EDD8";
const WHITE  = "#FFFFFF";
const TEXT   = "#2C2015";
const TMED   = "#6B5B3E";
const BORDER = "#E8D9BC";


// ── Ceremony data ──────────────────────────────────────────────────────────────
const CEREMONIES = [
  { num: "I",   icon: "✨", name: "Shagun & Shades",         sub: "",                          day: "Mon, 27th Apr" },
  { num: "II",  icon: "🙏", name: "Parampara & Pratishtha",  sub: "",                          day: "Tue, 28th Apr" },
  { num: "III", icon: "🎶", name: "Sitaron Wali Shaam",      sub: "A Bollywood Musical Night", day: "Tue, 28th Apr" },
  { num: "IV",  icon: "💐", name: "Phoolon Ki Mehfil",       sub: "",                          day: "Tue, 28th Apr" },
  { num: "V",   icon: "💍", name: "Together Forever",        sub: "Shubh Vivah",               day: "Tue, 28th Apr" },
  { num: "VI",  icon: "🌙", name: "Bheegi Palkein",          sub: "",                          day: "Tue, 28th Apr" },
];

const COMPLIMENTS = [
  "Smt. Neeraja & Late Shri Madan Lal Gupta",
  "Smt. Sangeeta & Shri Vinod Gupta",
  "Smt. Rajni & Shri Rajeev Gupta",
  "Smt. Poonam & Shri Sanjeev Gupta",
  "Smt. Jyoti & Shri Anil Gupta",
];

// ── Shared inline-style helpers ────────────────────────────────────────────────
const inputCss: React.CSSProperties = {
  width: "100%", padding: "12px 16px",
  borderRadius: 8, border: `1px solid ${BORDER}`,
  fontFamily: "'Lato', sans-serif", fontSize: 14,
  color: TEXT, background: WHITE,
  outline: "none", boxSizing: "border-box",
};
const secLabel: React.CSSProperties = {
  fontFamily: "'Cormorant Garant', serif",
  fontSize: 20, fontWeight: 600, color: MAROON, marginBottom: 10,
};
const fldLabel: React.CSSProperties = {
  fontFamily: "'Lato', sans-serif",
  fontSize: 12, color: TMED, marginBottom: 10, letterSpacing: 0.3,
};
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

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  const [time,       setTime]      = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [done,       setDone]      = useState(false);
  const [submitted,  setSubmitted] = useState(false);
  const [scrollPct,  setScrollPct] = useState(0);
  const [venueY,     setVenueY]    = useState(0);
  const venueRef = useRef<HTMLElement>(null);
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
      form: {
        name: "Hari",
        phone: "9876543210",
        attending: "yes",
        guests: "4",
        events: ["day1"],
        emotional: "both",
        mood: "all",
        note: "ABC",
        advice: "DEF",
      },
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

      {/* ══ SCROLL PROGRESS BAR ═════════════════════════════════════════════ */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 999,
        height: 3, width: `${scrollPct}%`,
        background: `linear-gradient(to right, ${GOLD}, ${MAROON})`,
        transition: "width 0.1s linear",
        pointerEvents: "none",
      }} />


      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ ...WRAP, textAlign: "center", paddingTop: 80, paddingBottom: 52 }}>

        {/* Ganesh — floats */}
        <div className="hi">
          <img
            src={GANESH_IMG}
            alt="Shri Ganesh"
            style={{
              width: 130, height: 130, objectFit: "contain",
              margin: "0 auto 18px",
              animation: "float-ganesh 3.8s ease-in-out infinite",
            }}
          />
        </div>

        {/* Sanskrit shloka */}
        <div className="hi">
          <p style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "clamp(13px, 2.6vw, 16px)",
            color: TMED, lineHeight: 2, marginBottom: 24,
          }}>
           அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை <br/>
           பண்பும் பயனும் அது.
          </p>
        </div>

        {/* Intro */}
        <div className="hi">
          <p style={{
            fontFamily: "'Cormorant Garant', serif",
            fontStyle: "italic",
            fontSize: "clamp(14px, 2.8vw, 18px)",
            color: TMED, lineHeight: 2,
            maxWidth: 540, margin: "0 auto 40px",
          }}>
            With the blessings of the Almighty &amp; our respected elders,<br />
            we joyfully request your gracious presence on the<br />
            wedding celebration of
          </p>
        </div>

        {/* Groom */}
        <div className="hi">
          <h1 className="name-glow" style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(48px, 8vw, 80px);",
            fontWeight: 400, color: MAROON, lineHeight: 1, margin: 0,
          }}>
            Harikrishnan
          </h1>
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 13, color: TMED, lineHeight: 2.2, marginTop: 6,
          }}>
            Son of <strong>Mr. K.A.Thirupathi &amp; Mrs. T.Poongodi</strong><br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              Grandson of Annamalai-Jayalakshmi &amp; Annamalai-Saroja
            </span>
          </p>
        </div>

        {/* Ampersand divider */}
        <div className="hi" style={{ margin: "22px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div style={{ height: 1, flex: 1, maxWidth: 80, background: `linear-gradient(to right, transparent, ${GOLD})` }} />
            <span style={{
              color: MAROON, fontSize: 30,
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
            fontSize: "clamp(48px, 8vw, 80px);",
            fontWeight: 400, color: MAROON, lineHeight: 1, margin: 0,
          }}>
            Dhanalakshmi
          </h1>
          <p style={{
            fontFamily: "'Lato', sans-serif",
            fontSize: 13, color: TMED, lineHeight: 2.2, marginTop: 6,
          }}>
            Daughter of <strong>Mr. S.Venkatasalam &amp; Mrs. V.Rani</strong><br />
            <span style={{ fontSize: 12, opacity: 0.7 }}>
              Granddaughter of Sundara Moorthi - Rajalakshmi &amp; Annamalai - Kanagammal
            </span>
          </p>
        </div>

        {/* Date box */}
        <div className="hi" style={{ marginTop: 44 }}>
          <div className="date-box" style={{
            display: "inline-block",
            border: `1px solid ${GOLD}`,
            borderRadius: 12,
            padding: "24px 48px",
            background: `${GOLD}09`,
          }}>
            <p style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(20px, 4vw, 28px)",
              fontWeight: 600, color: MAROON,
              marginBottom: 12, letterSpacing: "0.05em",
            }}>
              Wednesday · 24 June 2026
            </p>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 13, color: TMED, lineHeight: 2,
            }}>
              Srinivasa Mandabam<br />
              Thammampatti
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))",
            gap: 14,
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="reveal hover-lift"
              style={{
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 4,
                padding: "8px 8px 28px",
                boxShadow: "0 3px 14px rgba(44,32,21,0.07)",
                cursor: "default",
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              <div style={{
                background: CREAM2,
                borderRadius: 2,
                aspectRatio: "4/5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}>
                <span style={{ fontSize: 30, opacity: 0.35 }}>📷</span>
                <span style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: 10, color: TMED,
                  letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.6,
                }}>
                  Add Photo
                </span>
              </div>
            </div>
          ))}
        </div>
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
            <div style={{ overflow: "hidden", height: 290 }}>
              <img
                src={VENUE_IMG}
                alt="Srinivasa Mandapam"
                style={{
                  width: "100%", height: 320, objectFit: "cover",
                  transform: `translateY(${venueY}px)`,
                  willChange: "transform",
                }}
              />
            </div>
            <div style={{ padding: "30px 36px", textAlign: "center" }}>
              <h3 style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: 28, fontWeight: 600, color: MAROON, marginBottom: 8,
              }}>
                Srinivasa Mandapam
              </h3>
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 14, color: TMED, lineHeight: 2, marginBottom: 24,
              }}>
                Udayarpalayam, Thammampatti<br />
                Salem 
              </p>
              <a
                href="https://maps.app.goo.gl/TmqPPJ9rDaq2NxAEA?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn-gold">📍 Get Directions</button>
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
        <SectionHead
          title="Join the Celebration"
          sub="Celebrate With Us"
          sub2="A few fun questions before the big day!"
        />

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
            style={{
              background: WHITE, border: `1px solid ${BORDER}`,
              borderRadius: 20, padding: "36px 32px",
              boxShadow: "0 4px 28px rgba(44,32,21,0.08)",
              display: "flex", flexDirection: "column", gap: 30,
            }}
          >

            {/* ─ Guest Details ─ */}
            <div>
              <p style={secLabel}>Guest Details</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input
                  required
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => sf("name", e.target.value)}
                  style={inputCss}
                />
                <input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={e => sf("phone", e.target.value)}
                  style={inputCss}
                />
                <div>
                  <p style={fldLabel}>Will you join us?</p>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {[
                      { val: "yes", lbl: "Joyfully Accept 🎉" },
                      { val: "no",  lbl: "Regrettably Decline" },
                    ].map(o => (
                      <label key={o.val} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        cursor: "pointer",
                        fontFamily: "'Lato', sans-serif", fontSize: 14, color: TMED,
                      }}>
                        <input
                          type="radio" name="attending" value={o.val}
                          checked={form.attending === o.val}
                          onChange={() => sf("attending", o.val)}
                          style={{ accentColor: GOLD, width: 16, height: 16 }}
                        />
                        {o.lbl}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─ Party Size ─ */}
            <div>
              <p style={secLabel}>Party Size</p>
              <p style={fldLabel}>Including yourself, how many guests?</p>
              <select value={form.guests} onChange={e => sf("guests", e.target.value)} style={inputCss}>
                <option value="1">1 (Just me)</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6+">6+ Guests</option>
              </select>
            </div>

            {/* ─ Events ─ */}
            <div>
              <p style={secLabel}>Events You&apos;ll Attend</p>
              <p style={fldLabel}>Select the days you will be joining us</p>
              {[
                { id: "day1", lbl: "Day 1: Pre-Wedding Festivities", sub: "Monday, 23th June 2026" },
                { id: "day2", lbl: "Day 2: Wedding Day",             sub: "Tuesday, 24th June 2026" },
              ].map(ev => (
                <label key={ev.id} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  marginBottom: 12, cursor: "pointer",
                }}>
                  <input
                    type="checkbox"
                    checked={form.events.includes(ev.id)}
                    onChange={() => tog(ev.id)}
                    style={{ accentColor: GOLD, width: 16, height: 16, marginTop: 2, flexShrink: 0 }}
                  />
                  <div>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: TEXT, marginBottom: 2 }}>
                      {ev.lbl}
                    </p>
                    <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: TMED }}>
                      {ev.sub}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            {/* ─ Emotional guess ─ */}
            <div>
              <p style={secLabel}>Make a Guess</p>
              <p style={fldLabel}>Who will get emotional first?</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                {[
                  { val: "Hari", lbl: "A: Hari" },
                  { val: "Dhana", lbl: "B: Dhana" },
                  { val: "both",   lbl: "Both" },
                ].map(o => (
                  <button
                    key={o.val} type="button"
                    onClick={() => sf("emotional", o.val)}
                    className={`pill${form.emotional === o.val ? " active" : ""}`}
                  >
                    {o.lbl}
                  </button>
                ))}
              </div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: TMED, fontStyle: "italic" }}>
                Reveal after the wedding 😉
              </p>
            </div>

            {/* ─ Mood ─ */}
            <div>
              <p style={secLabel}>Your Wedding Mood</p>
              <p style={fldLabel}>I&apos;m coming for...</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { val: "food",  lbl: "The Food 🍛" },
                  { val: "dance", lbl: "Dance Floor 💃" },
                  { val: "love",  lbl: "The Love ❤️" },
                  { val: "all",   lbl: "All of It ✨" },
                ].map(o => (
                  <button
                    key={o.val} type="button"
                    onClick={() => sf("mood", o.val)}
                    className={`pill${form.mood === o.val ? " active" : ""}`}
                  >
                    {o.lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* ─ Note ─ */}
            <div>
              <p style={secLabel}>Leave Us a Note</p>
              <p style={fldLabel}>Share a wish or memory.</p>
              <textarea
                placeholder="✍️ Write something beautiful..."
                value={form.note}
                onChange={e => sf("note", e.target.value)}
                rows={3}
                style={{ ...inputCss, resize: "vertical" }}
              />
              <p style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: 11, color: GOLD_D, marginTop: 5,
              }}>
                🔥 This becomes a digital memory book.
              </p>
            </div>

            {/* ─ Advice ─ */}
            <div>
              <p style={secLabel}>Words for Forever</p>
              <p style={fldLabel}>Advice for married life.</p>
              <textarea
                placeholder="Share your wisdom with the couple..."
                value={form.advice}
                onChange={e => sf("advice", e.target.value)}
                rows={3}
                style={{ ...inputCss, resize: "vertical" }}
              />
            </div>

            {/* ─ Submit ─ */}
            <button
              type="submit"
              style={{
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD_D})`,
                color: WHITE, border: "none",
                borderRadius: 12, padding: "18px",
                fontFamily: "'Cormorant Garant', serif",
                fontWeight: 600, fontSize: 22,
                letterSpacing: "0.06em", cursor: "pointer",
                transition: "opacity 0.2s, transform 0.15s",
              }}
              onClick={handleSubmit}
              onMouseEnter={e => { (e.target as HTMLElement).style.opacity = "0.88"; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.opacity = "1"; }}
            >
              Send Love · Hari &amp; Dhana ♥
            </button>

          </form>
        )}
      </section>

      <HRule />

      {/* ══ WITH COMPLIMENTS FROM ════════════════════════════════════════════ */}
      <section style={WRAP}>
        <SectionHead title="With Compliments From" />
        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {COMPLIMENTS.map((name, i) => (
            <div
              key={name}
              className="reveal hover-lift"
              style={{
                background: WHITE, border: `1px solid ${BORDER}`,
                borderRadius: 12, padding: "18px 28px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(44,32,21,0.05)",
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: 19, fontWeight: 600, color: MAROON,
              }}>
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <HRule />

      {/* ══ RSVP CONTACTS ═══════════════════════════════════════════════════ */}
      <section style={{ ...WRAP, textAlign: "center" }}>
        <SectionHead title="RSVP" />
        <div
          className="reveal-right hover-lift"
          style={{
            background: WHITE, border: `1px solid ${BORDER}`,
            borderRadius: 20, padding: "36px 32px",
            boxShadow: "0 4px 24px rgba(44,32,21,0.08)",
          }}
        >
          {[
            "Dr. Shri Bhagwan & Dr. Asha Gupta",
            "Siddhant & Tanu Gupta",
            "Srishti Gupta",
          ].map((n, i, arr) => (
            <div
              key={n}
              style={{
                paddingBottom: 16, marginBottom: 16,
                borderBottom: i < arr.length - 1 ? `1px solid ${BORDER}` : "none",
              }}
            >
              <p style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: 19, fontWeight: 600, color: MAROON,
              }}>
                {n}
              </p>
            </div>
          ))}

          <div style={{ marginTop: 8 }}>
            <p style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: 30, color: GOLD_D, marginBottom: 4,
            }}>
              Avyukt &amp; Advait
            </p>
            <p style={{
              fontFamily: "'Cormorant Garant', serif",
              fontStyle: "italic", fontSize: 15, color: TMED, marginBottom: 22,
            }}>
              &ldquo;Mere Chacha ki Shaadi mein Jalool Jalool aana&rdquo;
            </p>
            <p style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 13, color: TMED, letterSpacing: 0.4,
            }}>
              23-24 June, Tue-Wed 2026 · Srinivasa Mandabam, Thammampatti
            </p>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{
        textAlign: "center",
        padding: "40px 20px 56px",
        borderTop: `1px solid ${BORDER}`,
      }}>
        <p style={{
          fontFamily: "'Great Vibes', cursive",
          fontSize: 46, color: MAROON, marginBottom: 6,
        }}>
          Thank You!
        </p>
        <p style={{
          fontFamily: "'Cormorant Garant', serif",
          fontStyle: "italic", fontSize: 17, color: TMED, marginBottom: 24,
        }}>
          We can&apos;t wait to celebrate with you!
        </p>
      </footer>

    </main>
  );
}
