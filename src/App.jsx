import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import WhatsAppIcon from './components/WhatsAppIcon';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCatalog from './components/ProductCatalog';
import ProductModal from './components/ProductModal';
import LookbookViewer from './components/LookbookViewer';
import HeritageSection from './components/HeritageSection';
import ValuesSection from './components/ValuesSection';
import WholesaleSection from './components/WholesaleSection';
import ContactSection from './components/ContactSection';
import InquiryDrawer from './components/InquiryDrawer';
import Footer from './components/Footer';
import { COMPANY_INFO } from './data/company';

export default function App() {
  const [inquiryList, setInquiryList] = useState(() => {
    try {
      const saved = localStorage.getItem('mayur_inquiry_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('mayur_inquiry_list', JSON.stringify(inquiryList));
    } catch (e) {
      console.error(e);
    }
  }, [inquiryList]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleInquiry = (product) => {
    const exists = inquiryList.some((item) => item.id === product.id);
    if (exists) {
      setInquiryList(inquiryList.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.title}" from Inquiry Bag`);
    } else {
      setInquiryList([...inquiryList, product]);
      showToast(`Added "${product.title}" to Inquiry Bag!`);
    }
  };

  const handleRemoveInquiryItem = (id) => {
    setInquiryList(inquiryList.filter((item) => item.id !== id));
  };

  const handleClearInquiry = () => {
    setInquiryList([]);
    showToast("Inquiry Bag cleared");
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#EDEBE6' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3000,
          background: '#EF233C',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '9999px',
          boxShadow: '0 8px 25px rgba(239, 35, 60, 0.45)',
          border: '1px solid #ECE5CE',
          fontSize: '0.9rem',
          fontWeight: 600,
          animation: 'fadeIn 0.25s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Main Luxury Header */}
      <Header
        inquiryItemsCount={inquiryList.length}
        onOpenInquiry={() => setIsDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            scrollToSection('collections');
          }
        }}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main style={{ flexGrow: 1 }}>
        {/* 1. Hero Showcase (Clean typography editorial design) */}
        <Hero
          onExploreClick={() => scrollToSection('collections')}
          onLookbookClick={() => scrollToSection('lookbook')}
        />

        {/* 2. Product Catalog with Categories & Filtering */}
        <ProductCatalog
          searchQuery={searchQuery}
          onQuickView={(p) => setModalProduct(p)}
          onToggleInquiry={handleToggleInquiry}
          inquiryList={inquiryList}
        />

        {/* 3. Digital Lookbook Interactive Viewer */}
        <LookbookViewer />

        {/* 4. Heritage & Brand Story (1991 Foundation) */}
        <HeritageSection onExploreClick={() => scrollToSection('collections')} />

        {/* 5. Why Mayur & Size Inclusivity (M to 6XL) */}
        <ValuesSection onWholesaleClick={() => scrollToSection('wholesale')} />

        {/* 6. Wholesale & B2B Inquiry Portal */}
        <WholesaleSection />

        {/* 7. Showroom, Contacts & Map */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Quick View Product Modal */}
      {modalProduct && (
        <ProductModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onToggleInquiry={handleToggleInquiry}
          isInInquiry={inquiryList.some((i) => i.id === modalProduct.id)}
        />
      )}

      {/* Shortlist Inquiry Drawer */}
      <InquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        items={inquiryList}
        onRemoveItem={handleRemoveInquiryItem}
        onClearAll={handleClearInquiry}
      />

      {/* Floating Action Quick Links (Bottom Right) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1500,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {inquiryList.length > 0 && (
          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#EF233C',
              color: '#ffffff',
              boxShadow: '0 6px 20px rgba(239, 35, 60, 0.45)',
              border: '2px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            aria-label="Open Inquiry Bag"
            title="Open Wholesale Inquiry Shortlist"
          >
            <ShoppingBag size={24} />
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#1c1917',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontWeight: 800,
              width: '22px',
              height: '22px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #ffffff'
            }}>
              {inquiryList.length}
            </span>
          </button>
        )}

        <a
          href={`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent("Hello Mayur Fashion! I am contacting you directly from your website.")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#25d366',
            color: '#ffffff',
            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Chat on WhatsApp"
          title="Direct WhatsApp with Mayur Fashion"
        >
          <WhatsAppIcon size={30} color="#ffffff" />
        </a>
      </div>
    </div>
  );
}
