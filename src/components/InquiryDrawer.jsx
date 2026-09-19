import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/company';

export default function InquiryDrawer({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onClearAll 
}) {
  if (!isOpen) return null;

  const handleSendConsolidatedInquiry = () => {
    if (items.length === 0) return;

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    let message = `*MAYUR FASHION - CONSOLIDATED WHOLESALE INQUIRY*\n`;
    message += `Hello Mayur Team, I have shortlisted the following *${items.length} design(s)* for wholesale catalog inquiry:\n\n`;

    items.forEach((item, index) => {
      message += `*${index + 1}. ${item.title}*\n`;
      message += `   • Code: ${item.id}\n`;
      message += `   • Fabric: ${item.fabric}\n`;
      message += `   • Color: ${item.color}\n\n`;
    });

    message += `Please provide wholesale set pricing, ready stock availability, and MOQ for these designs. Thank you!`;

    const waUrl = `https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2500,
        background: 'rgba(24, 21, 22, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={onClose}
    >
      <div
        className="inquiry-drawer-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          background: '#ffffff',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideLeft 0.3s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          borderBottom: '1px solid #ECE5CE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#EDEBE6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#EF233C',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingBag size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#1c1917', fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                Wholesale Inquiry Bag
              </h3>
              <span style={{ fontSize: '0.78rem', color: '#5e5750' }}>
                {items.length} {items.length === 1 ? 'Design' : 'Designs'} Shortlisted
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '50%',
              color: '#1c1917',
              background: '#ECE5CE'
            }}
            aria-label="Close Inquiry Drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Shortlisted Items List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '10px',
                  borderRadius: '14px',
                  border: '1px solid #ECE5CE',
                  background: '#EDEBE6',
                  position: 'relative'
                }}
              >
                <div style={{
                  width: '68px',
                  height: '88px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#ECE5CE'
                }}>
                  <img
                    src={item.primaryImage}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#EF233C', fontWeight: 700 }}>
                      Code: {item.id}
                    </span>
                    <h4 style={{
                      fontSize: '0.9rem',
                      color: '#1c1917',
                      fontWeight: 700,
                      lineHeight: 1.3,
                      marginBottom: '4px'
                    }}>
                      {item.title}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: '#5e5750' }}>
                      <strong>Fabric:</strong> {item.fabric}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#3e5336', background: '#C8D6BF', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      Sizes M - 6XL
                    </span>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{
                        color: '#EF233C',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.74rem',
                        fontWeight: 600
                      }}
                    >
                      <Trash2 size={14} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5e5750'
            }}>
              <ShoppingBag size={48} strokeWidth={1.2} style={{ marginBottom: '14px', color: '#C8D6BF' }} />
              <h4 style={{ fontSize: '1.1rem', color: '#1c1917', marginBottom: '6px' }}>
                Your Inquiry Bag is Empty
              </h4>
              <p style={{ fontSize: '0.85rem', maxWidth: '280px', marginBottom: '20px' }}>
                Browse our collection and click "Add to Bag" on any design to create a consolidated wholesale inquiry.
              </p>
              <button
                onClick={onClose}
                className="btn btn-outline"
                style={{ fontSize: '0.85rem', padding: '10px 20px' }}
              >
                Browse Collections
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div style={{
            padding: '16px 18px 20px 18px',
            borderTop: '1px solid #ECE5CE',
            background: '#EDEBE6',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <span style={{ color: '#5e5750' }}>Total Designs Selected:</span>
              <strong style={{ color: '#EF233C', fontSize: '0.98rem' }}>{items.length} Designs</strong>
            </div>

            <button
              onClick={handleSendConsolidatedInquiry}
              className="btn btn-whatsapp"
              style={{ width: '100%', padding: '13px', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <WhatsAppIcon size={19} color="#ffffff" />
              <span>Send All {items.length} Designs to WhatsApp</span>
            </button>

            <button
              onClick={onClearAll}
              style={{
                fontSize: '0.78rem',
                color: '#5e5750',
                textAlign: 'center',
                padding: '3px'
              }}
            >
              Clear Entire Bag
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 500px) {
          .inquiry-drawer-panel {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

