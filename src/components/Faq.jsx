import { useState } from "react";

const faqs = [
  {
    q: "Who can participate in HackStreet?",
    a: "HackStreet is open to all college students. You can participate individually or as a team of up to 4 members. Beginners and experienced hackers alike are welcome!",
  },
  {
    q: "Is there a registration fee?",
    a: "No! HackStreet is completely free to participate in. Just register before 28th February and you're all set.",
  },
  {
    q: "What should I bring to the hackathon?",
    a: "Bring your laptop, charger, and any hardware you plan to use. We'll provide food, internet, and a high-energy environment to fuel your creativity.",
  },
  {
    q: "Can I start working on my project before the hackathon?",
    a: "No pre-built projects are allowed. All code must be written during the hacking period. You may use open-source libraries and publicly available APIs.",
  },
  {
    q: "How will projects be judged?",
    a: "Projects are evaluated on innovation, technical complexity, real-world impact, design, and presentation. Both the mid and final evaluation scores contribute.",
  },
  {
    q: "What themes can I build on?",
    a: "You may build on any of the announced themes. Cross-theme projects that blend multiple domains are encouraged — creativity has no bounds!",
  },
  {
    q: "Will there be mentors available?",
    a: "Yes! Industry mentors will be present throughout the event to guide you. Don't hesitate to reach out — they're there to help you level up.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Text:ital,wght@0,400;1,400&display=swap');

        .faq-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8vh 4vw 10vh;
          overflow: hidden;
        }

        /* ── Background image ── */
        .faq-bg {
          position: absolute;
          inset: 0;
          background-image: url('/bg_faqs.jpeg');
          background-size: cover;
          background-position: center top;
          z-index: 0;
        }

        /* dark vignette so scroll pops */
        .faq-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse at 50% 50%, rgba(0,5,20,0.25) 0%, rgba(0,5,20,0.65) 100%),
            linear-gradient(to bottom, rgba(0,5,20,0.3) 0%, rgba(0,5,20,0.15) 40%, rgba(0,5,20,0.5) 100%);
        }

        /* soft moonlight glow on the scroll */
        .faq-moon-glow {
          position: absolute;
          width: 700px; height: 700px;
          top: 8%; left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(180,210,255,0.07) 0%, transparent 65%);
          pointer-events: none;
          z-index: 1;
        }

        .faq-title-wrap {
          position: relative;
          z-index: 10;
          text-align: center;
          margin-bottom: 44px;
        }

        .faq-title {
          font-family: 'Cinzel', serif;
          font-size: clamp(26px, 4.5vw, 52px);
          font-weight: 900;
          letter-spacing: 0.22em;
          color: #fff;
          text-transform: uppercase;
          text-shadow:
            0 0 20px rgba(192,57,43,0.7),
            0 0 60px rgba(192,57,43,0.25),
            0 2px 8px rgba(0,0,0,0.9);
        }

        .faq-title-sub {
          display: block;
          font-family: serif;
          font-size: clamp(12px, 1.4vw, 17px);
          letter-spacing: 0.55em;
          color: rgba(220,160,120,0.8);
          margin-top: 6px;
          text-shadow: 0 1px 6px rgba(0,0,0,0.8);
        }

        .faq-title-rule {
          width: 110px; height: 2px;
          margin: 12px auto 0;
          background: linear-gradient(90deg, transparent, rgba(192,57,43,0.9), transparent);
          box-shadow: 0 0 12px rgba(192,57,43,0.5);
        }

        /* ── THE ONE BIG SCROLL ── */
        .faq-scroll-wrap {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 860px;
          /* soft drop shadow so scroll lifts off the bg */
          filter: drop-shadow(0 8px 40px rgba(0,0,0,0.7)) drop-shadow(0 2px 12px rgba(0,0,0,0.5));
        }

        .faq-scroll-bg {
          position: relative;
          width: 100%;
          background-image: url('/scrollvid_00449.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        /* natural aspect ratio spacer */
        .faq-scroll-bg::before {
          content: '';
          display: block;
          padding-top: 46%;
          min-height: 340px;
        }

        /* parchment content zone — inside the wooden rods + curled edges */
        .faq-parchment {
          position: absolute;
          top: 18%;
          bottom: 18%;
          left: 11%;
          right: 11%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }

        .faq-row {
          border-bottom: 1px solid rgba(90,45,10,0.28);
          cursor: pointer;
          transition: background 0.18s;
        }
        .faq-row:last-child { border-bottom: none; }
        .faq-row:hover { background: rgba(160,110,50,0.09); }

        .faq-q-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          gap: 10px;
          user-select: none;
        }

        .faq-q-text {
          font-family: 'Cinzel', serif;
          font-size: clamp(8.5px, 1.2vw, 12.5px);
          font-weight: 700;
          color: #2b0f02;
          line-height: 1.4;
          flex: 1;
        }

        .faq-chevron {
          color: rgba(140,32,12,0.9);
          font-size: 11px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
          line-height: 1;
        }
        .faq-row.is-open .faq-chevron { transform: rotate(180deg); }

        .faq-ans-wrap {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease;
          opacity: 0;
        }
        .faq-row.is-open .faq-ans-wrap {
          max-height: 140px;
          opacity: 1;
        }

        .faq-ans-body { padding: 0 12px 10px 12px; }

        .faq-ans-rule {
          width: 30px; height: 1px;
          background: rgba(140,32,12,0.45);
          margin-bottom: 5px;
        }

        .faq-a-text {
          font-family: 'Crimson Text', Georgia, serif;
          font-size: clamp(9.5px, 1.15vw, 12.5px);
          font-style: italic;
          color: #4e2005;
          line-height: 1.68;
        }
      `}</style>

      <section className="faq-section">
        {/* bg image + vignette */}
        <div className="faq-bg" />
        <div className="faq-moon-glow" />

        <div className="faq-title-wrap">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <span className="faq-title-sub">よくある質問</span>
          <div className="faq-title-rule" />
        </div>

        {/* THE SCROLL */}
        <div className="faq-scroll-wrap">
          <div className="faq-scroll-bg">
            <div className="faq-parchment">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`faq-row${open === i ? " is-open" : ""}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  role="button"
                  aria-expanded={open === i}
                >
                  <div className="faq-q-row">
                    <span className="faq-q-text">{faq.q}</span>
                    <span className="faq-chevron">▾</span>
                  </div>
                  <div className="faq-ans-wrap">
                    <div className="faq-ans-body">
                      <div className="faq-ans-rule" />
                      <p className="faq-a-text">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}