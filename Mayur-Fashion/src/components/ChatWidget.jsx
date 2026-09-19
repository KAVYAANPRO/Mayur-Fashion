import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

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
    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: "Thank you for reaching out! You can also chat directly with our team on WhatsApp for instant assistance.", isBot: true }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { text: "For instant catalog sets and wholesale price inquiries, please click the WhatsApp button.", isBot: true }]);
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
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #1c1917, #2c2729)',
            color: '#ffffff',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
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
            width: '350px',
            maxWidth: 'calc(100vw - 32px)',
            height: '490px',
            maxHeight: 'calc(100vh - 110px)',
            background: '#ffffff',
            borderRadius: '18px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2000,
            border: '1px solid #ECE5CE',
            overflow: 'hidden',
            animation: 'fadeIn 0.25s ease'
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
            borderBottom: '2px solid #EF233C'
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
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            background: '#EDEBE6'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                background: msg.isBot ? '#ffffff' : 'linear-gradient(135deg, #EF233C, #b81427)',
                color: msg.isBot ? '#1c1917' : '#ffffff',
                padding: '9px 13px',
                borderRadius: '12px',
                maxWidth: '85%',
                border: msg.isBot ? '1px solid #ECE5CE' : 'none',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                fontSize: '0.86rem',
                lineHeight: '1.45'
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', color: '#5e5750', fontSize: '0.82rem', padding: '4px 8px' }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '12px 14px',
            background: '#ffffff',
            borderTop: '1px solid #ECE5CE',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fabrics, sizes M-6XL..."
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '9999px',
                border: '1px solid #C8D6BF',
                outline: 'none',
                fontSize: '0.88rem',
                background: '#EDEBE6'
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

