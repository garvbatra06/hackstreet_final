import React, { useEffect, useRef, useState } from 'react';

// Files served from /public
const vaultImg      = '/vault_full46.jpeg';
const vaultImgPhone = '/preloader_phone.jpeg';
const vaultLockImg  = '/vault-lock-1.png';
const xenithLogo    = '/xenith_logo.png';
const lockClickSfx  = '/lock-click.mp3';
const doorCreakSfx  = '/door-creak.wav';
const logoWhooshSfx = '/logo-whoosh.mp3';

export default function VaultPreloader({ onComplete }) {
  const [hintVisible, setHintVisible] = useState(true);
  const hasStarted = useRef(false);

  // FIX (medium): moved mobile detection inside component to avoid SSR mismatch
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const bgImg    = isMobile ? vaultImgPhone : vaultImg;
  const lockSize = isMobile ? '130px' : '140px';
  const lockLeft = isMobile ? '50.6%' : '49.23%';

  // Element refs
  const preloaderRef  = useRef(null);
  const lock1Ref      = useRef(null);
  const lock2Ref      = useRef(null);
  const lock3Ref      = useRef(null);
  const row1LeftRef   = useRef(null);
  const row1RightRef  = useRef(null);
  const row2LeftRef   = useRef(null);
  const row2RightRef  = useRef(null);
  const row3LeftRef   = useRef(null);
  const row3RightRef  = useRef(null);
  const fog1Ref       = useRef(null);
  const fog2Ref       = useRef(null);
  const logoRef       = useRef(null);

  // Sound refs
  const lockSoundRef  = useRef(null);
  const doorSoundRef  = useRef(null);
  const logoSoundRef  = useRef(null);

  useEffect(() => {
    // FIX (high): preload images immediately so they're ready before the user clicks
    [vaultImg, vaultImgPhone, vaultLockImg, xenithLogo].forEach(src => {
      const img = new Image();
      img.src = src;
    });

    // FIX (high): create audio objects AND call .load() so the browser
    // fetches the audio files right away instead of waiting for first click
    lockSoundRef.current = new Audio(lockClickSfx);
    lockSoundRef.current.load();

    doorSoundRef.current = new Audio(doorCreakSfx);
    doorSoundRef.current.load();

    logoSoundRef.current = new Audio(logoWhooshSfx);
    logoSoundRef.current.load();
  }, []);

  // FIX (medium): promote animated elements to GPU layers before any interaction
  // so the browser doesn't need to do it mid-animation
  useEffect(() => {
    const rows = [
      row1LeftRef, row1RightRef,
      row2LeftRef, row2RightRef,
      row3LeftRef, row3RightRef,
    ];
    rows.forEach(ref => {
      if (ref.current) ref.current.style.willChange = 'transform';
    });
    [lock1Ref, lock2Ref, lock3Ref].forEach(ref => {
      if (ref.current) ref.current.style.willChange = 'transform, opacity';
    });
    if (logoRef.current) {
      // FIX (medium): pre-declare will-change for logo so GPU layer is ready
      logoRef.current.style.willChange = 'transform, opacity';
    }
  }, []);

  const handleClick = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setHintVisible(false);

    // FIX (high): GSAP is now expected to be loaded via a <script> tag in
    // index.html (see note below). No more dynamic injection on click.
    // Fallback retained for safety but should never be hit in production.
    const run = (gsap) => {
      const playLock = () => {
        setTimeout(() => {
          lockSoundRef.current.currentTime = 0;
          lockSoundRef.current.play().catch(() => {});
        }, 150);
      };
      const playDoor = () => {
        doorSoundRef.current.currentTime = 0;
        doorSoundRef.current.play().catch(() => {});
      };
      const playLogoZoom = () => {
        logoSoundRef.current.currentTime = 0;
        logoSoundRef.current.play().catch(() => {});
      };

      const tl = gsap.timeline();

      tl
      .to(lock1Ref.current, {
        rotation: -720,
        duration: 2.0,
        ease: 'power2.inOut',
        onStart: playLock,
      })
      .to(lock2Ref.current, {
        rotation: -720,
        duration: 2.0,
        ease: 'power2.inOut',
        onStart: playLock,
      })
      .to(lock3Ref.current, {
        rotation: -720,
        duration: 2.0,
        ease: 'power2.inOut',
        onStart: playLock,
      })

        .to([lock1Ref.current, lock2Ref.current, lock3Ref.current], {
          opacity: 0, scale: 0.7, duration: 0.6, ease: 'back.in(4)',
        }, '+=0.1')

        .add('open', '-=0.2')

        .to(fog1Ref.current, { opacity: 0, duration: 1 }, 'open')
        .to(fog2Ref.current, { opacity: 0, duration: 1 }, 'open')

        .to(row2LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open')
        .to(row2RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open')

        .to(row1LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open+=1.0')
        .to(row1RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open+=1.0')
        .to(row3LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open+=1.0')
        .to(row3RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open+=1.0')

        // FIX (medium): reduced scale from 60 → 10 to avoid massive GPU texture
        // allocation on mobile. Combined with opacity fade, the effect is identical
        // to the user but far cheaper to composite.
        // FIX (medium): removed filter:blur() — it triggers a full raster repaint
        // every frame. Opacity alone is sufficient and GPU-composited.
        .to(logoRef.current, {
          scale: 10, opacity: 0, duration: 3.5,
          ease: 'power2.in', onStart: playLogoZoom,
        })

        .to(preloaderRef.current, { opacity: 0, duration: 1 }, '-=1.5')

        .call(() => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
            preloaderRef.current.style.cursor = 'default'; // FIX (low): cleanup cursor
          }
          // FIX (low): release will-change hints after animation completes
          // so the browser can free up the GPU layers
          [
            row1LeftRef, row1RightRef, row2LeftRef, row2RightRef,
            row3LeftRef, row3RightRef, lock1Ref, lock2Ref, lock3Ref, logoRef,
          ].forEach(ref => {
            if (ref.current) ref.current.style.willChange = 'auto';
          });
          if (onComplete) onComplete();
        });
    };

    if (window.gsap) {
      run(window.gsap);
    } else {
      // Fallback: should not be reached if GSAP is preloaded in index.html
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.onload = () => run(window.gsap);
      document.head.appendChild(script);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        overflow: 'hidden', backgroundColor: '#000', cursor: 'pointer', zIndex: 10000,
      }}
    >
      {/* Red radial glow */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5,
        background: 'radial-gradient(circle at center, rgba(255,0,0,0.12) 0%, rgba(255,0,0,0.08) 30%, rgba(255,0,0,0.04) 55%, transparent 75%)',
      }} />

      {/* Click hint */}
      {hintVisible && (
        <div style={{
          position: 'fixed', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(255,255,255,0.85)', fontFamily: 'sans-serif',
          letterSpacing: '3px', textTransform: 'uppercase', fontSize: '10px',
          zIndex: 10001, animation: 'xv-heartbeat 1.2s ease-in-out infinite',
          pointerEvents: 'none',
        }}>
          Tap to Unlock the Vault
        </div>
      )}

      {/* Preloader */}
      <div ref={preloaderRef} style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Logo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2,
        }}>
          <img ref={logoRef} src={xenithLogo} alt="Xenith Logo" style={{ width: '220px' }} />
        </div>

        {/* Vault rows */}
        {[
          { id: 'row1', leftRef: row1LeftRef, rightRef: row1RightRef, lockRef: lock1Ref, posY: 'top',    lockTop: '50%' },
          { id: 'row2', leftRef: row2LeftRef, rightRef: row2RightRef, lockRef: lock2Ref, posY: 'center', lockTop: '45%' },
          { id: 'row3', leftRef: row3LeftRef, rightRef: row3RightRef, lockRef: lock3Ref, posY: 'bottom', lockTop: '50%' },
        ].map(({ id, leftRef, rightRef, lockRef, posY, lockTop }) => (
          <div key={id} style={{
            flex: 1, display: 'flex', position: 'relative', zIndex: 10, overflow: 'hidden',
          }}>
            <div ref={leftRef} style={{
              flex: 1, backgroundImage: `url(${bgImg})`,
              backgroundSize: '100vw 100vh', backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'left', backgroundPositionY: posY,
            }} />

            <div ref={lockRef} style={{
              position: 'absolute', left: lockLeft, top: lockTop,
              transform: 'translate(-50%, -50%)',
              width: lockSize, height: lockSize, zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={vaultLockImg} alt="lock" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>

            <div ref={rightRef} style={{
              flex: 1, backgroundImage: `url(${bgImg})`,
              backgroundSize: '100vw 100vh', backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'right', backgroundPositionY: posY,
            }} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes xv-heartbeat {
          0%   { transform: translate(-50%, -50%) scale(1); }
          50%  { transform: translate(-50%, -50%) scale(1.08); }
          100% { transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes xv-fogLeft {
          0%   { transform: translate(0px, 0px); opacity: 0.9; }
          100% { transform: translate(500px, 300px); opacity: 0.8; }
        }
        @keyframes xv-fogRight {
          0%   { transform: translate(0px, 0px); opacity: 0.9; }
          100% { transform: translate(-500px, -300px); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

/*
 * ─── REQUIRED: add these two lines to your public/index.html <head> ───────────
 *
 * <link rel="preload" as="script" href="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js">
 * <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" defer></script>
 *
 * This ensures GSAP is downloaded and parsed before the user ever clicks,
 * eliminating the network-wait lag on first interaction.
 * ─────────────────────────────────────────────────────────────────────────────
 */