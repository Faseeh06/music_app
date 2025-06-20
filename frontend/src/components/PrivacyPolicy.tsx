import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';
import zenicBanner from '../assets/images/zenic_banner.png';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Account Information',
          text: 'When you create an account, we collect your email address, username, and profile information you choose to provide.'
        },
        {
          subtitle: 'Practice Data',
          text: 'We collect data about your music practice sessions, including songs practiced, session duration, performance metrics, and progress tracking.'
        },
        {
          subtitle: 'Device Information',
          text: 'We may collect information about the device you use to access Zenic, including device type, operating system, and browser information.'
        },
        {
          subtitle: 'Usage Analytics',
          text: 'We collect anonymized data about how you use our platform to improve our services and AI recommendations.'
        }
      ]
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Information',
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Personalized AI Tutoring',
          text: 'Your practice data helps our AI provide personalized recommendations, track your progress, and adapt lessons to your skill level.'
        },
        {
          subtitle: 'Service Improvement',
          text: 'We use aggregated, anonymized data to improve our platform, develop new features, and enhance the overall user experience.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your email address to send important service updates, practice reminders, and promotional content (which you can opt out of).'
        },
        {
          subtitle: 'Support Services',
          text: 'Your information helps us provide customer support and troubleshoot technical issues.'
        }
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection & Security',
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmission is encrypted using industry-standard SSL/TLS protocols. Your practice data is encrypted both in transit and at rest.'
        },
        {
          subtitle: 'Local Storage',
          text: 'Practice sessions and personal data are primarily stored locally on your device, with minimal cloud synchronization for backup and multi-device access.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls and authentication measures to ensure only authorized personnel can access user data for legitimate business purposes.'
        },
        {
          subtitle: 'Regular Audits',
          text: 'Our security practices undergo regular audits and compliance checks to maintain the highest standards of data protection.'
        }
      ]
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing & Third Parties',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          subtitle: 'No Sale of Personal Data',
          text: 'We never sell your personal information or practice data to third parties. Your musical journey is private and belongs to you.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share limited data with trusted service providers who help us operate our platform, such as cloud hosting and analytics services.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose information if required by law, court order, or to protect the rights and safety of our users and platform.'
        },
        {
          subtitle: 'Anonymized Analytics',
          text: 'We may share aggregated, anonymized usage statistics to help improve music education and AI development, but this never includes personal identifiers.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights & Choices',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Data Access',
          text: 'You can request a copy of all personal data we have about you at any time through your account settings or by contacting our support team.'
        },
        {
          subtitle: 'Data Correction',
          text: 'You can update, correct, or modify your personal information and practice preferences through your account dashboard.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You can request deletion of your account and associated data. We will permanently delete your information within 30 days of your request.'
        },
        {
          subtitle: 'Opt-Out Options',
          text: 'You can opt out of promotional emails, data analytics, and certain AI features while still maintaining core platform functionality.'
        }
      ]
    },
    {
      id: 'international',
      title: 'International Data Transfers',
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Regional Compliance',
          text: 'We comply with GDPR, CCPA, and other regional privacy regulations. Data processing practices are adapted to meet local requirements.'
        },
        {
          subtitle: 'Data Localization',
          text: 'Where possible, we store and process data in your region. Cross-border transfers are protected by appropriate safeguards and legal frameworks.'
        },
        {
          subtitle: 'Safe Harbor Provisions',
          text: 'International data transfers are conducted under approved mechanisms such as Standard Contractual Clauses and adequacy decisions.'
        }
      ]
    }
  ];

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
              onClick={() => navigate('/signin')}
              className="px-4 py-2 text-gray-300 hover:text-brand-yellow transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/signup')}
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
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Privacy
            </span>
            <span className="bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">
              {" "}Policy
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Your privacy is fundamental to everything we do. Learn how we protect and handle your data.
          </p>
          
          <div className="text-sm text-gray-400">
            Last updated: December 2024
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 py-8 bg-[#101218] relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-brown/10 hover:border-brand-brown/20 border border-transparent transition-all group"
                >
                  <div className="text-brand-brown group-hover:text-brand-yellow transition-colors">
                    {section.icon}
                  </div>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {section.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="px-6 py-12 bg-[#101218] relative">
        <div className="max-w-4xl mx-auto relative z-10 space-y-16">
          {sections.map((section, sectionIndex) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-brand-brown/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-8">
                  <div className="text-brand-brown p-3 bg-brand-brown/10 rounded-xl">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-8">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-l-2 border-brand-brown/30 pl-6">
                      <h3 className="text-xl font-semibold text-brand-yellow mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 py-16 bg-[#101218] relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">Questions About Privacy?</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your data, 
              we're here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-brand-brown text-white font-semibold rounded-lg hover:bg-brand-brown/90 hover:shadow-2xl hover:shadow-brand-brown/25 transition-all"
              >
                Contact Support
              </button>
              <button 
                onClick={() => navigate('/faq')}
                className="px-8 py-4 border-2 border-brand-brown text-brand-brown font-semibold rounded-lg hover:bg-brand-brown hover:text-white hover:shadow-2xl hover:shadow-brand-brown/25 transition-all"
              >
                View FAQ
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

export default PrivacyPolicy; 