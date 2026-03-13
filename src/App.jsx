import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Landing from './Landing';
import Petals from './components/Petals';
import VaultPreloader from './components/Vaultpreloader';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    if (!preloaderDone) return;

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
  }, [preloaderDone]);

  return (
    <div className="w-full relative">
      {/* Vault preloader — sits on top of everything until dismissed */}
      {!preloaderDone && (
        <VaultPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Layer 1: Particles */}
      <Petals />

      {/* Layer 2: Tint */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[15]" />

      {/* Layer 3: The Main Parallax Page */}
      <Landing />
    </div>
  );
}

export default App;
