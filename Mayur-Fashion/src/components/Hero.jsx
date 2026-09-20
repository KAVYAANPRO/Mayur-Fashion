import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';

export default function Hero({ onExploreClick, onLookbookClick }) {
  const videoRef   = useRef(null);
  const [muted, setMuted]       = useState(true);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoType, setVideoType] = useState('');
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
        if (data.companyVideoUrl) {
          setVideoUrl(data.companyVideoUrl);
          setVideoType(data.companyVideoType || 'direct');
        }
      } catch {
        /* silently ignore */
      }
    })();
  }, []);

  /* ── Toggle sound (only works for direct <video> tags, not iframes easily) ── */
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  const hasVideo = !!videoUrl;

  // Colors switch based on whether there is a background video or not
  const textColorPrimary = hasVideo ? '#ffffff' : '#1c1917';
  const textColorSecondary = hasVideo ? 'rgba(255,255,255,0.82)' : '#5e5750';
  const badgeBg = hasVideo ? 'rgba(255,255,255,0.10)' : '#ECE5CE';
  const badgeBorder = hasVideo ? 'rgba(255,255,255,0.20)' : '#C8D6BF';
  const badgeText = hasVideo ? '#F2BCB6' : '#EF233C';
  const highlightBg = hasVideo ? 'rgba(255,255,255,0.10)' : '#ffffff';
  const highlightBorder = hasVideo ? 'rgba(255,255,255,0.20)' : '#ECE5CE';
  const highlightText = hasVideo ? '#ffffff' : '#1c1917';
  const statsBg = hasVideo ? 'rgba(255,255,255,0.08)' : '#ffffff';
  const statsBorder = hasVideo ? 'rgba(255,255,255,0.15)' : '#ECE5CE';
  const statsLabel = hasVideo ? '#ffffff' : '#1c1917';
  const statsSub = hasVideo ? 'rgba(255,255,255,0.6)' : '#5e5750';
  const textShadow = hasVideo ? '0 2px 20px rgba(0,0,0,0.4)' : 'none';
  const textShadowSub = hasVideo ? '0 1px 6px rgba(0,0,0,0.3)' : 'none';
  const lookbookBtnBg = hasVideo ? 'rgba(255,255,255,0.12)' : 'transparent';
  const lookbookBtnText = hasVideo ? '#ffffff' : '#1c1917';
  const lookbookBtnBorder = hasVideo ? '1px solid rgba(255,255,255,0.3)' : '1px solid #C8D6BF';

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: hasVideo ? '100vh' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: hasVideo ? '#000' : '#EDEBE6',
        padding: hasVideo ? '0' : '75px 0 65px 0',
        borderBottom: hasVideo ? 'none' : '1px solid #ECE5CE'
      }}
    >
      {/* ── Background Ambient Color Radial Accents (ONLY if NO video) ── */}
      {!hasVideo && (
        <>
          <div style={{
            position: 'absolute', top: '-180px', left: '50%', transform: 'translateX(-50%)',
            width: '850px', height: '550px', borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(242, 188, 182, 0.35) 0%, rgba(200, 214, 191, 0.2) 45%, rgba(237, 235, 230, 0) 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: '-120px', right: '-80px',
            width: '500px', height: '500px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200, 214, 191, 0.3) 0%, rgba(237, 235, 230, 0) 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', bottom: '-100px', left: '-100px',
            width: '450px', height: '450px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239, 35, 60, 0.08) 0%, rgba(237, 235, 230, 0) 70%)',
            pointerEvents: 'none'
          }} />
        </>
      )}

      {/* ── Full-screen background video ─────────────────────── */}
      {hasVideo && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          {videoType === 'youtube' ? (
            <iframe
              src={`${videoUrl}?autoplay=1&mute=1&controls=0&showinfo=0&autohide=1&loop=1&playlist=${videoUrl.split('embed/')[1] || ''}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              onLoad={() => setVideoReady(true)}
              style={{
                width: '100vw',
                height: '56.25vw', /* 16:9 aspect ratio */
                minHeight: '100vh',
                minWidth: '177.77vh', /* 16:9 aspect ratio */
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: videoReady ? 1 : 0,
                transition: 'opacity 1s ease',
              }}
            />
          ) : videoType === 'vimeo' ? (
            <iframe
              src={`${videoUrl}?background=1&autoplay=1&loop=1&byline=0&title=0`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              onLoad={() => setVideoReady(true)}
              style={{
                width: '100vw',
                height: '56.25vw',
                minHeight: '100vh',
                minWidth: '177.77vh',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: videoReady ? 1 : 0,
                transition: 'opacity 1s ease',
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              muted
              loop
              playsInline
              onCanPlay={() => setVideoReady(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: videoReady ? 1 : 0,
                transition: 'opacity 1s ease',
              }}
            />
          )}
        </div>
      )}

      {/* ── Dark gradient overlay (only if video) ─────── */}
      {hasVideo && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(to bottom, rgba(15,10,10,0.60) 0%, rgba(15,10,10,0.50) 60%, rgba(15,10,10,0.75) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* ── Main content ─────────────────────────────────────── */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: hasVideo ? '100px 20px 48px 20px' : '0 20px',
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
              background: badgeBg,
              color: badgeText,
              border: `1px solid ${badgeBorder}`,
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '24px',
              backdropFilter: hasVideo ? 'blur(6px)' : 'none',
              boxShadow: hasVideo ? 'none' : '0 2px 10px rgba(200, 214, 191, 0.4)',
              animationDelay: '0.06s',
            }}
          >
            Manohar Dresses • Estd. 1991 • Brand Mayur™
          </div>

          {/* Main headline */}
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
              color: textColorPrimary,
              textShadow: textShadow,
            }}
          >
            <span className="hero-morph-left" style={{ display: 'inline-block', animationDelay: '0.14s' }}>
              We Care
            </span>
            <span
              className="hero-morph-right"
              style={{ display: 'inline-block', animationDelay: '0.22s', color: '#EF233C', textShadow: hasVideo ? '0 0 40px rgba(239,35,60,0.5)' : 'none' }}
            >
              What You Wear
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
              lineHeight: 1.7,
              color: textColorSecondary,
              maxWidth: '820px',
              marginBottom: '32px',
              fontWeight: 400,
              textShadow: textShadowSub,
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
                    background: highlightBg,
                    border: `1px solid ${highlightBorder}`,
                    backdropFilter: hasVideo ? 'blur(6px)' : 'none',
                    boxShadow: hasVideo ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.03)',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: highlightText,
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
              marginBottom: '48px',
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
                background: lookbookBtnBg,
                color: lookbookBtnText,
                border: lookbookBtnBorder,
                backdropFilter: hasVideo ? 'blur(6px)' : 'none',
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

        {/* Stats strip */}
        <div
          style={{
            padding: '24px 28px',
            background: statsBg,
            backdropFilter: hasVideo ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: hasVideo ? 'blur(16px)' : 'none',
            borderRadius: '24px',
            border: `1px solid ${statsBorder}`,
            boxShadow: hasVideo ? '0 8px 40px rgba(0,0,0,0.3)' : '0 8px 30px rgba(0, 0, 0, 0.04)',
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
                  borderRight: i < 3 ? `1px solid ${statsBorder}` : 'none',
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
                  textShadow: hasVideo ? '0 0 20px rgba(239,35,60,0.4)' : 'none',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.86rem', color: statsLabel, marginTop: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.76rem', color: statsSub }}>
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
          .stats-grid > div:nth-child(odd) { border-right: 1px solid ${statsBorder} !important; }
        }
      `}</style>
    </section>
  );
}
