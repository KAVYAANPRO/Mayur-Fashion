import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

// ─── Robust message renderer ──────────────────────────────────────────────────
// Handles AI output that may have:
//   - **bold** markers
//   - Inline numbered items like "1. text 2. text" without real newlines
//   - Raw URLs anywhere in the text
// ─────────────────────────────────────────────────────────────────────────────

function renderMessage(text) {
  if (!text) return null;

  // Step 1: normalise line-endings
  let processed = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Step 2: insert a real newline BEFORE inline numbered items
  // e.g. "...380001 2. **Head..." → "...380001\n2. **Head..."
  processed = processed.replace(/([^\n])\s+([\d]+\.\s)/g, '$1\n$2');

  // Step 3: insert a real newline BEFORE bare URLs that follow other text
  // e.g. "...380001 https://..." → "...380001\nhttps://..."
  processed = processed.replace(/([^\n\s])\s+(https?:\/\/)/g, '$1\n$2');

  // Step 4: split into lines and render each
  const lines = processed.split('\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
      {lines.map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIdx} style={{ height: '4px' }} />;

        // Bare URL line
        if (/^https?:\/\//.test(trimmed)) {
          const display = trimmed.length > 36 ? trimmed.slice(0, 34) + '…' : trimmed;
          return (
            <div key={lineIdx}>
              <a
                href={trimmed}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#EF233C',
                  textDecoration: 'underline',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  wordBreak: 'break-all',
                  display: 'inline-block'
                }}
              >
                🗺 {display}
              </a>
            </div>
          );
        }

        // Numbered item: "1. ..."
        const numMatch = trimmed.match(/^(\d+)\.\s+(.+)/);
        if (numMatch) {
          return (
            <div key={lineIdx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <span style={{
                color: '#EF233C', fontWeight: 700,
                flexShrink: 0, minWidth: '18px', paddingTop: '1px'
              }}>
                {numMatch[1]}.
              </span>
              <span style={{ flex: 1, wordBreak: 'break-word' }}>
                {inlineRender(numMatch[2])}
              </span>
            </div>
          );
        }

        // Bullet item: "- ..." or "• ..."
        const bulletMatch = trimmed.match(/^[-•]\s+(.+)/);
        if (bulletMatch) {
          return (
            <div key={lineIdx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
              <span style={{ color: '#EF233C', fontWeight: 700, flexShrink: 0, paddingTop: '1px' }}>•</span>
              <span style={{ flex: 1, wordBreak: 'break-word' }}>
                {inlineRender(bulletMatch[1])}
              </span>
            </div>
          );
        }

        // Regular line
        return (
          <div key={lineIdx} style={{ wordBreak: 'break-word' }}>
            {inlineRender(trimmed)}
          </div>
        );
      })}
    </div>
  );
}

// Parses inline **bold** and bare https:// URLs within a single line
function inlineRender(text) {
  const tokenRegex = /(\*\*[^*]+\*\*|https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }

    const token = match[0];

    if (token.startsWith('**')) {
      parts.push(
        <strong key={key++} style={{ fontWeight: 700 }}>
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      const display = token.length > 36 ? token.slice(0, 34) + '…' : token;
      parts.push(
        <a
          key={key++}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#EF233C',
            textDecoration: 'underline',
            fontWeight: 600,
            fontSize: '0.78rem',
            wordBreak: 'break-all',
            display: 'inline-block'
          }}
        >
          {display}
        </a>
      );
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return parts.length === 0 ? text : parts;
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Mayur Fashion. How can we assist you with our wholesale collections today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");
    setIsLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || '';

    const history = messages.filter(m => m.text).map(m => ({
      role: m.isBot ? "model" : "user",
      parts: [{ text: m.text }]
    }));

    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });
      const data = await res.json();

      if (res.ok) {
        setMessages(prev => [...prev, { text: data.reply, isBot: true }]);

        if (data.action === 'book_call') {
          window.open('https://calendly.com/mayurfashion', '_blank');
        } else if (data.action === 'open_contact_form') {
          setIsOpen(false);
          const contactElem = document.getElementById('contact');
          if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        setMessages(prev => [...prev, {
          text: "Thank you for reaching out! Please connect with our team on WhatsApp for instant assistance.",
          isBot: true
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        text: "For wholesale inquiries, please click the WhatsApp button below.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="floating-chat-btn"
          style={{
            position: 'relative',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1c1917, #2c2729)',
            color: '#ffffff',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            border: '2px solid #EF233C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1900,
            transition: 'all 0.3s ease'
          }}
          aria-label="Open Mayur Assistant Chat"
        >
          <MessageSquare size={22} />
        </button>
      )}

      {/* Chat Window */}
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
            background: '#ffffff',
            borderRadius: '18px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2000,
            border: '1px solid #ECE5CE',
            overflow: 'hidden',
            animation: 'chatFadeIn 0.25s ease'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: 'linear-gradient(135deg, #181516, #241e20)',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid #EF233C',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25d366' }} />
              <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#EDEBE6' }}>Mayur Fashion Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#C8D6BF', padding: '4px', cursor: 'pointer' }}
              aria-label="Close Chat Window"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: '#EDEBE6'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  background: msg.isBot
                    ? '#ffffff'
                    : 'linear-gradient(135deg, #EF233C, #b81427)',
                  color: msg.isBot ? '#1c1917' : '#ffffff',
                  padding: '10px 14px',
                  borderRadius: msg.isBot ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                  // KEY FIX: hard max-width + word break at container level
                  maxWidth: '88%',
                  width: 'fit-content',
                  minWidth: 0,
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word',
                  border: msg.isBot ? '1px solid #ECE5CE' : 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  fontSize: '0.86rem',
                  lineHeight: '1.6'
                }}
              >
                {msg.isBot ? renderMessage(msg.text) : msg.text}
              </div>
            ))}

            {/* Animated typing dots */}
            {isLoading && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#ffffff',
                border: '1px solid #ECE5CE',
                borderRadius: '4px 14px 14px 14px',
                padding: '11px 16px',
                display: 'flex',
                gap: '5px',
                alignItems: 'center'
              }}>
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: '#EF233C',
                      display: 'inline-block',
                      animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '12px 14px',
              background: '#ffffff',
              borderTop: '1px solid #ECE5CE',
              display: 'flex',
              gap: '8px',
              flexShrink: 0
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fabrics, sizes, location…"
              style={{
                flex: 1,
                padding: '9px 14px',
                borderRadius: '9999px',
                border: '1px solid #C8D6BF',
                outline: 'none',
                fontSize: '0.88rem',
                background: '#EDEBE6',
                minWidth: 0
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: '#EF233C',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (max-width: 500px) {
          .floating-chat-btn {
            bottom: 18px !important;
            right: 16px !important;
            width: 48px !important;
            height: 48px !important;
          }
          .chat-window-panel {
            right: 12px !important;
            left: 12px !important;
            bottom: 74px !important;
            width: auto !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}
