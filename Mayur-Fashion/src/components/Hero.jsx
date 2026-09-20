import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';

export default function Hero({ onExploreClick, onLookbookClick }) {
  const videoRef   = useRef(null);
  const [muted, setMuted]       = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoReady, setVideoReady] = useState(false);

  const highlights = [
    "Wide Range of premium fabrics",
    "Exquisite Craftsmanship on every fabric",
    "Styles for every woman and every occasion",
    "A favorite fashion brand Across India",
  ];

  /* ── Fetch company video URL from site settings ── */
  useEffect(() => {
    (async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res  = await fetch(`${apiUrl}/api/settings`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.companyVideoUrl) setVideoUrl(data.companyVideoUrl);
      } catch {
        /* silently fall back to gradient background */
      }
    })();
  }, []);

  /* ── Toggle sound ── */
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        /* Fallback gradient when no video */
        background: 'linear-gradient(135deg, #1c1917 0%, #2d1f22 50%, #1a1214 100%)',
      }}
    >
      {/* ── Full-screen background video ─────────────────────── */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 1s ease',
          }}
        />
      )}

      {/* ── Dark gradient overlay so text stays readable ─────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: videoUrl
            ? 'linear-gradient(to bottom, rgba(15,10,10,0.60) 0%, rgba(15,10,10,0.50) 60%, rgba(15,10,10,0.75) 100%)'
            : 'linear-gradient(135deg, rgba(239,35,60,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Mute / Unmute toggle (only when video is playing) ─── */}
      {videoUrl && videoReady && (
        <button
          onClick={toggleMute}
          title={muted ? 'Unmute video' : 'Mute video'}
          style={{
            position: 'absolute',
            bottom: '160px',
            right: '28px',
            zIndex: 10,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}

      {/* ── Main content ─────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '100px 20px 48px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '920px',
            width: '100%',
            margin: '0 auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Brand badge */}
          <div
            className="hero-morph-left"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '7px 22px',
              background: 'rgba(255,255,255,0.10)',
              color: '#F2BCB6',
              border: '1px solid rgba(255,255,255,0.20)',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '24px',
              backdropFilter: 'blur(6px)',
              animationDelay: '0.06s',
            }}
          >
            Manohar Dresses • Estd. 1991 • Brand Mayur™
          </div>

          {/* Main headline — white + red accent */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
              lineHeight: 1.14,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '22px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: '0.35em',
              rowGap: '0.1em',
              color: '#ffffff',
              textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            }}
          >
            <span className="hero-morph-left" style={{ display: 'inline-block', animationDelay: '0.14s' }}>
              We Care
            </span>
            <span
              className="hero-morph-right"
              style={{ display: 'inline-block', animationDelay: '0.22s', color: '#EF233C', textShadow: '0 0 40px rgba(239,35,60,0.5)' }}
            >
              What You Wear
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)',
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.82)',
              maxWidth: '720px',
              marginBottom: '32px',
              fontWeight: 400,
              textShadow: '0 1px 6px rgba(0,0,0,0.3)',
            }}
          >
            <span className="hero-morph-left" style={{ display: 'inline', animationDelay: '0.28s' }}>
              The Fast-Moving Indian Wear Partner for Retailers Across India.
            </span>{' '}
            <span className="hero-morph-right" style={{ display: 'inline', animationDelay: '0.34s' }}>
              We turn emerging trends into quality-crafted Indian wear, combining exceptional design, premium fabrics,
              perfect fits, competitive pricing, and reliable service.
            </span>
          </p>

          {/* Highlight badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '38px',
              maxWidth: '820px',
            }}
          >
            {highlights.map((item, idx) => {
              const isLeft = idx < 2;
              const animClass = isLeft ? 'hero-morph-left' : 'hero-morph-right';
              const delay = isLeft ? (idx === 0 ? '0.38s' : '0.46s') : (idx === 2 ? '0.40s' : '0.48s');
              return (
                <div
                  key={idx}
                  className={`${animClass} highlight-badge`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '8px 20px',
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.20)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    animationDelay: delay,
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>

          {/* CTA buttons */}
          <div
            className="hero-cta-group"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '56px',
              width: '100%',
            }}
          >
            <button
              onClick={onExploreClick}
              className="btn btn-primary hero-morph-left"
              style={{ fontSize: '1rem', padding: '14px 28px', animationDelay: '0.52s' }}
            >
              <span>Explore 2026 Collection</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onLookbookClick}
              className="btn hero-morph-left"
              style={{
                fontSize: '1rem',
                padding: '14px 26px',
                animationDelay: '0.58s',
                background: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.3)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <span>Digital Lookbook</span>
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent(
                'Hello Mayur Fashion! I would like to request your wholesale price list and catalog sets.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp hero-morph-right"
              style={{
                fontSize: '1rem',
                padding: '14px 26px',
                animationDelay: '0.54s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <WhatsAppIcon size={20} color="#ffffff" />
              <span>Wholesale Inquiry</span>
            </a>
          </div>
        </div>

        {/* Stats strip — glassmorphism card at bottom */}
        <div
          style={{
            padding: '24px 28px',
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            maxWidth: '1120px',
            width: '100%',
            margin: '0 auto',
          }}
          className="stats-grid"
        >
          {COMPANY_INFO.stats.map((stat, i) => {
            const isLeft  = i < 2;
            const animClass = isLeft ? 'hero-morph-left' : 'hero-morph-right';
            const delay  = isLeft ? (i === 0 ? '0.62s' : '0.70s') : (i === 2 ? '0.64s' : '0.72s');
            return (
              <div
                key={i}
                className={animClass}
                style={{
                  textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                  padding: '4px 8px',
                  animationDelay: delay,
                }}
              >
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#EF233C',
                  lineHeight: 1.1,
                  textShadow: '0 0 20px rgba(239,35,60,0.4)',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#ffffff', marginTop: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.6)' }}>
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
        }
        @media (max-width: 640px) {
          .hero-cta-group { flex-direction: column !important; gap: 10px !important; }
          .hero-cta-group .btn { width: 100% !important; justify-content: center !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 16px 12px !important; gap: 12px !important; }
          .stats-grid > div { border-right: none !important; padding: 6px 4px !important; }
          .stats-grid > div:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.12) !important; }
        }
      `}</style>
    </section>
  );
}
