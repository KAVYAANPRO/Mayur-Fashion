import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  
  const [prefs, setPrefs] = useState({
    essential: true, // Always true
    analytics: false
  });

  useEffect(() => {
    const consent = Cookies.get('mayur_cookie_consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      try {
        setPrefs(JSON.parse(consent));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPrefs = { essential: true, analytics: true };
    Cookies.set('mayur_cookie_consent', JSON.stringify(newPrefs), { expires: 365 });
    setPrefs(newPrefs);
    setIsVisible(false);
  };

  const handleRejectNonEssential = () => {
    const newPrefs = { essential: true, analytics: false };
    Cookies.set('mayur_cookie_consent', JSON.stringify(newPrefs), { expires: 365 });
    setPrefs(newPrefs);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    Cookies.set('mayur_cookie_consent', JSON.stringify(prefs), { expires: 365 });
    setIsVisible(false);
    setPreferencesOpen(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '1px solid #e5e5e5',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
      zIndex: 9999,
      padding: '24px',
      fontFamily: '"Inter", sans-serif',
      color: '#1c1917'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {!preferencesOpen ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 600 }}>We value your privacy</h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read our <a href="/cookie-policy" style={{ color: '#EF233C', textDecoration: 'underline' }}>Cookie Policy</a>.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={handleRejectNonEssential}
                style={{ padding: '10px 20px', border: '1px solid #1c1917', background: 'transparent', color: '#1c1917', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
              >
                Reject Non-Essential
              </button>
              <button 
                onClick={() => setPreferencesOpen(true)}
                style={{ padding: '10px 20px', border: '1px solid #e5e5e5', background: '#f5f5f5', color: '#1c1917', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
              >
                Preferences
              </button>
              <button 
                onClick={handleAcceptAll}
                style={{ padding: '10px 20px', border: 'none', background: '#EF233C', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Cookie Preferences</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" checked={true} disabled />
                <span><strong>Essential Cookies</strong> (Required for site functionality)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  checked={prefs.analytics} 
                  onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })} 
                />
                <span><strong>Analytics Cookies</strong> (Help us understand how visitors interact with the site)</span>
              </label>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button 
                onClick={handleSavePreferences}
                style={{ padding: '10px 20px', border: 'none', background: '#1c1917', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
