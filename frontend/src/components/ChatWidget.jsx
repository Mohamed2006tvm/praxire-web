import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { chatAPI } from '../lib/api';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! Welcome to Praxire. How can we help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change or loading changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    const updatedMessages = [...messages, { text: userMsg, isBot: false }];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatAPI.sendMessage(updatedMessages);
      const botReply = response.data.reply;
      setMessages((prev) => [...prev, { text: botReply, isBot: true }]);
    } catch (error) {
      console.error('ChatWidget communication error:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: "I apologize, but I'm having trouble connecting to the server. Please click the WhatsApp button below or email us at info@praxire.com so we can help you right away!",
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const whatsappNumber = "918072810080";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Praxire,%20I'm%20interested%20in%20your%20IT%20services.`;

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start gap-3 sm:gap-4">
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center transition-all hover:-translate-y-1 hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={20} />
      </a>

      {/* Live Chat Toggle Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 flex items-center justify-center overflow-hidden transition-all hover:-translate-y-1 hover:scale-105"
          aria-label="Open Chat"
        >
          {isOpen ? (
            <FiX size={20} />
          ) : (
            <img
              src="/ai-assistant-logo.jpg"
              alt="Praxire AI Assistant"
              className="w-full h-full object-cover"
            />
          )}
        </button>

        {/* Chat Window Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="fixed left-3 right-3 bottom-20 sm:absolute sm:left-0 sm:right-auto sm:bottom-16 sm:w-[380px] h-[min(500px,75vh)] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col z-50"
            >
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary to-primary-dark px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-full overflow-hidden flex items-center justify-center border border-white/20 shadow-inner">
                    <img
                      src="/ai-assistant-logo.jpg"
                      alt="Praxire AI Assistant"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Praxire Assistant</h4>
                    <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Online (AI & Support)
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/85 hover:text-white transition-colors"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm shadow-sm leading-relaxed ${msg.isBot
                          ? 'bg-white text-text-primary border border-border rounded-tl-none'
                          : 'bg-primary text-white rounded-tr-none'
                        }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Bouncing Typing Dots Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-border rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Form Action Input */}
              <form onSubmit={handleSend} className="p-3.5 border-t border-border flex gap-2 bg-white">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isLoading ? "Replying..." : "Ask us about our process or services..."}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-transparent text-sm focus:outline-none focus:border-primary text-text-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-primary hover:bg-primary-dark text-white flex items-center justify-center shrink-0 transition-colors disabled:opacity-40"
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
