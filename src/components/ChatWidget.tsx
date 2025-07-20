'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Send, Mic } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { sendMessage, fetchMessages, sendGuestMessage, ChatMessage } from '@/lib/chat';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const welcomeMessage = "Hi there! How can we help you today?";

  useEffect(() => {
    if (user && isOpen) {
      const unsubscribe = fetchMessages(user.uid, (msgs) => {
        setMessages(msgs);
      });
      return unsubscribe;
    }
  }, [user, isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 'welcome',
        userId: 'assistant',
        message: welcomeMessage,
        timestamp: new Date(),
        isAdmin: true
      }]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I'd be happy to help you find the perfect outfit!",
        "Let me assist you with your fashion needs.",
        "What style are you looking for today?",
        "I can help you with sizing, styling, or product recommendations."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        userId: 'assistant',
        message: randomResponse,
        timestamp: new Date(),
        isAdmin: true
      }]);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      userId: user?.uid || guestEmail,
      message: newMessage,
      timestamp: new Date(),
      isAdmin: false
    };

    setMessages(prev => [...prev, userMessage]);

    if (user) {
      await sendMessage(user.uid, newMessage);
    } else if (guestEmail) {
      await sendGuestMessage(guestEmail, newMessage);
    }

    setNewMessage('');
    simulateTyping();
  };

  const handleGuestEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestEmail.trim()) {
      setShowEmailForm(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!user && !isOpen) {
      setShowEmailForm(true);
    }
  };

  return (
    <>
      {/* FUTURISTIC CHAT BUTTON */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 z-40 px-8 py-4 rounded-full transition-all duration-500 flex items-center space-x-4 hover-lift hover:scale-105 animate-scale-in"
        style={{
          background: '#083C30',
          color: 'white',
          border: '1px solid rgba(167, 203, 184, 0.3)',
          boxShadow: '0 8px 32px rgba(8, 60, 48, 0.3)'
        }}
      >
        {/* R Logo container */}
        <div className="w-10 h-10 relative rounded-full overflow-hidden flex items-center justify-center border-2 border-white/30">
          <img
            src="/R.png"
            alt="RARITONE Chat"
            className="w-7 h-7 object-contain"
            style={{
              maxWidth: '40px',
              maxHeight: '40px'
            }}
          />
        </div>
        <span className="font-medium text-white font-['Urbanist']">
          Chat with us
        </span>
      </button>

      {/* FUTURISTIC CHAT MODAL */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 z-50 w-96 rounded-2xl overflow-hidden transition-all duration-500 animate-slide-in-right"
          style={{
            background: 'rgba(249, 246, 237, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(8, 60, 48, 0.1)',
            boxShadow: '0 20px 60px rgba(8, 60, 48, 0.15)'
          }}
        >
          {/* Header */}
          <div className="p-6 flex items-center justify-between border-b border-[#083C30]/10" style={{ color: '#083C30' }}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 border-[#083C30]">
                <img
                  src="/R.png"
                  alt="RARITONE"
                  className="w-7 h-7 object-contain"
                  style={{
                    maxWidth: '40px',
                    maxHeight: '40px'
                  }}
                />
              </div>
              <span className="font-medium font-['Urbanist']">Chat with a client advisor</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${isMinimized ? 'rotate-180' : ''}`}
                />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div>
              {/* Guest Email Form */}
              {showEmailForm && !user && (
                <div className="p-6 border-b border-[#083C30]/10">
                  <h4 className="font-medium mb-3 font-['Urbanist'] text-lg" style={{ color: '#083C30' }}>Privacy Notice</h4>
                  <form onSubmit={handleGuestEmailSubmit} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[#083C30]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#083C30]/20"
                      required
                    />
                    <p className="text-xs font-['Urbanist']" style={{ color: '#A7CBB8' }}>
                      Your personal data is collected in the course of providing remote chat assistance and will be processed in full compliance with our privacy policy.
                    </p>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="accept" required className="rounded border-2 border-[#083C30]" />
                      <label htmlFor="accept" className="text-xs font-['Urbanist']" style={{ color: '#A7CBB8' }}>I accept</label>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-2xl font-medium hover-lift transition-all duration-300"
                      style={{
                        background: '#083C30',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(8, 60, 48, 0.3)'
                      }}
                    >
                      Start chat
                    </button>
                  </form>
                </div>
              )}

              {/* Chat Messages */}
              {(user || (!showEmailForm && guestEmail)) && (
                <>
                  <div className="h-64 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-3 rounded-2xl text-sm transition-all duration-300 font-['Urbanist'] ${
                            message.isAdmin
                              ? 'bg-white border border-[#083C30]/10'
                              : 'text-white'
                          }`}
                          style={message.isAdmin ? { color: '#083C30' } : { backgroundColor: '#083C30' }}
                        >
                          {message.message}
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white px-3 py-2 rounded-2xl text-sm border border-[#083C30]/10" style={{ color: '#083C30' }}>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#083C30' }}></div>
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#083C30', animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#083C30', animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <div className="p-6 border-t border-[#083C30]/10">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 px-4 py-3 border border-[#083C30]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#083C30]/20"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 rounded-2xl font-medium hover-lift transition-all duration-300"
                        style={{
                          background: '#083C30',
                          color: 'white',
                          boxShadow: '0 4px 15px rgba(8, 60, 48, 0.3)'
                        }}
                      >
                        <Send size={16} />
                      </button>
                      <button className="px-4 py-2 rounded-2xl hover-lift transition-all duration-300 border-2 border-[#083C30] hover:bg-[#083C30] hover:text-white" style={{ color: '#083C30' }}>
                        <Mic size={16} />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;