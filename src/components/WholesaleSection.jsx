import React, { useState } from 'react';
import { Package, Truck, Globe } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/company';

export default function WholesaleSection() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phone: '',
    cityCountry: '',
    businessType: 'Retail Boutique Owner',
    interestedCategories: 'Kurti 3-Piece Sets & Anarkalis',
    estimatedOrderSize: '5 to 10 Catalog Sets',
    customNotes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 }
    });

    const msg = `*MAYUR FASHION - B2B WHOLESALE INQUIRY*\n\n` +
      `*Business Name:* ${formData.businessName || 'N/A'}\n` +
      `*Contact Person:* ${formData.contactPerson}\n` +
      `*Phone/WhatsApp:* ${formData.phone}\n` +
      `*Location:* ${formData.cityCountry}\n` +
      `*Business Type:* ${formData.businessType}\n` +
      `*Interested In:* ${formData.interestedCategories}\n` +
      `*Estimated Volume:* ${formData.estimatedOrderSize}\n` +
      `*Notes:* ${formData.customNotes || 'Looking forward to receiving latest wholesale catalog.'}`;

    const waUrl = `https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section id="wholesale" className="section" style={{ background: '#EDEBE6', position: 'relative', borderBottom: '1px solid #ECE5CE', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-title-wrap">
          <div className="section-tag fly-in-left">
            <span>Direct Manufacturer Pricing</span>
          </div>
          <h2 className="section-title fly-in-left delay-1">
            B2B Wholesale & Global Export Portal
          </h2>
          <p className="section-subtitle fly-in-right delay-2">
            Partner directly with Manohar Dresses. Guaranteed catalog exclusivity, export-compliant packaging, and seamless dispatch to 30+ countries.
          </p>
        </div>

        {/* 3 Advantage Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '50px'
        }} className="wholesale-cards-grid">
          
          <div className="luxury-card fly-in-left delay-1" style={{ padding: '28px', background: '#ffffff', borderColor: '#ECE5CE' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(239, 35, 60, 0.08)',
              color: '#EF233C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Package size={24} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#1c1917', marginBottom: '8px' }}>
              Full Catalog Set Supply
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#5e5750', lineHeight: 1.6 }}>
              Sold in pristine catalog sets with assorted sizes M to 6XL. Each garment is packed in branded luxury sleeves ready for your store racks.
            </p>
          </div>

          <div className="luxury-card fly-in-up delay-2" style={{ padding: '28px', background: '#ffffff', borderColor: '#ECE5CE' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(200, 214, 191, 0.35)',
              color: '#3e5336',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Globe size={24} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#1c1917', marginBottom: '8px' }}>
              Air & Sea Export To 30+ Nations
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#5e5750', lineHeight: 1.55 }}>
              Seamless documentation and express courier dispatch across USA, UK, UAE, Canada, Australia, South Africa, and Southeast Asia.
            </p>
          </div>

          <div className="luxury-card fly-in-right delay-1" style={{ padding: '28px', background: '#ffffff', borderColor: '#ECE5CE' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(242, 188, 182, 0.35)',
              color: '#8c322b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <Truck size={24} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#1c1917', marginBottom: '8px' }}>
              Reliable Daily Dispatches
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#5e5750', lineHeight: 1.55 }}>
              Centrally located in Sarangpur textile hub, Ahmedabad, ensuring 24-48 hour dispatch for ready-to-ship catalog stock.
            </p>
          </div>
        </div>

        {/* Wholesale Form Box */}
        <div 
          className="wholesale-form-card fly-in-up delay-2"
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '1px solid #ECE5CE',
            padding: '40px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.04)',
            maxWidth: '960px',
            margin: '0 auto'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.35rem, 3vw, 1.75rem)',
              color: '#1c1917',
              marginBottom: '6px'
            }}>
              Request Wholesale Catalog & Rate Card
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#5e5750' }}>
              Fill out your business requirements below to receive instant wholesale catalog PDFs and set prices on WhatsApp.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '18px',
              marginBottom: '18px'
            }} className="form-grid">
              <div className="fly-in-left delay-3">
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  Business / Store Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Ethnic Boutique"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#EDEBE6'
                  }}
                />
              </div>

              <div className="fly-in-right delay-3">
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Shah"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#EDEBE6'
                  }}
                />
              </div>

              <div className="fly-in-left delay-3">
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#EDEBE6'
                  }}
                />
              </div>

              <div className="fly-in-right delay-3">
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  City & State / Country *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Maharashtra (or Dubai, UAE)"
                  value={formData.cityCountry}
                  onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#EDEBE6'
                  }}
                />
              </div>

              <div className="fly-in-left delay-3">
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#EDEBE6',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Retail Boutique Owner">Retail Boutique Owner</option>
                  <option value="Wholesale Distributor / Dealer">Wholesale Distributor / Dealer</option>
                  <option value="Online / Instagram Reseller">Online / Instagram Reseller</option>
                  <option value="International Importer / Exporter">International Importer / Exporter</option>
                  <option value="Chain Store Buyer">Chain Store Buyer</option>
                </select>
              </div>

              <div className="fly-in-right delay-3">
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  Interested Collections
                </label>
                <select
                  value={formData.interestedCategories}
                  onChange={(e) => setFormData({ ...formData, interestedCategories: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    background: '#EDEBE6',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Kurti 3-Piece Sets & Anarkalis">Kurti 3-Piece Sets & Anarkalis</option>
                  <option value="Co-ord Sets & Afghani Pants">Co-ord Sets & Afghani Pants</option>
                  <option value="Festive & Wedding Silk Edit">Festive & Wedding Silk Edit</option>
                  <option value="Plus Size (3XL to 6XL) Collection">Plus Size (3XL to 6XL) Collection</option>
                  <option value="Complete Catalog Range (All Categories)">Complete Catalog Range (All Categories)</option>
                </select>
              </div>
            </div>

            <div className="fly-in-up delay-3" style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                Additional Notes or Specific Design Inquiries
              </label>
              <textarea
                rows={3}
                placeholder="Mention any specific style codes, fabric preference, or target dispatch dates..."
                value={formData.customNotes}
                onChange={(e) => setFormData({ ...formData, customNotes: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid #C8D6BF',
                  fontSize: '0.92rem',
                  outline: 'none',
                  background: '#EDEBE6',
                  resize: 'vertical'
                }}
              />
            </div>

            <div className="fly-in-up delay-4" style={{ textAlign: 'center' }}>
              <button
                type="submit"
                className="btn btn-whatsapp wholesale-submit-btn"
                style={{ padding: '14px 34px', fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '9px' }}
              >
                <WhatsAppIcon size={20} color="#ffffff" />
                <span>Submit & Open WhatsApp Inquiry</span>
              </button>
            </div>
          </form>
        </div>
      </div>


      <style>{`
        @media (max-width: 768px) {
          .wholesale-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .form-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .wholesale-form-card {
            padding: 24px 18px !important;
            border-radius: 18px !important;
          }
          .wholesale-submit-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}

