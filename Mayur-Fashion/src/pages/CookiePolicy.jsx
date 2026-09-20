import React, { useEffect } from 'react';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page" style={{ padding: '120px 24px 60px', maxWidth: '800px', margin: '0 auto', color: '#1c1917' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', fontFamily: '"Outfit", sans-serif' }}>Cookie Policy</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>1. What Are Cookies?</h2>
        <p>Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>2. How We Use Cookies</h2>
        <p>We use cookies to enhance your experience on our website. Specifically, we use:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '8px' }}>
          <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as saving your wholesale inquiry shortlist.</li>
          <li><strong>Analytics Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are. (If applicable).</li>
          <li><strong>Consent Cookies:</strong> We store a cookie to remember your preference regarding the cookie consent banner itself.</li>
        </ul>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>3. Third-Party Cookies</h2>
        <p>In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service. (e.g., Video embedding services).</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>4. Managing Cookies</h2>
        <p>You have the right to decide whether to accept or reject non-essential cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.</p>
        <p style={{ marginTop: '16px' }}>
          To change your preferences on our site, you can <button onClick={() => { localStorage.removeItem('mayur_cookie_consent'); window.location.reload(); }} style={{ background: 'none', border: 'none', color: '#EF233C', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}>reset your cookie consent</button> and refresh the page.
        </p>
      </section>
    </div>
  );
}
