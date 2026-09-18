import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';

export default function Header({ 
  inquiryItemsCount = 0, 
  onOpenInquiry, 
  searchQuery, 
  onSearchChange,
  activeSection,
  onNavigate
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "collections", label: "Collections" },
    { id: "lookbook", label: "Digital Lookbook" },
    { id: "heritage", label: "Heritage & Story" },
    { id: "values", label: "Why Mayur" },
    { id: "wholesale", label: "B2B Wholesale" },
    { id: "contact", label: "Showroom & Contact" },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="top-ticker" aria-label="Announcement Bar">
        <div className="container">
          <div className="ticker-inner">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span><strong>Ahmedabad's Premier Ethnic Wear Manufacturer</strong> (Est. 1991) • Sizes <strong>M to 6XL</strong></span>
            </div>
            <div className="ticker-secondary" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span>Exports to 30+ Countries</span>
              <a 
                href={`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion team, I am interested in viewing your wholesale catalog.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#25D366', fontWeight: 'bold' }}
              >
                <WhatsAppIcon size={15} color="#25D366" />
                <span style={{ color: '#EF233C' }}>WhatsApp: +91 99788 31115</span>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Luxury Header */}
      <header 
        className={`main-header ${isScrolled ? 'scrolled' : ''}`}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: isScrolled ? 'rgba(237, 235, 230, 0.96)' : 'rgba(237, 235, 230, 0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #ECE5CE',
          boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isScrolled ? '10px 0' : '14px 0',
            transition: 'all 0.3s ease'
          }}>
            
            {/* Brand Logo */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
              style={{ display: 'flex', alignItems: 'center', gap: '14px' }}
            >
              <img 
                src="/assets/logo/mayur-official-circle.png" 
                alt="Mayur Fashion Official Logo" 
                style={{
                  height: isScrolled ? '46px' : '52px',
                  width: isScrolled ? '46px' : '52px',
                  borderRadius: '50%',
                  objectFit: 'contain',
                  boxShadow: '0 4px 14px rgba(239, 35, 60, 0.25)',
                  transition: 'all 0.3s ease',
                  border: '2px solid #ffffff'
                }}
              />
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isScrolled ? '1.35rem' : '1.5rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  color: '#EF233C',
                  lineHeight: 1.1,
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px'
                }}>
                  MAYUR
                  <span style={{ fontSize: '0.7rem', color: '#1c1917', fontWeight: 700 }}>FASHION</span>
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  color: '#3e5336',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  Manohar Dresses • Since 1991
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    color: activeSection === link.id ? '#EF233C' : '#1c1917',
                    position: 'relative',
                    padding: '8px 2px',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#EF233C'}
                  onMouseLeave={(e) => e.currentTarget.style.color = activeSection === link.id ? '#EF233C' : '#1c1917'}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      background: 'linear-gradient(90deg, #EF233C, #F2BCB6)',
                      borderRadius: '2px'
                    }} />
                  )}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Toggle Search"
                style={{
                  padding: '9px',
                  borderRadius: '50%',
                  color: '#1c1917',
                  background: showSearch ? '#ECE5CE' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid transparent'
                }}
                title="Search Collections"
              >
                <Search size={20} />
              </button>

              {/* Inquiry Basket Button */}
              <button
                onClick={onOpenInquiry}
                className="inquiry-btn"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 16px',
                  background: 'rgba(239, 35, 60, 0.08)',
                  color: '#EF233C',
                  borderRadius: '9999px',
                  border: '1px solid rgba(239, 35, 60, 0.25)',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}
              >
                <ShoppingBag size={18} />
                <span className="inquiry-label">Inquiry Bag</span>
                {inquiryItemsCount > 0 && (
                  <span style={{
                    background: '#EF233C',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(239, 35, 60, 0.4)'
                  }}>
                    {inquiryItemsCount}
                  </span>
                )}
              </button>

              {/* WhatsApp Wholesale CTA */}
              <a
                href={`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion! I am looking for your latest catalog and wholesale pricing.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp hide-mobile"
                style={{
                  padding: '9px 18px',
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <WhatsAppIcon size={17} color="#ffffff" />
                <span>Wholesale Chat</span>
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-menu-toggle"
                style={{
                  display: 'none',
                  padding: '8px',
                  color: '#EF233C'
                }}
                aria-label="Open Mobile Menu"
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {showSearch && (
            <div style={{
              padding: '12px 0 16px 0',
              borderTop: '1px solid #ECE5CE',
              animation: 'fadeIn 0.25s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1.5px solid #C8D6BF',
                borderRadius: '9999px',
                padding: '4px 16px',
                maxWidth: '650px',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
              }}>
                <Search size={18} color="#EF233C" style={{ marginRight: '10px' }} />
                <input
                  type="text"
                  placeholder="Search by fabric (Silk, Chanderi, Georgette), design, color, or sizes M-6XL..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '8px 0',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.95rem',
                    outline: 'none',
                    color: '#1c1917'
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')}
                    style={{ fontSize: '0.8rem', color: '#EF233C', fontWeight: 600, padding: '4px' }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: '#EDEBE6',
            borderTop: '1px solid #ECE5CE',
            padding: '20px 24px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: activeSection === link.id ? '#EF233C' : '#1c1917',
                    padding: '8px 0',
                    borderBottom: '1px solid #ECE5CE'
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion! I am contacting you from your website.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <WhatsAppIcon size={18} color="#ffffff" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Header CSS for responsive toggles */}
      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: flex !important;
          }
          .hide-mobile {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .inquiry-label {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
