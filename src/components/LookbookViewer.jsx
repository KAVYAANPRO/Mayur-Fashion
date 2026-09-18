import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';
import { LOOKBOOK_PAGES } from '../data/lookbook';
import { COMPANY_INFO } from '../data/company';

export default function LookbookViewer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const page = LOOKBOOK_PAGES[currentPage];

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % LOOKBOOK_PAGES.length);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + LOOKBOOK_PAGES.length) % LOOKBOOK_PAGES.length);
  };

  return (
    <section id="lookbook" className="section" style={{ background: '#181516', color: '#ffffff', borderBottom: '1px solid #241e20' }}>
      {/* Background ambient lighting */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(239, 35, 60, 0.2) 0%, rgba(24, 21, 22, 0) 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div className="section-title-wrap">
          <div className="section-tag rose" style={{ background: 'rgba(242, 188, 182, 0.15)', color: '#F2BCB6', borderColor: 'rgba(242, 188, 182, 0.3)' }}>
            <span>Official 2026 Brand Catalogue</span>
          </div>
          <h2 className="section-title" style={{ color: '#ffffff' }}>
            Digital Lookbook Experience
          </h2>
          <p className="section-subtitle" style={{ color: '#C8D6BF' }}>
            Browse through the curated 8-page Mayur editorial collection, celebrating traditional textiles, contemporary silhouettes, and 70+ years of heritage.
          </p>
        </div>

        {/* Magazine Spread Display */}
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          background: '#241e20',
          borderRadius: '24px',
          border: '1px solid rgba(200, 214, 191, 0.25)',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
        }}>
          {/* Top Bar of Lookbook */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            background: 'rgba(24, 21, 22, 0.9)',
            borderBottom: '1px solid rgba(200, 214, 191, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{
                background: '#EF233C',
                color: '#ffffff',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700
              }}>
                Page {page.page} of {LOOKBOOK_PAGES.length}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#EDEBE6', fontWeight: 600 }} className="hide-mobile">
                {page.title}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                style={{
                  color: '#C8D6BF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(200, 214, 191, 0.3)'
                }}
              >
                <Maximize2 size={14} />
                <span>{isZoomed ? 'Standard View' : 'Zoom Spread'}</span>
              </button>

              <a
                href="/Photos/FINAL_MAYUR.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Mayur_Fashion_Lookbook.pdf"
                style={{
                  background: 'linear-gradient(135deg, #EF233C, #b81427)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  padding: '6px 14px',
                  borderRadius: '9999px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 10px rgba(239, 35, 60, 0.3)'
                }}
              >
                <Download size={14} />
                <span>PDF Download</span>
              </a>
            </div>
          </div>

          {/* Main Page Canvas */}
          <div style={{ position: 'relative', background: '#0e0c0d', minHeight: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={page.image}
              alt={`Lookbook page ${page.page}: ${page.title}`}
              style={{
                width: '100%',
                maxHeight: isZoomed ? '1000px' : '650px',
                objectFit: 'contain',
                transition: 'all 0.4s ease',
                display: 'block'
              }}
            />

            {/* Left Nav Arrow */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(24, 21, 22, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200, 214, 191, 0.4)',
                color: '#EDEBE6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Previous Lookbook Page"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(24, 21, 22, 0.85)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(200, 214, 191, 0.4)',
                color: '#EDEBE6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Next Lookbook Page"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Page Details Footer */}
          <div style={{
            padding: '20px 24px',
            background: '#241e20',
            borderTop: '1px solid rgba(200, 214, 191, 0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#F2BCB6', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {page.tagline}
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', fontFamily: "'Playfair Display', serif" }}>
                {page.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#C8D6BF', maxWidth: '650px', marginTop: '4px' }}>
                {page.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {page.tags.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#EDEBE6',
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Lookbook Thumbnail Ribbon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '30px',
          overflowX: 'auto',
          paddingBottom: '10px'
        }}>
          {LOOKBOOK_PAGES.map((p, idx) => (
            <button
              key={p.page}
              onClick={() => setCurrentPage(idx)}
              style={{
                width: '70px',
                height: '52px',
                borderRadius: '8px',
                overflow: 'hidden',
                border: currentPage === idx ? '2px solid #EF233C' : '1px solid rgba(200, 214, 191, 0.25)',
                opacity: currentPage === idx ? 1 : 0.45,
                transform: currentPage === idx ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.25s ease',
                flexShrink: 0
              }}
            >
              <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
