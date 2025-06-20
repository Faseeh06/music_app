import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, HelpCircle, ChevronDown, ChevronUp, Music, Shield, Settings, Headphones } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-5 h-5" />, count: 18 },
    { id: 'getting-started', name: 'Getting Started', icon: <Music className="w-5 h-5" />, count: 6 },
    { id: 'ai-features', name: 'AI Features', icon: <Settings className="w-5 h-5" />, count: 5 },
    { id: 'privacy', name: 'Privacy & Security', icon: <Shield className="w-5 h-5" />, count: 4 },
    { id: 'technical', name: 'Technical Support', icon: <Headphones className="w-5 h-5" />, count: 3 }
  ];

  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I get started with Zenic?',
      answer: 'Getting started with Zenic is simple! First, create your free account by clicking the "Get Started" button. Once registered, you can choose your instrument(s), set your skill level, and begin with our guided onboarding process. Our AI will assess your current abilities and create a personalized learning path just for you.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'What instruments does Zenic support?',
      answer: 'Zenic currently supports guitar, piano, violin, drums, bass guitar, and vocals. We are continuously adding support for more instruments based on user feedback. Each instrument comes with specialized AI tutors trained specifically for that instrument\'s techniques and repertoire.'
    },
    {
      id: 3,
      category: 'ai-features',
      question: 'How does the AI practice recommendation system work?',
      answer: 'Our AI analyzes your practice sessions, identifies areas for improvement, and suggests personalized exercises and songs. It considers your skill level, musical preferences, practice history, and progress patterns to create recommendations that challenge you appropriately while keeping you engaged.'
    },
    {
      id: 4,
      category: 'ai-features',
      question: 'Can the AI tutor adapt to my learning style?',
      answer: 'Absolutely! Our AI continuously learns from your interactions, practice patterns, and feedback to adapt its teaching approach. Whether you learn better through visual cues, repetition, or theoretical explanations, the AI adjusts its methodology to match your preferred learning style.'
    },
    {
      id: 5,
      category: 'getting-started',
      question: 'Do I need any special equipment to use Zenic?',
      answer: 'For basic use, you only need your instrument and a device with internet access. However, for advanced features like real-time feedback and precise audio analysis, we recommend using a good quality microphone or audio interface. Our app works great with both built-in device microphones and professional audio equipment.'
    },
    {
      id: 6,
      category: 'privacy',
      question: 'How is my practice data protected?',
      answer: 'We take your privacy seriously. All practice data is encrypted both in transit and at rest. Your personal information is never sold to third parties, and you have full control over your data. You can export, modify, or delete your data at any time through your account settings.'
    },
    {
      id: 7,
      category: 'ai-features',
      question: 'How accurate is the AI feedback on my playing?',
      answer: 'Our AI feedback system achieves over 95% accuracy in detecting pitch, timing, and technique issues. The system is continuously improved through machine learning and feedback from professional musicians. While it\'s highly accurate, we always recommend combining AI feedback with occasional lessons from human instructors for the best results.'
    },
    {
      id: 8,
      category: 'getting-started',
      question: 'Can I practice offline?',
      answer: 'Some features of Zenic work offline, including accessing downloaded songs, practice exercises, and basic recording. However, AI analysis, real-time feedback, and progress syncing require an internet connection. We recommend downloading practice materials when you have internet access for offline use.'
    },
    {
      id: 9,
      category: 'technical',
      question: 'What should I do if the app isn\'t recognizing my instrument?',
      answer: 'First, check your microphone permissions and ensure your device\'s microphone is working properly. Make sure you\'re in a quiet environment and your instrument is close enough to the microphone. If issues persist, try adjusting the input sensitivity in the app settings or contact our support team for personalized troubleshooting.'
    },
    {
      id: 10,
      category: 'ai-features',
      question: 'Can I customize my AI tutor\'s personality and teaching style?',
      answer: 'Yes! You can adjust your AI tutor\'s communication style, feedback frequency, and motivational approach in the settings. Choose from different personality types like encouraging, direct, or analytical to match your preferences. You can also set goals and adjust the challenge level to create your ideal learning environment.'
    },
    {
      id: 11,
      category: 'privacy',
      question: 'Does Zenic share my data with other users?',
      answer: 'No, your personal practice data and progress information are completely private. Only anonymized and aggregated data (without any personal identifiers) may be used to improve our AI models and platform features. You can opt out of this data usage in your privacy settings if you prefer.'
    },
    {
      id: 12,
      category: 'getting-started',
      question: 'Is there a mobile app available?',
      answer: 'Yes! Zenic is available on iOS and Android devices, as well as through web browsers on desktop computers. All your progress syncs across devices, so you can practice on your phone, tablet, or computer seamlessly. The mobile apps include all core features with touch-optimized interfaces.'
    },
    {
      id: 13,
      category: 'technical',
      question: 'Why is there a delay in the audio feedback?',
      answer: 'Audio latency can be caused by several factors including your device\'s processing power, audio drivers, or internet connection. Try using wired headphones instead of Bluetooth, close other applications, and ensure you have a stable internet connection. For the best experience, we recommend using devices with at least 4GB of RAM.'
    },
    {
      id: 14,
      category: 'ai-features',
      question: 'How often does the AI update my learning path?',
      answer: 'The AI continuously analyzes your progress and adjusts recommendations in real-time. Major learning path updates typically occur after each practice session, while minor adjustments happen throughout your practice. You\'ll see significant path changes when you master new skills or when the AI identifies areas that need additional focus.'
    },
    {
      id: 15,
      category: 'privacy',
      question: 'Can I use Zenic without creating an account?',
      answer: 'While some basic features can be accessed without an account, creating a free account unlocks the full potential of Zenic, including personalized AI tutoring, progress tracking, and cloud sync across devices. Account creation is free and only requires an email address.'
    },
    {
      id: 16,
      category: 'getting-started',
      question: 'What skill levels does Zenic cater to?',
      answer: 'Zenic is designed for all skill levels, from complete beginners to advanced musicians. Our AI assessment creates appropriate challenges regardless of your starting point. Beginners get foundational lessons and basic techniques, while advanced players receive complex arrangements and professional-level feedback.'
    },
    {
      id: 17,
      category: 'technical',
      question: 'How much storage space does Zenic require?',
      answer: 'The Zenic app itself requires about 150MB of storage space. Additional space is needed for downloaded songs and recorded practice sessions, typically 2-5MB per song. You can manage storage by deleting old recordings and removing downloaded songs you no longer need.'
    },
    {
      id: 18,
      category: 'privacy',
      question: 'How long is my data retained?',
      answer: 'Your practice data and progress information are retained as long as your account is active. After account deletion, most data is permanently removed within 30 days, though some anonymized analytics data may be retained longer for service improvement. You can request complete data deletion by contacting our privacy team.'
    }
  ];

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#101218] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-brand-brown/20 via-brand-brown/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-radial from-brand-yellow/10 via-brand-yellow/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-radial from-brand-brown/15 via-brand-brown/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about Zenic's AI-powered music learning platform. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-brown focus:bg-gray-900/50 transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-brand-brown text-white border-brand-brown'
                  : 'bg-gray-900/30 text-gray-300 border-gray-700/30 hover:border-brand-brown/50 hover:text-brand-yellow hover:bg-gray-900/50'
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
              <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search terms or selecting a different category.</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-xl overflow-hidden hover:border-brand-brown/50 transition-all duration-200"
              >
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-900/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white pr-4 flex-1">
                    {faq.question}
                  </h3>
                  {expandedItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-brand-brown flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedItems.includes(faq.id) && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700/30 pt-4">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-gray-300 mb-6">
              Our support team is here to help you get the most out of your Zenic experience. 
              We typically respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@zenic.com"
                className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium"
              >
                Contact Support
              </a>
              <button
                onClick={() => navigate('/privacy')}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-colors font-medium"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQPage; 