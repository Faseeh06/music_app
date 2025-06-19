import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp, Search, Music, Bot, Shield, Zap } from 'lucide-react';
import zenicBanner from '../assets/images/zenic_banner.png';

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);

  const categories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Music className="w-5 h-5" />,
      color: 'text-brand-brown'
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      icon: <Bot className="w-5 h-5" />,
      color: 'text-brand-yellow'
    },
    {
      id: 'privacy-security',
      title: 'Privacy & Security',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-blue-400'
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: <Zap className="w-5 h-5" />,
      color: 'text-green-400'
    }
  ];

  const faqs = [
    {
      category: 'getting-started',
      question: 'How do I get started with Zenic?',
      answer: 'Getting started is easy! Simply create a free account, choose your instrument, and begin your first practice session. Our AI will assess your skill level and provide personalized recommendations from day one.'
    },
    {
      category: 'getting-started',
      question: 'What instruments are supported?',
      answer: 'Zenic supports guitar, piano, vocals, drums, bass, violin, and many other instruments. Our AI adapts to each instrument\'s unique characteristics and provides specific feedback and exercises.'
    },
    {
      category: 'getting-started',
      question: 'Do I need any special equipment?',
      answer: 'For basic practice, you just need your instrument and a device with internet connection. For advanced features like real-time audio analysis, we recommend a good microphone or audio interface.'
    },
    {
      category: 'getting-started',
      question: 'Is there a free trial?',
      answer: 'Yes! Zenic offers a free tier with basic practice tracking and AI recommendations. You can upgrade to premium for advanced features like detailed analytics and unlimited practice sessions.'
    },
    {
      category: 'ai-features',
      question: 'How does the AI tutor work?',
      answer: 'Our AI analyzes your practice sessions in real-time, tracking accuracy, timing, and technique. It provides instant feedback and creates personalized lesson plans based on your progress and learning style.'
    },
    {
      category: 'ai-features',
      question: 'Can I customize my AI tutor?',
      answer: 'Absolutely! You can adjust your AI tutor\'s teaching style, focus areas, difficulty progression, and even personality. Create multiple AI tutors for different aspects of your musical journey.'
    },
    {
      category: 'ai-features',
      question: 'How accurate is the AI feedback?',
      answer: 'Our AI uses advanced machine learning algorithms trained on thousands of hours of musical data. It achieves over 95% accuracy in rhythm detection and 90% in pitch recognition, continuously improving with updates.'
    },
    {
      category: 'ai-features',
      question: 'Does the AI work offline?',
      answer: 'Basic practice tracking works offline, but AI analysis and recommendations require an internet connection. Your practice data syncs automatically when you\'re back online.'
    },
    {
      category: 'privacy-security',
      question: 'Is my practice data private?',
      answer: 'Yes, your practice data is completely private. We use end-to-end encryption and store most data locally on your device. We never sell your personal information or practice data to third parties.'
    },
    {
      category: 'privacy-security',
      question: 'Can I delete my data?',
      answer: 'You have full control over your data. You can export, modify, or permanently delete your account and all associated data at any time through your account settings.'
    },
    {
      category: 'privacy-security',
      question: 'How do you protect my information?',
      answer: 'We use industry-standard security measures including SSL encryption, secure cloud storage, and regular security audits. Your data is protected by the same standards used by major financial institutions.'
    },
    {
      category: 'technical',
      question: 'What devices are supported?',
      answer: 'Zenic works on Windows, macOS, iOS, and Android. We also offer a web version that works in any modern browser. All your data syncs seamlessly across devices.'
    },
    {
      category: 'technical',
      question: 'Why is my audio not being detected?',
      answer: 'Check your microphone permissions and ensure your input device is selected correctly. For best results, use a good quality microphone and practice in a quiet environment.'
    },
    {
      category: 'technical',
      question: 'How do I sync across multiple devices?',
      answer: 'Once logged in, your data automatically syncs across all your devices. Make sure you\'re connected to the internet and logged into the same account on each device.'
    },
    {
      category: 'technical',
      question: 'What should I do if the app crashes?',
      answer: 'First, try restarting the app. If problems persist, check for updates or contact our support team. We typically respond within 24 hours and provide personalized troubleshooting assistance.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#101218] text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-brand-brown/20 via-brand-brown/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-brand-yellow/10 via-brand-yellow/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-brand-brown/15 via-brand-brown/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            <img src={zenicBanner} alt="Zenic" className="h-8 object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/auth')}
              className="px-4 py-2 text-gray-300 hover:text-brand-yellow transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="px-6 py-2 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-all shadow-lg hover:shadow-brand-brown/25"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative px-6 py-16">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-8">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Frequently Asked
            </span>
            <br />
            <span className="bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">
              Questions
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Find answers to common questions about Zenic and get the help you need.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:border-brand-brown focus:outline-none focus:ring-2 focus:ring-brand-brown/20 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-8 bg-[#101218] relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:border-brand-brown/50 hover:bg-gray-900/50 transition-all duration-300 text-center group cursor-pointer"
              >
                <div className={`${category.color} group-hover:text-brand-yellow transition-colors mb-3 flex justify-center`}>
                  {category.icon}
                </div>
                <h3 className="text-white font-semibold text-sm group-hover:text-brand-yellow transition-colors">
                  {category.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-6 py-12 bg-[#101218] relative">
        <div className="max-w-4xl mx-auto relative z-10">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-400">No questions found matching your search.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-brand-brown hover:text-brand-yellow transition-colors"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => {
                const category = categories.find(cat => cat.id === faq.category);
                return (
                  <div 
                    key={index}
                    className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl overflow-hidden hover:border-brand-brown/30 transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleQuestion(index)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-900/20 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`${category?.color} p-2 bg-gray-800/50 rounded-lg`}>
                          {category?.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="text-brand-brown">
                        {openQuestion === index ? 
                          <ChevronUp className="w-5 h-5" /> : 
                          <ChevronDown className="w-5 h-5" />
                        }
                      </div>
                    </button>
                    
                    {openQuestion === index && (
                      <div className="px-6 pb-6 border-t border-gray-700/30">
                        <div className="pt-4 pl-12">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16 bg-[#101218] relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Still Have Questions?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Can't find what you're looking for? Our support team is here to help you 
              get the most out of your musical journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-brand-brown text-white font-semibold rounded-lg hover:bg-brand-brown/90 hover:shadow-2xl hover:shadow-brand-brown/25 transition-all"
              >
                Contact Support
              </button>
              <button 
                onClick={() => navigate('/privacy')}
                className="px-8 py-4 border-2 border-brand-brown text-brand-brown font-semibold rounded-lg hover:bg-brand-brown hover:text-white hover:shadow-2xl hover:shadow-brand-brown/25 transition-all"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800 bg-[#101218]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img src={zenicBanner} alt="Zenic" className="h-8 object-contain" />
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 Zenic. All rights reserved. AI-powered music learning platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FAQPage; 