import React, { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import VaultPreloader from './components/Vaultpreloader';
import Landing from './Landing';

const Petals = lazy(() => import('./components/Petals'));
const CursorSparkle = lazy(() => import('./components/CursorSparkle'));

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Lock scroll while preloader is active
  useEffect(() => {
    if (!preloaderDone) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [preloaderDone]);

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
      {/* Custom cursor — always on top */}
      <Suspense fallback={null}>
        <CursorSparkle />
      </Suspense>

      {/* Vault preloader — sits on top of everything until dismissed */}
      {!preloaderDone && (
        <VaultPreloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Particles — only after preloader */}
      {preloaderDone && (
        <Suspense fallback={null}>
          <Petals />
        </Suspense>
      )}

      {/* Tint */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-[15]" />

      {/* Landing — always mounted, loads in background during preloader */}
      <Landing />
    </div>
  );
}

export default App;