import React from 'react';
import { Phone, Mail, MapPin, Globe, ArrowUp } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

export default function Footer({ onNavigate }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#181516', color: '#ffffff', borderTop: '2px solid rgba(239, 35, 60, 0.3)', position: 'relative' }}>
      {/* Decorative Ribbon with all 5 palette colors */}
      <div style={{
        background: 'linear-gradient(90deg, #EF233C 0%, #F2BCB6 25%, #C8D6BF 50%, #ECE5CE 75%, #EF233C 100%)',
        height: '4px',
        width: '100%'
      }} />

      <div className="container" style={{ padding: '60px 20px 36px 20px', overflow: 'hidden' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.9fr 0.9fr 1.2fr',
          gap: '36px',
          marginBottom: '40px'
        }} className="footer-grid">
          
          {/* Column 1: Brand & Slogan (Flies in from Left Wall) */}
          <div className="fly-in-left delay-1">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <img
                src="/assets/logo/mayur-official-brand-logo-white.png"
                alt="Mayur Fashion - Manohar Dresses"
                className="footer-logo"
                style={{
                  height: '52px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>

            <p style={{ fontSize: '0.86rem', color: '#C8D6BF', lineHeight: 1.6, marginBottom: '18px', maxWidth: '360px' }}>
              Premier manufacturer & wholesale supplier of women's ethnic wear in Ahmedabad. Specialized in Kurti 3-Piece Sets, Anarkalis, Shararas, and Co-ord sets (Sizes M to 6XL).
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F2BCB6',
                  border: '1px solid rgba(242, 188, 182, 0.3)'
                }}
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.contacts[0].people[0].whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(37, 211, 102, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#25d366',
                  border: '1px solid rgba(37, 211, 102, 0.3)'
                }}
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} color="#25d366" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (Flies in from Left Wall) */}
          <div className="fly-in-left delay-2">
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              color: '#EDEBE6',
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
              {['Home', 'Collections', 'Digital Lookbook', 'Heritage & Story', 'Why Mayur', 'B2B Wholesale'].map((item, idx) => {
                const idMap = {
                  'Home': 'hero',
                  'Collections': 'collections',
                  'Digital Lookbook': 'lookbook',
                  'Heritage & Story': 'heritage',
                  'Why Mayur': 'values',
                  'B2B Wholesale': 'wholesale'
                };
                return (
                  <li key={idx}>
                    <button
                      onClick={() => onNavigate && onNavigate(idMap[item])}
                      style={{ color: '#C8D6BF', textAlign: 'left', padding: '3px 0' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#EF233C'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#C8D6BF'}
                    >
                      {item}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Categories & Sizes (Flies in from Right Wall) */}
          <div className="fly-in-right delay-2">
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              color: '#EDEBE6',
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: '#C8D6BF' }}>
              <li>Kurti 3-Piece Sets</li>
              <li>Anarkali & Sharara Gowns</li>
              <li>Co-ord & Afghani Sets</li>
              <li>Pure Chanderi & Dola Silk</li>
              <li>Festive Lucknowi Chikankari</li>
              <li style={{ color: '#F2BCB6', fontWeight: 600 }}>Sizes: M to 6XL Complete Grading</li>
            </ul>
          </div>

          {/* Column 4: Contact & Showrooms (Flies in from Right Wall) */}
          <div className="fly-in-right delay-1">
            <h4 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.1rem',
              color: '#EDEBE6',
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Direct Contacts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#C8D6BF' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={17} color="#EF233C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Safal 3 Market & VIP Market, Sarangpur, Ahmedabad, Gujarat 380001</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={15} color="#EF233C" style={{ flexShrink: 0 }} />
                <span>+91 99788 31115 / +91 98253 43225</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={15} color="#EF233C" style={{ flexShrink: 0 }} />
                <span>mayurfashion1991@gmail.com</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Globe size={15} color="#EF233C" style={{ flexShrink: 0 }} />
                <span>www.mayurfashion.co.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div 
          className="fly-in-up delay-3"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.8rem',
            color: '#a8a29e'
          }}
        >
          <div>
            © 1991 – {new Date().getFullYear()} <strong>Manohar Dresses / Mayur Fashion</strong>. All Rights Reserved. "We Care What You Wear"
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#EDEBE6',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid rgba(200, 214, 191, 0.3)',
              fontSize: '0.78rem',
              fontWeight: 600
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>


      <style>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .footer-logo {
            height: 42px !important;
          }
        }
      `}</style>
    </footer>
  );
}

