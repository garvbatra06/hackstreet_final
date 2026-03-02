import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";

import CountdownTimer from "./components/CountdownTimer";
import SideScrollMenu from "./components/SideScrollMenu";
import Timeline from "./components/Timeline";
import Themes from "./components/Themes"; // Fixed import name (capitalized)

// Timeline data for hackathon schedule
const timelineData = [
  { date: "Until 28th Feb", title: "Registration", description: "Register your team for the hackathon", icon: "📝" },
  { date: "1st March, 12:00 PM", title: "Hacking Period Starts", description: "Begin your innovative journey", icon: "🚀" },
  { date: "1st March, 9:00 PM", title: "Mid Evaluation", description: "Present your progress to the judges", icon: "⚡" },
  { date: "2nd March, 12:00 PM", title: "Hacking Period Ends", description: "Time to wrap up your project", icon: "⏰" },
  { date: "2nd March, 12:00 PM - 1:00 PM", title: "Project Submission", description: "Submit your final project", icon: "📦" },
  { date: "2nd March, 1:00 PM onwards", title: "Final Evaluation", description: "Present your complete project to the judges", icon: "🏆" }
];

function HomeParallax() {
  const parallaxRef = useRef();

  // Scroll handler for the menu
  const scroll = (to) => {
    if (parallaxRef.current) {
      parallaxRef.current.scrollTo(to);
    }
  };

  return (
    <>
      <SideScrollMenu scrollToPage={scroll} />

      {/* INCREASED PAGES FROM 3 TO 4 */}
      <Parallax ref={parallaxRef} pages={4} style={{ background: "#222" }}>

        {/* ==========================
            PAGE 1: SAMURAI HOME (offset 0)
            ========================== */}

        {/* 1. MOUNTAINS (Background) */}
        <ParallaxLayer offset={0} speed={0.2} factor={2} style={{ zIndex: 1 }}>
          <img
            src="/mountain.png"
            className="w-full h-screen object-cover"
            alt="Mountains"
          />
        </ParallaxLayer>

        {/* 2. LOGO */}
        <ParallaxLayer
          offset={0}
          speed={0.2}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '25vh',
            zIndex: 50
          }}
        >
          <img
            src="/logo2.png"
            alt="HackStreet Logo"
            className="w-[80vw] md:w-[50vw] max-w-[600px] opacity-100"
            style={{
              filter: "invert(100%) sepia(100%) saturate(400%) hue-rotate(180deg) brightness(200%) contrast(100%) drop-shadow(0 0 3px rgba(0, 255, 255, 0.8)) drop-shadow(0 0 15px rgba(0, 100, 255, 0.4))"
            }}
          />
        </ParallaxLayer>

        {/* 3. COUNTDOWN TIMER */}
        <ParallaxLayer
          offset={0}
          speed={0.2}
          style={{
            zIndex: 55,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '12vh',
            pointerEvents: 'none'
          }}
        >
          <div style={{ pointerEvents: 'auto', transform: 'scale(0.9)' }}>
            <CountdownTimer />
          </div>
        </ParallaxLayer>

        {/* 4. SUN */}
        <ParallaxLayer offset={0} speed={0} style={{ zIndex: 5 }}>
          <img
            src="/sun.png"
            className="absolute left-1/2 -translate-x-1/2 w-[250px] md:w-[300px]"
            style={{
              top: "10%",
              transform: `translate(-50%, ${parallaxRef.current ? parallaxRef.current.current * 0.3 : 0}px)`
            }}
          />
        </ParallaxLayer>

        {/* 5. FOREGROUND TREES */}
        <ParallaxLayer offset={0} speed={0.3} style={{ zIndex: 20 }}>
          <img
            src="/trees.png"
            className="w-full h-screen object-cover"
            style={{ opacity: 0.8 }}
          />
        </ParallaxLayer>


        {/* ==========================
            PAGE 2: ABOUT SECTION (offset 1)
            ========================== */}

        {/* 6. BACKGROUND SCENERY */}
        <ParallaxLayer offset={1} speed={0.2} style={{ zIndex: 20 }}>
          <div className="relative w-full h-screen">
            <img
              src="/about_bg.png"
              className="w-full h-full object-cover"
              alt="Lake"
            />
          </div>
        </ParallaxLayer>

        {/* 7. FOREGROUND TREES */}
        <ParallaxLayer offset={1} speed={0.6} style={{ zIndex: 40, pointerEvents: 'none' }}>
          <img
            src="/about_trees.png"
            className="w-full h-screen object-cover"
            alt="Trees"
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </ParallaxLayer>

        {/* 8. CONTENT (About Logo) */}
        <ParallaxLayer offset={1} speed={0.4} style={{ zIndex: 30 }}>
          <div
            className="h-full flex flex-col items-center"
            style={{
              justifyContent: 'flex-start',
              paddingTop: '15vh'
            }}
          >
            <img
              src="/ab.png"
              alt="About HackStreet"
              className="w-[80vw] md:w-[40vw] max-w-[600px]"
              style={{
                filter: "invert(0) hue-rotate(0deg) drop-shadow(0 0 0px rgba(0, 0, 0, 0.66))"
              }}
            />
          </div>
        </ParallaxLayer>


        {/* ==========================
            PAGE 3: THEMES SECTION (offset 2) - NEW
            ========================== */}

        {/* Themes Section Background */}
        <ParallaxLayer offset={2} speed={0.4} style={{ zIndex: 30, overflow: 'auto', height: '100vh'}}>
          <div 
            className="w-full h-screen"
            style={{
              background: "linear-gradient(rgba(5, 6, 8, 0.7), rgba(5, 6, 8, 0.9)), url('/images/themes/bgnew.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed"
            }}
          />
        </ParallaxLayer>

        {/* Themes Content */}
        <ParallaxLayer 
          offset={2} 
          speed={0.4} 
          style={{ 
            zIndex: 30,
            overflow: 'auto',
            height: '100vh'
          }}
        >
          <Themes />
        </ParallaxLayer>


        {/* ==========================
            PAGE 4: TIMELINE SECTION (offset 3)
            ========================== */}

        {/* 9. TIMELINE BACKGROUND */}
        <ParallaxLayer offset={3} speed={0.2} style={{ zIndex: 1 }}>
          <img
            src="/Timeline_bg.jpg"
            className="w-full h-screen object-cover"
            alt="Timeline Background"
          />
        </ParallaxLayer>

        {/* 10. TIMELINE CONTENT */}
        <ParallaxLayer 
          offset={3} 
          speed={0.4} 
          style={{ 
            zIndex: 30,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '5vh',
            overflow: 'auto'
          }}
        >
          <Timeline items={timelineData} />
        </ParallaxLayer>

        {/* 11. SUBTLE GOLD GRADIENT OVERLAY */}
        <ParallaxLayer offset={3} speed={0.1} style={{ zIndex: 10, pointerEvents: 'none' }}>
          <div style={{ 
            background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.05))',
            height: '100%' 
          }} />
        </ParallaxLayer>

      </Parallax>
    </>
  );
}

export default HomeParallax;