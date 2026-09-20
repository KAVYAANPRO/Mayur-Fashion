import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

/**
 * Renders a bot reply string into clean JSX.
 * Since the AI is instructed to send plain text (no ** or URLs),
 * this just handles line-breaks and numbered / bullet list items.
 * word-break is enforced at every level so nothing can overflow.
 */
function BotMessage({ text }) {
  if (!text) return null;

  // Normalise line-endings then split
  const lines = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {lines.map((line, i) => {
        const t = line.trim();
        if (!t) return <div key={i} style={{ height: '3px' }} />;

        // Numbered item  "1. blah"
        const num = t.match(/^(\d+)\.\s+(.+)/);
        if (num) {
          return (
            <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <span style={{ color: '#EF233C', fontWeight: 700, flexShrink: 0, minWidth: '18px' }}>
                {num[1]}.
              </span>
              <span style={{ flex: 1, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                {t.replace(/^(\d+)\.\s+/, '')}
              </span>
            </div>
          );
        }

        // Bullet item  "- blah" or "• blah"
        const bul = t.match(/^[-•]\s+(.+)/);
        if (bul) {
          return (
            <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <span style={{ color: '#EF233C', fontWeight: 700, flexShrink: 0 }}>•</span>
              <span style={{ flex: 1, wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
                {bul[1]}
              </span>
            </div>
          );
        }

        // Plain line
        return (
          <div key={i} style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>
            {t}
          </div>
        );
      })}
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: 'Hello! Welcome to Mayur Fashion. How can we assist you with our wholesale collections today?',
      isBot: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || '';
    const history = messages
      .filter((m) => m.text)
      .map((m) => ({ role: m.isBot ? 'model' : 'user', parts: [{ text: m.text }] }));

    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);
        if (data.action === 'book_call') {
          window.open('https://calendly.com/mayurfashion', '_blank');
        } else if (data.action === 'open_contact_form') {
          setIsOpen(false);
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { text: 'Please connect with our team on WhatsApp for instant assistance.', isBot: true },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { text: 'For wholesale inquiries, please use the WhatsApp button below.', isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Styles (shared) ─────────────────────────────────────── */
  const bubbleBase = {
    padding: '10px 14px',
    fontSize: '0.86rem',
    lineHeight: '1.6',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    /* Hard overflow prevention */
    maxWidth: '86%',
    minWidth: 0,
    width: 'fit-content',
    wordBreak: 'break-word',
    overflowWrap: 'anywhere',
  };

  return (
    <>
      {/* ── Floating button ─────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="floating-chat-btn"
          aria-label="Open Mayur Assistant Chat"
          style={{
            position: 'relative',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1c1917, #2c2729)',
            color: '#fff',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            border: '2px solid #EF233C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1900,
            transition: 'all 0.3s ease',
          }}
        >
          <MessageSquare size={22} />
        </button>
      )}

      {/* ── Chat window ─────────────────────────────────────── */}
      {isOpen && (
        <div
          className="chat-window-panel"
          style={{
            position: 'fixed',
            bottom: '86px',
            right: '24px',
            width: '360px',
            maxWidth: 'calc(100vw - 32px)',
            height: '510px',
            maxHeight: 'calc(100vh - 110px)',
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2000,
            border: '1px solid #ECE5CE',
            overflow: 'hidden',
            animation: 'chatFadeIn 0.25s ease',
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '14px 16px',
              background: 'linear-gradient(135deg, #181516, #241e20)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '2px solid #EF233C',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25d366' }} />
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#EDEBE6' }}>
                Mayur Fashion Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#C8D6BF', padding: '4px', cursor: 'pointer' }}
              aria-label="Close Chat Window"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',   /* ← prevents any horizontal overflow */
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              background: '#EDEBE6',
            }}
          >
            {messages.map((msg, idx) =>
              msg.isBot ? (
                /* Bot bubble */
                <div
                  key={idx}
                  style={{
                    ...bubbleBase,
                    alignSelf: 'flex-start',
                    background: '#fff',
                    color: '#1c1917',
                    borderRadius: '4px 14px 14px 14px',
                    border: '1px solid #ECE5CE',
                  }}
                >
                  <BotMessage text={msg.text} />
                </div>
              ) : (
                /* User bubble */
                <div
                  key={idx}
                  style={{
                    ...bubbleBase,
                    alignSelf: 'flex-end',
                    background: 'linear-gradient(135deg, #EF233C, #b81427)',
                    color: '#fff',
                    borderRadius: '14px 4px 14px 14px',
                  }}
                >
                  {msg.text}
                </div>
              )
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  background: '#fff',
                  border: '1px solid #ECE5CE',
                  borderRadius: '4px 14px 14px 14px',
                  padding: '12px 16px',
                  display: 'flex',
                  gap: '5px',
                  alignItems: 'center',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#EF233C',
                      display: 'inline-block',
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '12px 14px',
              background: '#fff',
              borderTop: '1px solid #ECE5CE',
              display: 'flex',
              gap: '8px',
              flexShrink: 0,
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, sizes, location…"
              style={{
                flex: 1,
                minWidth: 0,
                padding: '9px 14px',
                borderRadius: '9999px',
                border: '1px solid #C8D6BF',
                outline: 'none',
                fontSize: '0.88rem',
                background: '#EDEBE6',
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              style={{
                background: '#EF233C',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);   opacity: 0.35; }
          30%            { transform: translateY(-5px); opacity: 1;    }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (max-width: 640px) {
          .floating-chat-btn  { width:48px!important; height:48px!important; }
          .floating-chat-btn svg { width:18px!important; height:18px!important; }
          .chat-window-panel  { right:12px!important; left:12px!important; bottom:74px!important; width:auto!important; max-width:100%!important; height:65vh!important; }
        }
      `}</style>
    </>
  );
}
