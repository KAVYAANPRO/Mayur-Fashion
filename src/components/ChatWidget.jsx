import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am the Mayur Fashion assistant. How can I help you today?", isBot: true }
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

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { text: data.reply, isBot: true }]);
      } else {
        setMessages(prev => [...prev, { text: "Sorry, I am having trouble connecting right now.", isBot: true }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { text: "Error communicating with server.", isBot: true }]);
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
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: '#1c1917',
            color: '#ffffff',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Open Chat"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          width: '350px',
          height: '500px',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2000,
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            background: '#1c1917',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} />
              <span style={{ fontWeight: 600 }}>Mayur Fashion Assistant</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: '#f9fafb'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                background: msg.isBot ? '#ffffff' : '#1c1917',
                color: msg.isBot ? '#1c1917' : '#ffffff',
                padding: '10px 14px',
                borderRadius: '8px',
                maxWidth: '80%',
                border: msg.isBot ? '1px solid #e5e7eb' : 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                fontSize: '0.9rem',
                lineHeight: '1.4'
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', color: '#6b7280', fontSize: '0.85rem' }}>
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} style={{
            padding: '16px',
            background: '#ffffff',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our products..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              style={{
                background: '#1c1917',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '0 14px',
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !input.trim() ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
