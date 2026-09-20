import React, { useEffect } from 'react';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page" style={{ padding: '120px 24px 60px', maxWidth: '800px', margin: '0 auto', color: '#1c1917' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', fontFamily: '"Outfit", sans-serif' }}>Terms of Service</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>1. Agreement to Terms</h2>
        <p>By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not access the website.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>2. Website Usage Rules</h2>
        <p>You agree to use the website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>3. Intellectual Property</h2>
        <p>Unless otherwise indicated, the website is our proprietary property, and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the website are owned or controlled by us.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>4. Prohibited Activities</h2>
        <p>You may not access or use the website for any purpose other than that for which we make the website available. Prohibited activities include attempting to bypass security measures, scraping data, or transmitting malicious code.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>5. Third-Party Services</h2>
        <p>Our website may contain links to third-party websites or services that are not owned or controlled by [BUSINESS NAME]. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party web sites or services.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>6. Limitation of Liability</h2>
        <p>In no event shall [BUSINESS NAME], nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the website.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>7. Governing Law</h2>
        <p>These Terms shall be governed and construed in accordance with the laws of [JURISDICTION], without regard to its conflict of law provisions.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>8. Contact Us</h2>
        <p>If you have questions or comments about these Terms, please contact us at:</p>
        <address style={{ fontStyle: 'normal', marginTop: '8px' }}>
          [BUSINESS NAME]<br />
          Email: <a href="mailto:[BUSINESS EMAIL]" style={{ color: '#EF233C' }}>[BUSINESS EMAIL]</a>
        </address>
      </section>
    </div>
  );
}
