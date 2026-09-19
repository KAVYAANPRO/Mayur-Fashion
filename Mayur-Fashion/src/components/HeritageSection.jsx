import React from 'react';
import { COMPANY_INFO } from '../data/company';

export default function HeritageSection() {
  const milestones = [
    {
      year: "1991",
      title: "The Entrepreneurial Genesis",
      desc: "Mr. Manohar Peswani established Manohar Dresses and launched the iconic label 'MAYUR' in Ahmedabad with a dedicated promise: 'We Care What You Wear'."
    },
    {
      year: "2000",
      title: "Wholesale & Ready-to-Wear Expansion",
      desc: "Pioneered specialized 3-Piece Kurti Ensembles, Anarkalis, and complete size grading from M to 6XL for boutiques across Western & Northern India."
    },
    {
      year: "2008",
      title: "Sarangpur Textile Market Hub",
      desc: "Established state-of-the-art showrooms in Safal 3 Market and VIP Commercial Complex in Sarangpur, becoming a cornerstone for Indian ethnic wholesalers."
    },
    {
      year: "2026",
      title: "Global Reach & Size Inclusivity",
      desc: "Now serving over 15,000+ retail partners and exporting to 30+ nations worldwide, leading the ethnic fashion industry."
    }
  ];

  return (
    <section id="heritage" className="section" style={{ background: '#EDEBE6', position: 'relative', borderBottom: '1px solid #ECE5CE' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-title-wrap">
          <div className="section-tag fly-in-left">
            <span>35+ Years of Craftsmanship</span>
          </div>
          <h2 className="section-title fly-in-left delay-1">
            The Manohar Legacy & Mayur Heritage
          </h2>
          <p className="section-subtitle fly-in-right delay-2">
            Rooted in Ahmedabad, Gujarat—India's textile capital—we have shaped traditional elegance into modern wearability since 1991.
          </p>
        </div>

        {/* Two-Column Story Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center',
          marginBottom: '50px'
        }} className="heritage-grid">
          
          {/* Left Column: Visual Collage (Flies in from Left Wall) */}
          <div className="fly-in-left delay-2" style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.08)',
              border: '2px solid #ECE5CE',
              aspectRatio: '4/3',
              background: '#ffffff'
            }}>
              <img
                src="/assets/catalog/page_1.webp"
                alt="Mayur Heritage and Founders"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Overlapping Badge */}
            <div 
              className="heritage-badge"
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                background: '#EF233C',
                color: '#ffffff',
                padding: '16px 22px',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(239, 35, 60, 0.35)',
                border: '2px solid #EDEBE6',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div 
                className="heritage-badge-year"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: '#EDEBE6',
                  lineHeight: 1
                }}
              >
                1991
              </div>
              <div style={{ fontSize: '0.78rem', lineHeight: 1.3, fontWeight: 600 }}>
                Crafting Excellence<br />
                <strong>For Over 35 Years</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Story (Flies in from Right Wall) */}
          <div className="fly-in-right delay-2">
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
              color: '#1c1917',
              lineHeight: 1.3,
              marginBottom: '16px'
            }}>
              "Over more than three decades, the passion and dedication that inspired our foundation have remained unchanged."
            </h3>

            {COMPANY_INFO.story.paragraphs.map((para, idx) => (
              <p key={idx} style={{
                fontSize: '0.94rem',
                color: '#5e5750',
                lineHeight: 1.65,
                marginBottom: '14px'
              }}>
                {para}
              </p>
            ))}

            <div style={{
              marginTop: '20px',
              paddingTop: '18px',
              borderTop: '1px solid #ECE5CE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, color: '#1c1917', fontSize: '1rem' }}>
                  Mr. Manohar Peswani
                </div>
                <div style={{ fontSize: '0.8rem', color: '#EF233C', fontWeight: 600 }}>
                  Founder, Manohar Dresses & Mayur Fashion
                </div>
              </div>
              <img
                src="/assets/logo/mayur-official-circle.png"
                alt="Official Seal"
                style={{ width: '44px', height: '44px', borderRadius: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Timeline Cards (Left 2 fly from left, Right 2 fly from right) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px'
        }} className="milestones-grid">
          {milestones.map((m, idx) => {
            const flyClass = idx < 2 ? 'fly-in-left' : 'fly-in-right';
            const delayClass = `delay-${idx < 2 ? idx + 1 : 4 - idx}`;
            return (
              <div
                key={idx}
                className={`luxury-card ${flyClass} ${delayClass}`}
                style={{
                  padding: '24px 20px',
                  background: '#ffffff',
                  borderColor: '#ECE5CE',
                  position: 'relative'
                }}
              >
                <div style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: '1.65rem',
                  fontWeight: 800,
                  color: '#EF233C',
                  marginBottom: '8px'
                }}>
                  {m.year}
                </div>
                <h4 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.05rem',
                  color: '#1c1917',
                  marginBottom: '6px',
                  fontWeight: 700
                }}>
                  {m.title}
                </h4>
                <p style={{
                  fontSize: '0.84rem',
                  color: '#5e5750',
                  lineHeight: 1.5
                }}>
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>


      <style>{`
        @media (max-width: 992px) {
          .heritage-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
          .milestones-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .heritage-badge {
            bottom: -15px !important;
            right: 12px !important;
            padding: 10px 14px !important;
          }
          .heritage-badge-year {
            font-size: 1.5rem !important;
          }
          .milestones-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

