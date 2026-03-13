import React, { useEffect, useRef, useState } from 'react';

// Files served from /public
const vaultImg      = '/vault_fulle.png';
const vaultLockImg  = '/vault-lock.png';
const xenithLogo    = '/xenith_logo.png';
const lockClickSfx  = '/lock-click.mp3';
const doorCreakSfx  = '/door-creak.wav';
const logoWhooshSfx = '/logo-whoosh.mp3';

export default function VaultPreloader({ onComplete }) {
  const [hintVisible, setHintVisible] = useState(true);
  const hasStarted = useRef(false);

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
    lockSoundRef.current = new Audio(lockClickSfx);
    doorSoundRef.current = new Audio(doorCreakSfx);
    logoSoundRef.current = new Audio(logoWhooshSfx);
  }, []);

  const handleClick = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    setHintVisible(false);

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

      // Exact replica of index.html GSAP timeline
      // Locks spin — rotate only the inner img so container translate is untouched
      tl
        .to(lock1Ref.current.querySelector('img'), {
          rotation: -720, duration: 2.0, ease: 'power2.inOut', onStart: playLock,
        })
        .to(lock2Ref.current.querySelector('img'), {
          rotation: -720, duration: 2.0, ease: 'power2.inOut', onStart: playLock,
        }, '-=0.8')
        .to(lock3Ref.current.querySelector('img'), {
          rotation: -720, duration: 2.0, ease: 'power2.inOut', onStart: playLock,
        }, '-=0.8')

        // All lock containers shrink + fade after spins
        .to([lock1Ref.current, lock2Ref.current, lock3Ref.current], {
          opacity: 0, scale: 0.3, duration: 0.6, ease: 'back.in(4)',
        }, '+=0.1')

        .add('open', '-=0.2')

        // Fogs fade
        .to(fog1Ref.current, { opacity: 0, duration: 1 }, 'open')
        .to(fog2Ref.current, { opacity: 0, duration: 1 }, 'open')

        // Row 1
        .to(row1LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open')
        .to(row1RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open')

        // Row 2 — 1s after open
        .to(row2LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open+=1.0')
        .to(row2RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open+=1.0')

        // Row 3 — 2s after open
        .to(row3LeftRef.current,  { x: '-100%', duration: 2.8, ease: 'power2.inOut', onStart: playDoor }, 'open+=2.0')
        .to(row3RightRef.current, { x:  '100%', duration: 2.8, ease: 'power2.inOut' }, 'open+=2.0')

        // Logo zoom out
        .to(logoRef.current, {
          scale: 60, opacity: 0, duration: 3.5,
          ease: 'power2.in', filter: 'blur(12px)', onStart: playLogoZoom,
        })

        // Preloader fade
        .to(preloaderRef.current, { opacity: 0, duration: 1 }, '-=1.5')

        .call(() => {
          preloaderRef.current.style.display = 'none';
          if (onComplete) onComplete();
        });
    };

    if (window.gsap) {
      run(window.gsap);
    } else {
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
          letterSpacing: '3px', textTransform: 'uppercase', fontSize: '16px',
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

        {/* Blue fog 1 */}
        <div ref={fog1Ref} style={{
          position: 'absolute', top: '-200px', left: '-200px',
          width: '600px', height: '600px', pointerEvents: 'none', zIndex: 12,
          background: 'radial-gradient(circle at top left, rgba(40,90,200,0.8) 0%, rgba(25,60,140,0.6) 30%, rgba(15,35,90,0.4) 55%, transparent 75%)',
          filter: 'blur(120px)', animation: 'xv-fogLeft 18s linear infinite',
        }} />

        {/* Blue fog 2 */}
        <div ref={fog2Ref} style={{
          position: 'absolute', bottom: '-200px', right: '-200px',
          width: '600px', height: '600px', pointerEvents: 'none', zIndex: 12,
          background: 'radial-gradient(circle at bottom right, rgba(30,70,180,0.8) 0%, rgba(20,50,130,0.6) 30%, rgba(10,25,80,0.4) 55%, transparent 75%)',
          filter: 'blur(120px)', animation: 'xv-fogRight 20s linear infinite',
        }} />

        {/* Logo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2,
        }}>
          <img ref={logoRef} src={xenithLogo} alt="Xenith Logo" style={{ width: '220px' }} />
        </div>

        {/* Vault rows */}
        {[
          { id: 'row1', leftRef: row1LeftRef, rightRef: row1RightRef, lockRef: lock1Ref, posY: 'top' },
          { id: 'row2', leftRef: row2LeftRef, rightRef: row2RightRef, lockRef: lock2Ref, posY: 'center' },
          { id: 'row3', leftRef: row3LeftRef, rightRef: row3RightRef, lockRef: lock3Ref, posY: 'bottom' },
        ].map(({ id, leftRef, rightRef, lockRef, posY }) => (
          <div key={id} style={{
            flex: 1, display: 'flex', position: 'relative', zIndex: 10, overflow: 'hidden',
          }}>
            <div ref={leftRef} style={{
              flex: 1, backgroundImage: `url(${vaultImg})`,
              backgroundSize: '100vw 100vh', backgroundRepeat: 'no-repeat',
              backgroundPositionX: 'left', backgroundPositionY: posY,
            }} />

            <div ref={lockRef} style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '160px', height: '160px', zIndex: 20,
            }}>
              <img src={vaultLockImg} alt="lock" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            <div ref={rightRef} style={{
              flex: 1, backgroundImage: `url(${vaultImg})`,
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