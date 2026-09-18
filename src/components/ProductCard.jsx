import React, { useState } from 'react';
import { Eye, ShoppingBag, MessageCircle, Sparkles, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/company';

export default function ProductCard({ 
  product, 
  onQuickView, 
  onToggleInquiry, 
  isInInquiry 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = isHovered && product.gallery && product.gallery.length > 1
    ? product.gallery[1]
    : product.primaryImage;

  const handleWhatsAppEnquiry = (e) => {
    e.stopPropagation();
    const text = `Hello Mayur Fashion! I am interested in inquiring about the design: *${product.title}* (Code: ${product.id}). Fabric: ${product.fabric}. Please provide wholesale price and catalog set availability.`;
    window.open(`https://wa.me/${COMPANY_INFO.contacts[0].whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      className="product-card luxury-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        background: '#ffffff',
        borderColor: '#ECE5CE'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onQuickView(product)}
    >
      {/* Product Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3/4',
        overflow: 'hidden',
        background: '#EDEBE6'
      }}>
        <img
          src={displayImage}
          alt={product.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />

        {/* Badges Overlay */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {product.isBestseller && (
            <span style={{
              background: 'linear-gradient(135deg, #EF233C, #b81427)',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              boxShadow: '0 2px 8px rgba(239, 35, 60, 0.4)'
            }}>
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span style={{
              background: '#C8D6BF',
              color: '#3e5336',
              padding: '4px 10px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid #b2c4a7'
            }}>
              2026 Edit
            </span>
          )}
        </div>

        {/* Size Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(236, 229, 206, 0.9)',
          backdropFilter: 'blur(6px)',
          color: '#1c1917',
          padding: '4px 10px',
          borderRadius: '9999px',
          fontSize: '0.72rem',
          fontWeight: 700,
          border: '1px solid #ded8cb'
        }}>
          Sizes M - 5XL
        </div>

        {/* Quick Action Bar on Hover */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.3s ease'
        }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              color: '#EF233C',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <Eye size={15} />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleInquiry(product);
            }}
            style={{
              padding: '8px 14px',
              background: isInInquiry ? '#EF233C' : '#1c1917',
              color: '#ffffff',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: isInInquiry ? '0 4px 12px rgba(239, 35, 60, 0.4)' : 'none'
            }}
            title={isInInquiry ? "Remove from Inquiry Bag" : "Add to Inquiry Bag"}
          >
            {isInInquiry ? <Check size={15} /> : <ShoppingBag size={15} />}
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div style={{
        padding: '18px 18px 20px 18px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px'
          }}>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#3e5336',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}>
              {product.categoryLabel}
            </span>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#5e5750'
            }}>
              Code: {product.id}
            </span>
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.12rem',
            lineHeight: 1.35,
            color: '#1c1917',
            marginBottom: '8px',
            fontWeight: 700
          }}>
            {product.title}
          </h3>

          <div style={{
            fontSize: '0.82rem',
            color: '#5e5750',
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.5
          }}>
            <strong>Fabric:</strong> {product.fabric}
          </div>
        </div>

        {/* Footer Actions on Card */}
        <div style={{
          paddingTop: '12px',
          borderTop: '1px solid #ECE5CE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span 
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: product.colorHex,
                border: '1px solid #C8D6BF'
              }} 
              title={product.color}
            />
            <span style={{ fontSize: '0.75rem', color: '#5e5750', fontWeight: 500 }}>
              {product.color.split('/')[0]}
            </span>
          </div>

          <button
            onClick={handleWhatsAppEnquiry}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#059669',
              background: '#ecfdf5',
              padding: '5px 10px',
              borderRadius: '9999px',
              border: '1px solid #a7f3d0'
            }}
          >
            <MessageCircle size={13} />
            <span>Enquire</span>
          </button>
        </div>
      </div>
    </div>
  );
}
