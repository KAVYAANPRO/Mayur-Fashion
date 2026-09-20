import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { COMPANY_INFO } from '../data/company';

export default function ProductCard({ 
  product, 
  onQuickView, 
  onToggleInquiry, 
  isInInquiry,
  className = '',
  style = {}
}) {
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = isHovered && product.gallery && product.gallery.length > 1
    ? product.gallery[1]
    : (product.primaryImage || (product.gallery && product.gallery[0]) || '');

  const handleWhatsAppEnquiry = (e) => {
    e.stopPropagation();
    const text = `Hello Mayur Fashion! I am interested in inquiring about the design: *${product.title}* (Code: ${product.id}). Fabric: ${product.fabric}. Please provide wholesale price and catalog set availability.`;
    window.open(`https://wa.me/${COMPANY_INFO.contacts[0].people[0].whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      className={`product-card luxury-card ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        cursor: 'pointer',
        background: '#ffffff',
        borderColor: '#ECE5CE',
        ...style
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
          Sizes {product.sizes && product.sizes.length > 0 ? `${product.sizes[0].split(' ')[0]} - ${product.sizes[product.sizes.length - 1].split(' ')[0]}` : 'M - 6XL'}
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
      <div 
        className="product-card-body"
        style={{
          padding: '16px 16px 18px 16px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px'
          }}>
            <span style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#3e5336',
              textTransform: 'uppercase',
              letterSpacing: '0.06em'
            }}>
              {product.categoryLabel}
            </span>
            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#5e5750'
            }}>
              {product.id}
            </span>
          </div>

          <h3 
            className="product-card-title"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.05rem',
              lineHeight: 1.3,
              color: '#1c1917',
              marginBottom: '6px',
              fontWeight: 700,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {product.title}
          </h3>

          <div style={{
            fontSize: '0.78rem',
            color: '#5e5750',
            marginBottom: '10px',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4
          }}>
            <strong>Fabric:</strong> {product.fabric || 'Premium Fabric'}
          </div>
        </div>

        {/* Footer Actions on Card */}
        <div style={{
          paddingTop: '10px',
          borderTop: '1px solid #ECE5CE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span 
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                background: product.colorHex || '#8a7b6b',
                border: '1px solid #C8D6BF',
                flexShrink: 0
              }} 
              title={product.color}
            />
            <span style={{ fontSize: '0.72rem', color: '#5e5750', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65px' }}>
              {(product.color || 'Classic').split('/')[0]}
            </span>
          </div>

          <button
            onClick={handleWhatsAppEnquiry}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#059669',
              background: '#ecfdf5',
              padding: '4px 8px',
              borderRadius: '9999px',
              border: '1px solid #a7f3d0',
              flexShrink: 0
            }}
          >
            <WhatsAppIcon size={13} color="#059669" />
            <span>Enquire</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .product-card-body {
            padding: 10px 8px 12px 8px !important;
          }
          .product-card-title {
            font-size: 0.9rem !important;
            min-height: 2.3em;
          }
        }
      `}</style>
    </div>
  );
}
