import React, { useEffect } from 'react';

export default function DataDeletion() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page" style={{ padding: '120px 24px 60px', maxWidth: '800px', margin: '0 auto', color: '#1c1917' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', fontFamily: '"Outfit", sans-serif' }}>Data Deletion Request</h1>

      <section style={{ marginTop: '32px' }}>
        <p>At [BUSINESS NAME], we value your privacy and give you control over your personal data.</p>
        <p style={{ marginTop: '16px' }}>If you have previously submitted an inquiry or contacted us and would like your personal information to be permanently deleted from our records, please contact us at the email below.</p>
      </section>

      <section style={{ marginTop: '32px', background: '#ffffff', padding: '24px', borderRadius: '8px', border: '1px solid #e5e5e5' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>How to Request Deletion</h2>
        <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>Send an email to <a href="mailto:[BUSINESS EMAIL]" style={{ color: '#EF233C', fontWeight: 500 }}>[BUSINESS EMAIL]</a>.</li>
          <li>Use the subject line: <strong>Data Deletion Request</strong>.</li>
          <li>Include the email address and name you used when interacting with us.</li>
        </ol>
        <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#666' }}>We will process your request within 30 days and confirm once your data has been securely deleted, in accordance with applicable laws.</p>
      </section>
    </div>
  );
}
