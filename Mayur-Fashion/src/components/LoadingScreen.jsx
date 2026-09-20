import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Keep loading animation visible for smooth UX (min 1.5s), then fade out smoothly
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 600); // 600ms fade duration
      return () => clearTimeout(removeTimer);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        backgroundColor: '#181516',
        backgroundImage: 'radial-gradient(circle at center, #241e20 0%, #100e0f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        transform: isFadingOut ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'all',
        padding: '24px'
      }}
      aria-label="Loading Mayur Fashion"
    >
      {/* Outer Shimmer / Pulse Container */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Soft Glowing Backlight */}
        <div
          style={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239, 35, 60, 0.35) 0%, rgba(239, 35, 60, 0) 70%)',
            animation: 'pulseGlow 2s infinite ease-in-out',
            filter: 'blur(10px)',
            zIndex: 0
          }}
        />

        {/* Brand Logo */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginBottom: '28px',
            animation: 'logoMorph 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <img
            src="/assets/logo/mayur-official-brand-logo-white.png"
            alt="Mayur Fashion Logo"
            style={{
              maxHeight: '75px',
              maxWidth: '260px',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 15px rgba(239, 35, 60, 0.4))'
            }}
          />
        </div>

        {/* Luxury Animated Progress Ring & Bar */}
        <div
          style={{
            width: '200px',
            height: '3px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            borderRadius: '99px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '20px',
            zIndex: 1
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              background: 'linear-gradient(90deg, #EF233C, #F2BCB6, #25D366, #EF233C)',
              backgroundSize: '200% 100%',
              borderRadius: '99px',
              animation: 'loadingProgress 1.6s ease-in-out infinite'
            }}
          />
        </div>

        {/* Subtitle & Est 1991 */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.85)'
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel', 'Playfair Display', serif",
              fontSize: '0.85rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              margin: '0 0 6px 0',
              color: '#F2BCB6',
              fontWeight: 600
            }}
          >
            Crafting Timeless Ethnic Wear
          </p>
          <p
            style={{
              fontSize: '0.74rem',
              letterSpacing: '0.15em',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            AHMEDABAD • EST. 1991
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 0.95; }
        }
        @keyframes logoMorph {
          0% { opacity: 0; transform: scale(0.88) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes loadingProgress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
