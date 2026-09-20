import React, { useEffect } from 'react';

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="policy-page" style={{ padding: '120px 24px 60px', maxWidth: '800px', margin: '0 auto', color: '#1c1917' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', fontFamily: '"Outfit", sans-serif' }}>Refund & Cancellation Policy</h1>
      <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>

      <section style={{ marginTop: '32px' }}>
        <p><em>Note: Since [BUSINESS NAME] primarily operates on a wholesale inquiry basis and does not process direct consumer payments through this website, standard e-commerce refunds do not apply to website interactions.</em></p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>1. Wholesale Orders</h2>
        <p>Refunds and cancellations for B2B wholesale orders are governed by the specific terms agreed upon in your invoice or wholesale contract. Please refer to your contract for details.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>2. Order Cancellations</h2>
        <p>If you have submitted an inquiry or a shortlist but have not yet finalized a contract or payment, you may cancel your request at any time by contacting us.</p>
      </section>

      <section style={{ marginTop: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>3. Contact Us</h2>
        <p>For questions regarding invoices or wholesale order disputes, please contact us at:</p>
        <address style={{ fontStyle: 'normal', marginTop: '8px' }}>
          Email: <a href="mailto:[BUSINESS EMAIL]" style={{ color: '#EF233C' }}>[BUSINESS EMAIL]</a><br />
          Phone: [PHONE]
        </address>
      </section>
    </div>
  );
}
