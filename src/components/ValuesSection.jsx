import React from 'react';
import { ShieldCheck, Leaf, Sparkles, HeartHandshake, Star, Quote } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Leaf: Leaf,
  Sparkles: Sparkles,
  HeartHandshake: HeartHandshake
};

export default function ValuesSection() {
  return (
    <section id="values" className="section" style={{ background: '#EDEBE6', borderBottom: '1px solid #ECE5CE' }}>
      <div className="container">
        {/* Section Title */}
        <div className="section-title-wrap">
          <div className="section-tag sage fly-in-left">
            <span>Our Guiding Principles</span>
          </div>
          <h2 className="section-title fly-in-left delay-1">
            Why 15,000+ Retailers Choose Mayur
          </h2>
          <p className="section-subtitle fly-in-right delay-2">
            Our values are the heartbeat of our brand—a mosaic of principles that echo through every stitch, fabric selection, and partnership.
          </p>
        </div>

        {/* 4 Core Pillars Grid (Left 2 fly from left wall, Right 2 fly from right wall) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '80px'
        }} className="values-grid">
          {COMPANY_INFO.values.map((v, idx) => {
            const IconComp = iconMap[v.icon] || ShieldCheck;
            const flyClass = idx < 2 ? 'fly-in-left' : 'fly-in-right';
            const delayClass = `delay-${idx < 2 ? idx + 1 : 4 - idx}`;
            return (
              <div
                key={v.id}
                className={`luxury-card ${flyClass} ${delayClass}`}
                style={{
                  padding: '32px 24px',
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  borderColor: '#ECE5CE'
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #EF233C, #b81427)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 8px 20px rgba(239, 35, 60, 0.25)'
                }}>
                  <IconComp size={28} />
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.25rem',
                  color: '#1c1917',
                  marginBottom: '10px',
                  fontWeight: 700
                }}>
                  {v.title}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: '#5e5750',
                  lineHeight: 1.6
                }}>
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonials Banner */}
        <div 
          className="fly-in-up delay-2"
          style={{
            background: 'linear-gradient(135deg, #181516 0%, #241e20 100%)',
            borderRadius: '28px',
            padding: '60px 48px',
            color: '#ffffff',
            position: 'relative',
            border: '1px solid rgba(242, 188, 182, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 40px auto' }}>
            <span style={{
              color: '#F2BCB6',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase'
            }}>
              Retailer & Wholesale Testimonials
            </span>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2rem',
              color: '#ffffff',
              marginTop: '6px'
            }}>
              Trusted Across India & Overseas
            </h3>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px'
          }} className="testimonials-grid">
            {COMPANY_INFO.testimonials.map((t, idx) => {
              const flyClass = idx % 2 === 0 ? 'fly-in-left' : 'fly-in-right';
              return (
                <div
                  key={idx}
                  className={`${flyClass} delay-3`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(200, 214, 191, 0.2)',
                    borderRadius: '20px',
                    padding: '28px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#EF233C" color="#EF233C" />
                      ))}
                    </div>

                    <p style={{
                      fontSize: '0.96rem',
                      color: '#EDEBE6',
                      lineHeight: 1.65,
                      fontStyle: 'italic',
                      marginBottom: '20px'
                    }}>
                      "{t.quote}"
                    </p>
                  </div>

                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#F2BCB6', fontSize: '0.95rem' }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#a8a29e' }}>
                        {t.business}
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.72rem',
                      background: 'rgba(200, 214, 191, 0.18)',
                      color: '#C8D6BF',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {t.city}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      <style>{`
        @media (max-width: 992px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .testimonials-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 576px) {
          .values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
