import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';

export default function ProductModal({ product, onClose, onToggleInquiry, isInInquiry }) {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState("M (38)");
  const [showSizeChart, setShowSizeChart] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.primaryImage);
      setSelectedSize("M (38)");
      setShowSizeChart(false);
    }
  }, [product]);

  const handleWhatsAppEnquiry = () => {
    const text = `Hello Mayur Fashion! I am looking to inquire about the wholesale catalog set for:\n\n*Product:* ${product.title}\n*Code:* ${product.id}\n*Fabric:* ${product.fabric}\n*Preferred Size:* ${selectedSize}\n*Color:* ${product.color}\n\nPlease share catalog pricing, MOQ, and delivery timeline.`;
    window.open(`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(24, 21, 22, 0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
          border: '1px solid #ECE5CE',
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#EDEBE6',
            border: '1px solid #ECE5CE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1c1917',
            zIndex: 10
          }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr',
          gap: '32px'
        }} className="modal-grid">
          
          {/* Left Column: Image Viewer & Gallery Strip */}
          <div style={{ padding: '24px', background: '#EDEBE6', borderRadius: '24px 0 0 24px' }}>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              height: '520px',
              maxHeight: '62vh',
              background: '#f5f4f0',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ECE5CE'
            }}>
              <img
                src={activeImage}
                alt={product.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  borderRadius: '16px'
                }}
              />
            </div>

            {/* Thumbnail Gallery Strip */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    style={{
                      width: '65px',
                      height: '85px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: activeImage === img ? '2px solid #EF233C' : '1px solid #C8D6BF',
                      flexShrink: 0,
                      opacity: activeImage === img ? 1 : 0.65,
                      transition: 'all 0.2s ease',
                      background: '#ECE5CE'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & B2B Inquiry Actions */}
          <div style={{ padding: '36px 32px 32px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#3e5336',
                  background: '#C8D6BF',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase'
                }}>
                  {product.categoryLabel}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#5e5750', fontWeight: 600 }}>
                  Design Code: {product.id}
                </span>
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.65rem',
                color: '#1c1917',
                lineHeight: 1.25,
                marginBottom: '10px'
              }}>
                {product.title}
              </h2>

              <p style={{ fontSize: '0.92rem', color: '#5e5750', lineHeight: 1.6, marginBottom: '20px' }}>
                {product.description}
              </p>

              {/* Product Specifications Matrix */}
              <div style={{
                background: '#EDEBE6',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1px solid #ECE5CE',
                marginBottom: '20px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '0.86rem'
              }}>
                <div>
                  <strong style={{ color: '#EF233C' }}>Top Fabric:</strong>
                  <div style={{ color: '#1c1917' }}>{product.fabric}</div>
                </div>
                <div>
                  <strong style={{ color: '#EF233C' }}>Bottom Fabric:</strong>
                  <div style={{ color: '#1c1917' }}>{product.bottomFabric}</div>
                </div>
                <div>
                  <strong style={{ color: '#EF233C' }}>Dupatta:</strong>
                  <div style={{ color: '#1c1917' }}>{product.dupatta}</div>
                </div>
                <div>
                  <strong style={{ color: '#EF233C' }}>Embroidery:</strong>
                  <div style={{ color: '#1c1917' }}>{product.work}</div>
                </div>
              </div>

              {/* Size Selector Strip */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1c1917' }}>
                    Available Sizes (Complete M to 6XL Grading):
                  </label>
                  <button 
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    style={{ fontSize: '0.8rem', color: '#EF233C', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    {showSizeChart ? 'Hide Size Chart' : 'View Size Chart'}
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        border: selectedSize === s ? '1.5px solid #EF233C' : '1px solid #C8D6BF',
                        background: selectedSize === s ? '#fde8eb' : '#ffffff',
                        color: selectedSize === s ? '#EF233C' : '#1c1917'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Inline Size Chart Modal Accordion */}
                {showSizeChart && (
                  <div style={{
                    marginTop: '12px',
                    padding: '12px',
                    background: '#ffffff',
                    border: '1px solid #ECE5CE',
                    borderRadius: '12px',
                    fontSize: '0.8rem'
                  }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #ECE5CE', color: '#EF233C' }}>
                          <th style={{ padding: '4px' }}>Size</th>
                          <th style={{ padding: '4px' }}>Bust (Inches)</th>
                          <th style={{ padding: '4px' }}>Waist</th>
                          <th style={{ padding: '4px' }}>Hip</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td style={{ padding: '4px' }}>M</td><td>38"</td><td>34"</td><td>40"</td></tr>
                        <tr><td style={{ padding: '4px' }}>L</td><td>40"</td><td>36"</td><td>42"</td></tr>
                        <tr><td style={{ padding: '4px' }}>XL</td><td>42"</td><td>38"</td><td>44"</td></tr>
                        <tr><td style={{ padding: '4px' }}>XXL</td><td>44"</td><td>40"</td><td>46"</td></tr>
                        <tr><td style={{ padding: '4px' }}>3XL</td><td>46"</td><td>42"</td><td>48"</td></tr>
                        <tr><td style={{ padding: '4px' }}>4XL</td><td>48"</td><td>44"</td><td>50"</td></tr>
                        <tr><td style={{ padding: '4px' }}>5XL</td><td>50"</td><td>46"</td><td>52"</td></tr>
                        <tr><td style={{ padding: '4px' }}>6XL</td><td>52"</td><td>48"</td><td>54"</td></tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Wholesale MOQ Note */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '8px',
                fontSize: '0.82rem',
                color: '#065f46',
                marginBottom: '24px'
              }}>
                <span><strong>Wholesale Packaging:</strong> Full catalog set with individual branded polybags and hangar packs.</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleWhatsAppEnquiry}
                className="btn btn-whatsapp"
                style={{ flex: 1.2, minWidth: '220px', padding: '13px 20px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <WhatsAppIcon size={20} color="#ffffff" />
                <span>Instant WhatsApp Inquiry</span>
              </button>

              <button
                onClick={() => onToggleInquiry(product)}
                className={`btn ${isInInquiry ? 'btn-primary' : 'btn-outline'}`}
                style={{ flex: 1, minWidth: '180px', padding: '13px 20px', fontSize: '0.95rem' }}
              >
                {isInInquiry ? (
                  <>
                    <Check size={18} />
                    <span>In Inquiry Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .modal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
