import React from 'react';
import { Award, Clock, History, CheckCircle2, Sparkles, Building, Globe } from 'lucide-react';
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
      desc: "Pioneered specialized 3-Piece Kurti Ensembles, Anarkalis, and complete size grading from M to 5XL for boutiques across Western & Northern India."
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
          <div className="section-tag">
            <History size={14} color="#EF233C" />
            <span>35+ Years of Craftsmanship</span>
          </div>
          <h2 className="section-title">
            The Manohar Legacy & Mayur Heritage
          </h2>
          <p className="section-subtitle">
            Rooted in Ahmedabad, Gujarat—India's textile capital—we have shaped traditional elegance into modern wearability since 1991.
          </p>
        </div>

        {/* Two-Column Story Showcase */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '50px',
          alignItems: 'center',
          marginBottom: '60px'
        }} className="heritage-grid">
          
          {/* Left Column: Visual Collage */}
          <div style={{ position: 'relative' }}>
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
            <div style={{
              position: 'absolute',
              bottom: '-25px',
              right: '25px',
              background: '#EF233C',
              color: '#ffffff',
              padding: '18px 24px',
              borderRadius: '16px',
              boxShadow: '0 12px 30px rgba(239, 35, 60, 0.35)',
              border: '2px solid #EDEBE6',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '2.2rem',
                fontWeight: 800,
                color: '#EDEBE6',
                lineHeight: 1
              }}>
                1991
              </div>
              <div style={{ fontSize: '0.8rem', lineHeight: 1.3, fontWeight: 600 }}>
                Crafting Excellence<br />
                <strong>For Over 35 Years</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Founder's Story */}
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.85rem',
              color: '#1c1917',
              lineHeight: 1.3,
              marginBottom: '20px'
            }}>
              "Over more than three decades, the passion and dedication that inspired our foundation have remained unchanged."
            </h3>

            {COMPANY_INFO.story.paragraphs.map((para, idx) => (
              <p key={idx} style={{
                fontSize: '0.98rem',
                color: '#5e5750',
                lineHeight: 1.7,
                marginBottom: '16px'
              }}>
                {para}
              </p>
            ))}

            <div style={{
              marginTop: '25px',
              paddingTop: '20px',
              borderTop: '1px solid #ECE5CE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontWeight: 700, color: '#1c1917', fontSize: '1.05rem' }}>
                  Mr. Manohar Peswani
                </div>
                <div style={{ fontSize: '0.82rem', color: '#EF233C', fontWeight: 600 }}>
                  Founder, Manohar Dresses & Mayur Fashion
                </div>
              </div>
              <img
                src="/assets/logo/mayur-official-circle.png"
                alt="Official Seal"
                style={{ width: '48px', height: '48px', borderRadius: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Milestone Timeline Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px'
        }} className="milestones-grid">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="luxury-card"
              style={{
                padding: '28px 22px',
                background: '#ffffff',
                borderColor: '#ECE5CE',
                position: 'relative'
              }}
            >
              <div style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.8rem',
                fontWeight: 800,
                color: '#EF233C',
                marginBottom: '10px'
              }}>
                {m.year}
              </div>
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.1rem',
                color: '#1c1917',
                marginBottom: '8px',
                fontWeight: 700
              }}>
                {m.title}
              </h4>
              <p style={{
                fontSize: '0.85rem',
                color: '#5e5750',
                lineHeight: 1.55
              }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .heritage-grid {
            grid-template-columns: 1fr !important;
          }
          .milestones-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 576px) {
          .milestones-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
