import React, { useState } from 'react';
import { MapPin, Phone, Send, User } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '../data/company';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Showroom Visit & Wholesale Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 60, spread: 60 });

    const msg = `*MAYUR FASHION - WEBSITE INQUIRY*\n` +
      `*Name:* ${formState.name}\n` +
      `*Phone:* ${formState.phone}\n` +
      `*Email:* ${formState.email || 'N/A'}\n` +
      `*Subject:* ${formState.subject}\n` +
      `*Message:* ${formState.message}`;

    window.open(`https://wa.me/${COMPANY_INFO.contacts[0].people[0].whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="contact" className="section" style={{ background: '#EDEBE6', borderBottom: '1px solid #ECE5CE', overflow: 'hidden' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-title-wrap">
          <div className="section-tag fly-in-left">
            <span>Visit Our Showrooms</span>
          </div>
          <h2 className="section-title fly-in-left delay-1">
            Connect With Our Directors & Team
          </h2>
          <p className="section-subtitle fly-in-right delay-2">
            Experience our fabrics firsthand at our Sarangpur market showrooms in Ahmedabad, or connect directly with our directors on WhatsApp.
          </p>
        </div>

        {/* 3 Executive Contact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '50px'
        }} className="directors-grid">
          {COMPANY_INFO.contacts.map((contact, idx) => {
            const flyClass = idx < 2 ? 'fly-in-left' : 'fly-in-right';
            const delayClass = `delay-${idx + 1}`;
            return (
              <div
                key={idx}
                className={`luxury-card ${flyClass} ${delayClass}`}
                style={{
                  padding: '28px',
                  background: contact.highlight ? '#ffffff' : '#ffffff',
                  border: contact.highlight ? '1.5px solid #EF233C' : '1px solid #ECE5CE',
                  position: 'relative',
                  boxShadow: contact.highlight ? '0 8px 25px rgba(239, 35, 60, 0.12)' : '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                {contact.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#EF233C',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase'
                  }}>
                    Primary Contact
                  </div>
                )}

                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: contact.highlight ? 'rgba(239, 35, 60, 0.1)' : '#ECE5CE',
                  color: contact.highlight ? '#EF233C' : '#1c1917',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '14px'
                }}>
                  <User size={22} />
                </div>

                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.15rem',
                  color: '#1c1917',
                  marginBottom: '16px',
                  lineHeight: 1.3
                }}>
                  {contact.title}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
                  {contact.people.map((person, pIdx) => (
                    <div key={pIdx}>
                      <div style={{ fontWeight: 700, color: '#1c1917', fontSize: '1rem', marginBottom: '2px' }}>
                        {person.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#EF233C', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                        {person.role}
                      </div>
                      <a
                        href={`tel:${person.phone.replace(/\s+/g, '')}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.9rem',
                          color: '#5e5750',
                          fontWeight: 500
                        }}
                      >
                        <Phone size={14} color="#EF233C" />
                        <span>{person.phone}</span>
                      </a>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {contact.people.map((person, pIdx) => (
                    <a
                      key={pIdx}
                      href={`https://wa.me/${person.whatsapp}?text=${encodeURIComponent(`Hello ${person.name}, I am contacting you from the Mayur Fashion website.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp"
                      style={{ width: '100%', padding: '9px 14px', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px' }}
                    >
                      <WhatsAppIcon size={16} color="#ffffff" />
                      <span>Chat with {person.name.split(' ')[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Locations & Contact Form Split Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }} className="contact-main-grid">
          
          {/* Left: Office Locations & Google Map (Flies in from Left Wall) */}
          <div className="fly-in-left delay-2">
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.45rem',
              color: '#1c1917',
              marginBottom: '18px'
            }}>
              Our Showrooms & Corporate Offices
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {COMPANY_INFO.locations.map((loc, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '16px',
                    background: '#ffffff',
                    border: '1px solid #ECE5CE'
                  }}
                >
                  <div style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#EF233C',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    {loc.type}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1c1917', marginBottom: '6px' }}>
                    {loc.name}
                  </div>
                  <p style={{ fontSize: '0.88rem', color: '#5e5750', lineHeight: 1.5, marginBottom: '10px' }}>
                    {loc.address}
                  </p>
                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#EF233C',
                      fontSize: '0.82rem',
                      fontWeight: 700
                    }}
                  >
                    <MapPin size={14} />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Google Maps Embed iframe */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              height: '220px',
              border: '1px solid #ECE5CE',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}>
              <iframe
                title="Mayur Fashion Location"
                src="https://maps.google.com/maps?q=Sarangpur+New+Cloth+Market+Ahmedabad&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: Quick Direct Message Form (Flies in from Right Wall) */}
          <div 
            className="contact-form-card fly-in-right delay-2"
            style={{
              background: '#ffffff',
              padding: '36px',
              borderRadius: '24px',
              border: '1px solid #ECE5CE',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
            }}
          >
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.4rem',
              color: '#1c1917',
              marginBottom: '6px'
            }}>
              Send Direct Message
            </h3>
            <p style={{ fontSize: '0.86rem', color: '#5e5750', marginBottom: '20px' }}>
              Whether you have questions regarding designs, custom packaging, or international shipping, we are here to assist.
            </p>

            <form onSubmit={handleContactSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Patel"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.9rem',
                    background: '#EDEBE6',
                    outline: 'none'
                  }}
                />
              </div>


              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }} className="contact-inputs-row">
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #C8D6BF',
                      fontSize: '0.9rem',
                      background: '#EDEBE6',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1px solid #C8D6BF',
                      fontSize: '0.9rem',
                      background: '#EDEBE6',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#1c1917', marginBottom: '6px' }}>
                  Your Message or Inquiry Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you are looking for..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '8px',
                    border: '1px solid #C8D6BF',
                    fontSize: '0.9rem',
                    background: '#EDEBE6',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" required style={{ marginTop: '4px' }} />
                  <span style={{ fontSize: '0.8rem', color: '#5e5750', lineHeight: 1.4 }}>
                    I agree to the <a href="/privacy-policy" style={{ color: '#EF233C', textDecoration: 'underline' }} target="_blank">Privacy Policy</a> and consent to having my information processed for this inquiry.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px', fontSize: '0.95rem' }}
              >
                <Send size={16} />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .directors-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 16px !important;
          }
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
        @media (max-width: 640px) {
          .directors-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .directors-grid > div {
            padding: 20px 16px !important;
          }
          .contact-form-card {
            padding: 22px 16px !important;
            border-radius: 18px !important;
          }
          .contact-inputs-row {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}

