import React, { useState } from "react";
import "./themes.css";

/* ===============================
   THEMES DATA
================================ */
const themesData = [
  {
    id: 1,
    title: "EdTech",
    tagline: "Innovate solutions to transform learning",
    description: "Build technology-driven solutions that improve education, learning experiences, accessibility, and skill development.",
    icon: "📘",
    variant: "theme-card--shadow",
   
  },
  {
    id: 2,
    title: "Blockchain & Web3",
    tagline: "Innovate with blockchain and Web3 technologies",
    description: "Create decentralized applications, smart contracts, secure systems, and next-generation Web3 solutions.",
    icon: "⛓️",
    variant: "theme-card--crimson",
    
  },
  {
    id: 3,
    title: "HealthTech",
    tagline: "Wellness Through Technology",
    description: "Develop innovative solutions for healthcare, fitness, mental well-being, diagnostics, and medical accessibility.",
    icon: "🩺",
    variant: "",
   
  },
  {
    id: 4,
    title: "Sustainability",
    tagline: "Create tech for a sustainable planet",
    description: "Design solutions focused on climate action, renewable energy, waste management, and environmental protection.",
    icon: "🌱",
    variant: "theme-card--shadow",
   
  },
  {
    id: 5,
    title: "Open Innovation",
    tagline: "Explore ideas beyond boundaries",
    description: "Work on any innovative idea that does not fit into other categories. Creativity and originality are encouraged.",
    icon: "✨",
    variant: "theme-card--crimson",
   
  }
];

/* ===============================
   SUB-COMPONENT: THEME CARD
================================ */
const ThemeCard = ({ theme }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`theme-card ${theme.variant} ${isFlipped ? 'is-flipped' : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className="theme-card__inner">
        {/* FAN FRONT */}
        <div className="theme-card__fan"></div>

        {/* BACK: ORIGINAL CARD */}
        <div className="theme-card__back">
          <div
            className="theme-card__bg"
            style={{ backgroundImage: `url(${theme.bgImage})` }}
          ></div>

          <div className="theme-card__icon">{theme.icon}</div>

          <div className="theme-card__content">
            <h3 className="theme-card__heading">
              {theme.title} <span style={{ color: "#b3001b" }}>影</span>
            </h3>
            <p className="theme-card__desc">{theme.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===============================
   MAIN COMPONENT
================================ */
const Themes = () => {
  return (
    <section className="themes" id="themes">
      <div className="themes__header">
        <h2 className="themes__title">
          Hackathon Themes
        </h2>
      </div>
<div className="themes__mobile-instruction">
          <span className="tech-bracket">{'<'}</span>
          <span className="glitch-text">TAP TO DECRYPT</span>
          <span className="tech-bracket">{'>'}</span>
        </div>
        
      <div className="themes__grid">
        {themesData.map((theme) => (
          <ThemeCard key={theme.id} theme={theme} />
        ))}
      </div>
    </section>
  );
};

export default Themes;