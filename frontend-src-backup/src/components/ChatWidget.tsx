'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hello! Welcome to Praxire. How can we help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { text: userMsg, isBot: false }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let reply = "Thanks for reaching out! A Praxire solutions expert will contact you shortly. For immediate assistance, feel free to WhatsApp us.";
      if (userMsg.toLowerCase().includes('website') || userMsg.toLowerCase().includes('development')) {
        reply = "We specialize in custom website and e-commerce development. Please leave your email and requirements, or click the WhatsApp button to chat with our lead dev!";
      } else if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('cost')) {
        reply = "We offer competitive, value-based pricing. I can schedule a free consultation for you if you share your contact details.";
      }
      setMessages((prev) => [...prev, { text: reply, isBot: true }]);
    }, 1000);
  };

  const whatsappNumber = "+919876543210"; // Replace with real number
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Praxire,%20I'm%20interested%20in%20your%20IT%20services.`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-4">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/20 flex items-center justify-center transition-all hover:-translate-y-1"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </a>

      {/* Live Chat Toggle */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 flex items-center justify-center transition-all hover:-translate-y-1"
          aria-label="Open Chat"
        >
          {isOpen ? <FiX size={20} /> : <FiMessageSquare size={20} />}
        </button>

        {/* Chat Window */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute left-0 bottom-16 w-80 sm:w-96 h-[450px] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col z-50"
            >
              {/* Chat Header */}
              <div className="bg-gradient-primary px-6 py-4 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-bold text-sm">Praxire Assistant</h4>
                  <p className="text-xs text-white/80 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </p>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <FiX size={18} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        msg.isBot
                          ? 'bg-gray-100 text-text-primary rounded-tl-none'
                          : 'bg-primary text-white rounded-tr-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2 bg-white">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-xl border border-border bg-transparent text-sm focus:outline-none focus:border-primary text-text-primary"
                />
                <button
                  type="submit"
                  className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center shrink-0 transition-colors"
                >
                  <FiSend size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
