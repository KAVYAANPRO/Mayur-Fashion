import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, Sparkles, Building2, User } from 'lucide-react';
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

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const inquiryData = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      subject: formState.subject,
      message: formState.message
    };

    try {
      const response = await fetch('http://localhost:5000/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryData)
      });

      if (response.ok) {
        setSubmitted(true);
        confetti({ particleCount: 60, spread: 60 });
        alert('Message sent successfully! We will get back to you soon.');
        setFormState({
          name: '',
          phone: '',
          email: '',
          subject: 'Showroom Visit & Wholesale Inquiry',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="section" style={{ background: '#EDEBE6', borderBottom: '1px solid #ECE5CE' }}>
      <div className="container">
        {/* Section Heading */}
        <div className="section-title-wrap">
          <div className="section-tag">
            <Building2 size={14} color="#EF233C" />
            <span>Visit Our Showrooms</span>
          </div>
          <h2 className="section-title">
            Connect With Our Directors & Team
          </h2>
          <p className="section-subtitle">
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
          {COMPANY_INFO.contacts.map((contact, idx) => (
            <div
              key={idx}
              className="luxury-card"
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
                fontSize: '1.25rem',
                color: '#1c1917',
                marginBottom: '4px'
              }}>
                {contact.name}
              </h3>

              <div style={{
                fontSize: '0.8rem',
                color: '#EF233C',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '16px'
              }}>
                {contact.role}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {contact.phones.map((phone, pIdx) => (
                  <a
                    key={pIdx}
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem',
                      color: '#1c1917',
                      fontWeight: 600
                    }}
                  >
                    <Phone size={15} color="#EF233C" />
                    <span>{phone}</span>
                  </a>
                ))}
              </div>

              <a
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(`Hello ${contact.name}, I am contacting you from the Mayur Fashion website.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: '100%', padding: '9px 14px', fontSize: '0.85rem' }}
              >
                <MessageCircle size={15} />
                <span>Chat with {contact.name.split(' ')[0]}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Locations & Contact Form Split Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }} className="contact-main-grid">
          
          {/* Left: Office Locations & Google Map */}
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: '#1c1917',
              marginBottom: '20px'
            }}>
              Our Showrooms & Corporate Offices
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
              {COMPANY_INFO.locations.map((loc, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '20px',
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
              height: '240px',
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

          {/* Right: Quick Direct Message Form */}
          <div style={{
            background: '#ffffff',
            padding: '36px',
            borderRadius: '24px',
            border: '1px solid #ECE5CE',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.45rem',
              color: '#1c1917',
              marginBottom: '8px'
            }}>
              Send Direct Message
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#5e5750', marginBottom: '24px' }}>
              Whether you have questions regarding designs, custom packaging, or international shipping, we are here to assist.
            </p>

            <form onSubmit={handleContactSubmit}>
              <div style={{ marginBottom: '16px' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
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

              <div style={{ marginBottom: '20px' }}>
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

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '13px', fontSize: '0.95rem', background: '#1c1917', color: '#fff', border: 'none' }}
              >
                <Send size={16} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .directors-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
