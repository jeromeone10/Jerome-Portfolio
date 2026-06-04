import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import darkLogo from '../logo/Jerome Logo Design.png';
import lightLogo from '../logo/jerome logo.png';

const ResumeChatbot = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      text: "Hi there! I'm Jerome's Resume Assistant. Ask me anything about Jerome's background, skills, projects, or experience!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Resume knowledge base
  const resumeKnowledge = {
    name: "Jerome M. Niñal",
    title: "BSIT Graduate | Web Developer",
    about: "I'm a passionate full-stack web developer focused on building clean, modern, and user-centric web applications with React and PHP.",
    education: "Bachelor of Science in Information Technology (BSIT)",
    skills: [
      "React", "JavaScript", "PHP", "HTML", "CSS",
      "Tailwind CSS", "Node.js", "Git", "GitHub"
    ],
    projects: [
      "Portfolio website (this one!)",
      "Various web development projects",
      "Full-stack applications with React and PHP"
    ],
    contact: "matugasjerome@gmail.com",
    location: "Manila, Philippines",
    interests: [
      "Web Development",
      "Learning new technologies",
      "Building user-friendly applications"
    ]
  };

  const getBotResponse = (question) => {
    const q = question.toLowerCase();
    
    if (q.includes('name') || q.includes('who are you')) {
      return `My name is ${resumeKnowledge.name}! I'm a ${resumeKnowledge.title}.`;
    }
    
    if (q.includes('about') || q.includes('tell me about')) {
      return resumeKnowledge.about;
    }
    
    if (q.includes('education') || q.includes('school') || q.includes('study')) {
      return `I'm currently pursuing my ${resumeKnowledge.education}.`;
    }
    
    if (q.includes('skill') || q.includes('what can you do') || q.includes('technologies')) {
      return `Here are my skills: ${resumeKnowledge.skills.join(', ')}.`;
    }
    
    if (q.includes('project') || q.includes('work')) {
      return `Some of my projects include: ${resumeKnowledge.projects.join(', ')}.`;
    }
    
    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
      return `You can reach me at ${resumeKnowledge.contact}!`;
    }
    
    if (q.includes('location') || q.includes('where') || q.includes('from')) {
      return `I'm based in ${resumeKnowledge.location}!`;
    }
    
    if (q.includes('interest') || q.includes('hobby') || q.includes('like')) {
      return `My interests include: ${resumeKnowledge.interests.join(', ')}.`;
    }
    
    return "Great question! I can tell you about Jerome's background, skills, projects, education, or contact information. What would you like to know?";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      role: 'user',
      text: inputText
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        role: 'bot',
        text: getBotResponse(userMessage.text)
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-6 bottom-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isDarkMode 
            ? 'bg-slate-800 border-2 border-cyan-500 hover:border-cyan-400' 
            : 'bg-white border-2 border-cyan-500 hover:border-cyan-400'
        }`}
      >
        {isOpen ? (
          <X className="w-7 h-7 text-cyan-500" />
        ) : (
          <img 
            src={isDarkMode ? darkLogo : lightLogo} 
            alt="Jerome" 
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed right-6 bottom-28 z-40 w-80 sm:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800 border border-slate-700' 
            : 'bg-white border border-slate-200'
        }`}>
          {/* Header */}
          <div className={`p-4 border-b flex items-center gap-3 ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-700' 
              : 'bg-cyan-500 border-cyan-400'
          }`}>
            <img 
              src={isDarkMode ? darkLogo : lightLogo} 
              alt="Jerome" 
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                Resume Assistant
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-cyan-400' : 'text-cyan-100'}`}>
                Ask about Jerome!
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto text-white hover:text-cyan-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-2xl ${
                  message.role === 'user'
                    ? isDarkMode 
                      ? 'bg-cyan-500 text-white rounded-tr-sm' 
                      : 'bg-cyan-500 text-white rounded-tr-sm'
                    : isDarkMode 
                      ? 'bg-slate-700 text-slate-100 rounded-tl-sm' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className={`p-3 rounded-2xl rounded-tl-sm flex items-center gap-2 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-500" />
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>
                    Typing...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${
            isDarkMode 
              ? 'bg-slate-900 border-slate-700' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Jerome..."
                className={`flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                    : 'bg-white border-slate-300 text-slate-800 placeholder-slate-500'
                }`}
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  inputText.trim()
                    ? 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg'
                    : 'bg-slate-400 cursor-not-allowed text-slate-200'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeChatbot;
