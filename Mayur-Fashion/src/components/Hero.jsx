import React from 'react';
import { Sparkles, ArrowRight, BookOpen, ShieldCheck, Globe, Users, Award, MessageCircle, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function Hero({ onExploreClick, onLookbookClick }) {
  const highlights = [
    { icon: Sparkles, text: "100% Pure Silks & Chanderi" },
    { icon: Award, text: "Artisanal Zardozi & Hand Embroidery" },
    { icon: ShieldCheck, text: "Complete Size Grading (M to 5XL)" },
    { icon: Globe, text: "Global Wholesale Export to 30+ Nations" }
  ];

  return (
    <section 
      id="hero" 
      style={{ 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#EDEBE6', 
        padding: '75px 0 65px 0',
        borderBottom: '1px solid #ECE5CE'
      }}
    >
      {/* Background Ambient Color Radial Accents from the Palette */}
      <div style={{
        position: 'absolute',
        top: '-180px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '850px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse at center, rgba(242, 188, 182, 0.35) 0%, rgba(200, 214, 191, 0.2) 45%, rgba(237, 235, 230, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-120px',
        right: '-80px',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200, 214, 191, 0.3) 0%, rgba(237, 235, 230, 0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-100px',
        left: '-100px',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(239, 35, 60, 0.08) 0%, rgba(237, 235, 230, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Editorial Text-Centric Content (No Image Column) */}
        <div style={{
          maxWidth: '920px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          {/* Top Brand Badge */}
          <div 
            className="hero-morph-left"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 20px',
              background: '#ECE5CE',
              color: '#EF233C',
              border: '1px solid #C8D6BF',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '24px',
              boxShadow: '0 2px 10px rgba(200, 214, 191, 0.4)',
              animationDelay: '0.06s'
            }}
          >
            <Sparkles size={15} color="#EF233C" />
            <span>Manohar Dresses • Estd. 1991 • Brand Mayur™</span>
          </div>

          {/* Main Hero Headline: Left and Right Half Morph Entrance */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.8rem, 5.5vw, 4.6rem)',
            lineHeight: 1.14,
            color: '#1c1917',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '22px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: '0.35em',
            rowGap: '0.1em'
          }}>
            <span 
              className="hero-morph-left" 
              style={{ display: 'inline-block', animationDelay: '0.14s' }}
            >
              We Care
            </span>
            <span 
              className="hero-morph-right" 
              style={{ display: 'inline-block', animationDelay: '0.22s', color: 'var(--primary)' }}
            >
              What You Wear
            </span>
          </h1>

          {/* Editorial Subtitle: Left & Right Half Morphing */}
          <p style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            lineHeight: 1.7,
            color: '#5e5750',
            maxWidth: '820px',
            marginBottom: '32px',
            fontWeight: 400
          }}>
            <span 
              className="hero-morph-left" 
              style={{ display: 'inline', animationDelay: '0.28s' }}
            >
              From timeless classics to modern trends, explore our diverse collection and elevate your wardrobe today.
            </span>{' '}
            <span 
              className="hero-morph-right" 
              style={{ display: 'inline', animationDelay: '0.34s' }}
            >
              Meticulously handcrafted in Ahmedabad with pure silks, authentic zardozi embroidery, and complete sizing from <strong style={{ color: '#1c1917' }}>M to 5XL</strong>.
            </span>
          </p>

          {/* Key Feature Highlight Badges (Left half from left, Right half from right) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '38px',
            maxWidth: '820px'
          }}>
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              const isLeftHalf = idx < 2;
              const animClass = isLeftHalf ? 'hero-morph-left' : 'hero-morph-right';
              const delay = isLeftHalf 
                ? (idx === 0 ? '0.38s' : '0.46s') 
                : (idx === 2 ? '0.40s' : '0.48s');

              return (
                <div
                  key={idx}
                  className={animClass}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    background: '#ffffff',
                    border: '1px solid #ECE5CE',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#1c1917',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                    animationDelay: delay
                  }}
                >
                  <Icon size={15} color="#EF233C" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>

          {/* Prominent CTAs (Left buttons from Left, Right WhatsApp from Right) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '55px'
          }}>
            <button 
              onClick={onExploreClick}
              className="btn btn-primary hero-morph-left"
              style={{ fontSize: '1.02rem', padding: '15px 34px', animationDelay: '0.52s' }}
            >
              <span>Explore 2026 Collection</span>
              <ArrowRight size={18} />
            </button>

            <button 
              onClick={onLookbookClick}
              className="btn btn-sage hero-morph-left"
              style={{ fontSize: '1.02rem', padding: '15px 30px', animationDelay: '0.58s' }}
            >
              <BookOpen size={18} />
              <span>Digital Lookbook</span>
            </button>

            <a 
              href={`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion! I would like to request your wholesale price list and catalog sets.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp hero-morph-right"
              style={{ fontSize: '1.02rem', padding: '15px 30px', animationDelay: '0.54s' }}
            >
              <MessageCircle size={18} />
              <span>Wholesale Inquiry</span>
            </a>
          </div>
        </div>

        {/* Bottom Trust & Statistics Strip (Left 2 stats from Left, Right 2 stats from Right) */}
        <div style={{
          padding: '28px 32px',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #ECE5CE',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          maxWidth: '1120px',
          margin: '0 auto'
        }} className="stats-grid">
          {COMPANY_INFO.stats.map((stat, i) => {
            const isLeft = i < 2;
            const animClass = isLeft ? 'hero-morph-left' : 'hero-morph-right';
            const delay = isLeft ? (i === 0 ? '0.62s' : '0.70s') : (i === 2 ? '0.64s' : '0.72s');

            return (
              <div 
                key={i} 
                className={animClass}
                style={{ 
                  textAlign: 'center', 
                  borderRight: i < 3 ? '1px solid #ECE5CE' : 'none',
                  padding: '4px 12px',
                  animationDelay: delay
                }}
              >
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '2.1rem',
                  fontWeight: 700,
                  color: '#EF233C',
                  lineHeight: 1.1
                }}>
                  {stat.value}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#1c1917', marginTop: '4px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#5e5750' }}>
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
        }
        @media (max-width: 576px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid > div {
            border-right: none !important;
            border-bottom: 1px solid #ECE5CE;
            padding-bottom: 14px;
          }
          .stats-grid > div:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </section>
  );
}
