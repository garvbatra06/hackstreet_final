import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Landing from './Landing';
import Petals from './components/Petals';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="w-full relative">
      {/* Layer 1: Particles */}
      <Petals />

      {/* Layer 2: Tint */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[15]"></div>

      {/* Layer 3: The Main Parallax Page */}
      <Landing />
    </div>
  );
}

export default App;