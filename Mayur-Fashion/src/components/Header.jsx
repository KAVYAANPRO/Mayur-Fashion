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
              <a 
                href={`https://wa.me/${COMPANY_INFO.contacts[0].people[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion team, I am interested in viewing your wholesale catalog.")}`}
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
            gap: '40px',
            padding: isScrolled ? '10px 0' : '14px 0',
            transition: 'all 0.3s ease'
          }}>
            
            {/* Brand Logo */}
            <a 
              href="#hero" 
              onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
              style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              aria-label="Mayur Fashion - Manohar Dresses"
            >
              <img 
                src="/assets/logo/mayur-official-brand-logo.png" 
                alt="Mayur Fashion - Manohar Dresses" 
                style={{
                  height: isScrolled ? '46px' : '54px',
                  width: 'auto',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease'
                }}
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-link-btn ${activeSection === link.id ? 'active' : ''}`}
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
            <div className="action-buttons-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
              {/* Search Toggle */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Toggle Search"
                style={{
                  width: '38px',
                  height: '38px',
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
                <Search size={19} />
              </button>

              {/* Inquiry Basket Button */}
              <button
                onClick={onOpenInquiry}
                className="inquiry-btn"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'rgba(239, 35, 60, 0.08)',
                  color: '#EF233C',
                  borderRadius: '9999px',
                  border: '1px solid rgba(239, 35, 60, 0.25)',
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}
              >
                <ShoppingBag size={18} />
                <span className="inquiry-label">Inquiry Bag</span>
                {inquiryItemsCount > 0 && (
                  <span style={{
                    background: '#EF233C',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    width: '18px',
                    height: '18px',
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

              {/* WhatsApp Wholesale CTA (Desktop) */}
              <a
                href={`https://wa.me/${COMPANY_INFO.contacts[0].people[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion! I am looking for your latest catalog and wholesale pricing.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp hide-mobile"
                style={{
                  padding: '8px 16px',
                  fontSize: '0.86rem',
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
                  width: '38px',
                  height: '38px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  background: mobileMenuOpen ? '#EF233C' : '#ECE5CE',
                  color: mobileMenuOpen ? '#ffffff' : '#EF233C'
                }}
                aria-label="Open Mobile Menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Search Bar Dropdown */}
          {showSearch && (
            <div style={{
              padding: '10px 0 14px 0',
              borderTop: '1px solid #ECE5CE',
              animation: 'fadeIn 0.25s ease'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#ffffff',
                border: '1.5px solid #C8D6BF',
                borderRadius: '9999px',
                padding: '4px 14px',
                maxWidth: '650px',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
              }}>
                <Search size={17} color="#EF233C" style={{ marginRight: '8px', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search fabric, design, sizes M-6XL..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '8px 0',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.92rem',
                    outline: 'none',
                    color: '#1c1917'
                  }}
                />
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')}
                    style={{ fontSize: '0.78rem', color: '#EF233C', fontWeight: 600, padding: '4px' }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Slide-down Luxury Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'rgba(237, 235, 230, 0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid #ECE5CE',
            padding: '24px 20px 30px 20px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ paddingBottom: '8px', borderBottom: '1px solid #ECE5CE' }}>
                <span style={{ fontSize: '0.72rem', color: '#EF233C', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Explore Mayur Fashion
                </span>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    textAlign: 'left',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: activeSection === link.id ? '#EF233C' : '#1c1917',
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: '#C8D6BF', fontSize: '0.85rem' }}>→</span>
                </button>
              ))}

              <div style={{
                marginTop: '12px',
                paddingTop: '16px',
                borderTop: '1px solid #ECE5CE',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contacts[0].people[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion! I am contacting you directly from your website.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: '100%', padding: '13px', fontSize: '0.94rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <WhatsAppIcon size={19} color="#ffffff" />
                  <span>Direct Wholesale WhatsApp</span>
                </a>

                <a
                  href="tel:+919978831115"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '9999px',
                    border: '1px solid #ECE5CE',
                    background: '#ffffff',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#1c1917'
                  }}
                >
                  Call Showroom: +91 99788 31115
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
          .main-header img {
            height: 38px !important;
          }
        }
      `}</style>
    </>
  );
}
