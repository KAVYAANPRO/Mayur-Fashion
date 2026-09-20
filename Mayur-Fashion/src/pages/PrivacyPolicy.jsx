import React, { useEffect } from 'react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page" style={{ padding: '120px 24px 60px', maxWidth: '800px', margin: '0 auto', color: '#1c1917' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', fontFamily: '"Outfit", sans-serif' }}>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>1. Introduction</h2>
        <p>Welcome to [BUSINESS NAME]. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>2. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '8px' }}>
          <li><strong>Personal Data:</strong> Name, email address, phone number, and other information you voluntarily provide to us when making wholesale inquiries or contacting us.</li>
          <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, and access times.</li>
        </ul>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>3. Purpose of Data Collection</h2>
        <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '8px' }}>
          <li>Respond to customer service requests and wholesale inquiries.</li>
          <li>Improve our website and services.</li>
          <li>Send administrative information or marketing communications (only if you have opted in).</li>
        </ul>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>4. Cookies and Tracking</h2>
        <p>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Please refer to our <a href="/cookie-policy" style={{ color: '#EF233C', textDecoration: 'underline' }}>Cookie Policy</a> for more details.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>5. Third-Party Services</h2>
        <p>We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us (e.g., Cloudinary for media, analytics providers).</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>6. Data Security and Retention</h2>
        <p>We use administrative, technical, and physical security measures to help protect your personal information. We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>7. User Privacy Rights</h2>
        <p>Depending on your location, you may have rights under applicable data protection laws. You can request access, correction, or deletion of your personal data by visiting our <a href="/data-deletion" style={{ color: '#EF233C', textDecoration: 'underline' }}>Data Deletion</a> page or contacting us.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>8. Children's Privacy</h2>
        <p>Our website is not intended for children under the age of 16 (or applicable age in your jurisdiction), and we do not knowingly collect personal data from children.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>9. Contact Us</h2>
        <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
        <address style={{ fontStyle: 'normal', marginTop: '8px' }}>
          [BUSINESS NAME]<br />
          [ADDRESS]<br />
          Email: <a href="mailto:[BUSINESS EMAIL]" style={{ color: '#EF233C' }}>[BUSINESS EMAIL]</a><br />
          Phone: [PHONE]
        </address>
      </section>
    </div>
  );
}
