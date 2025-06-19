import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Eye, Users, Globe, FileText } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Account Information',
          text: 'When you create a Zenic account, we collect basic information such as your email address, username, and password. This information is necessary to provide you with access to our platform and personalize your experience.'
        },
        {
          subtitle: 'Practice Data',
          text: 'We collect data about your music practice sessions, including practice duration, songs practiced, progress metrics, and performance analytics. This data helps us provide personalized recommendations and track your musical journey.'
        },
        {
          subtitle: 'Device Information',
          text: 'We may collect information about the device you use to access Zenic, including device type, operating system, browser type, and IP address for security and optimization purposes.'
        },
        {
          subtitle: 'Usage Analytics',
          text: 'We collect anonymized usage data to understand how users interact with our platform, which features are most popular, and how we can improve the user experience.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide and maintain the Zenic platform, including AI-powered practice recommendations, progress tracking, and personalized learning experiences.'
        },
        {
          subtitle: 'Personalization',
          text: 'Your practice data helps us customize your experience, suggest relevant songs and exercises, and adapt our AI tutoring to your skill level and musical preferences.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send you important updates about your account, new features, and practice reminders (which you can opt out of at any time).'
        },
        {
          subtitle: 'Improvement and Analytics',
          text: 'Aggregated and anonymized data helps us improve our services, develop new features, and understand user behavior patterns to enhance the overall platform.'
        }
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection and Security',
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Encryption',
          text: 'All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols. Your personal information is stored using advanced encryption methods.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We implement strict access controls and authentication measures to ensure that only authorized personnel can access user data, and only when necessary for service provision or support.'
        },
        {
          subtitle: 'Regular Security Audits',
          text: 'Our systems undergo regular security audits and penetration testing to identify and address potential vulnerabilities before they can be exploited.'
        },
        {
          subtitle: 'Data Minimization',
          text: 'We collect only the data necessary to provide our services and delete information that is no longer needed in accordance with our data retention policies.'
        }
      ]
    },
    {
      id: 'data-sharing',
      title: 'Information Sharing and Disclosure',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Third-Party Services',
          text: 'We may share limited data with trusted third-party service providers who help us operate our platform, such as cloud hosting providers and analytics services. These providers are contractually bound to protect your data.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, court order, or government regulation, or if we believe such disclosure is necessary to protect our rights or the safety of our users.'
        },
        {
          subtitle: 'Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring company, but only under the same privacy protections outlined in this policy.'
        },
        {
          subtitle: 'User Consent',
          text: 'We will never sell your personal information to third parties for marketing purposes. Any sharing beyond what is described here will only occur with your explicit consent.'
        }
      ]
    },
    {
      id: 'user-rights',
      title: 'Your Rights and Controls',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Data Access',
          text: 'You have the right to access and review all personal data we have collected about you. You can request a copy of your data through your account settings or by contacting our support team.'
        },
        {
          subtitle: 'Data Correction',
          text: 'You can update and correct your personal information at any time through your account settings. If you notice any inaccuracies, please let us know so we can correct them promptly.'
        },
        {
          subtitle: 'Data Deletion',
          text: 'You have the right to request deletion of your personal data. When you delete your account, we will remove your personal information from our active systems within 30 days, though some data may be retained for legal or security purposes.'
        },
        {
          subtitle: 'Data Portability',
          text: 'Upon request, we can provide your data in a structured, machine-readable format so you can transfer it to another service if you choose to leave Zenic.'
        }
      ]
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Global Infrastructure',
          text: 'Zenic operates globally and may store and process your data in countries other than where you reside. We ensure that all international transfers comply with applicable data protection laws.'
        },
        {
          subtitle: 'Adequacy Decisions',
          text: 'We only transfer data to countries that have been deemed to provide adequate protection by relevant authorities, or we implement appropriate safeguards such as standard contractual clauses.'
        },
        {
          subtitle: 'Regional Compliance',
          text: 'We comply with regional privacy regulations including GDPR (European Union), CCPA (California), and other applicable privacy laws in jurisdictions where we operate.'
        },
        {
          subtitle: 'Data Localization',
          text: 'Where required by law, we maintain local copies of data within specific jurisdictions and provide users with control over where their data is stored and processed.'
        }
      ]
    }
  ];

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
      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            At Zenic, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This policy explains how we collect, use, and safeguard your data.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            Last updated: January 2025
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-900/30 rounded-xl p-6 mb-12 border border-gray-700/30">
          <h2 className="text-xl font-bold mb-4 text-white">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-3 text-gray-300 hover:text-brand-yellow transition-colors py-2 px-3 rounded-lg hover:bg-gray-800/30"
              >
                <span className="text-brand-brown">{section.icon}</span>
                <span>{index + 1}. {section.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-brown/10 rounded-xl flex items-center justify-center">
                  <span className="text-brand-brown">{section.icon}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {index + 1}. {section.title}
                </h2>
              </div>
              
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-gray-900/20 rounded-xl p-6 border border-gray-700/20">
                    <h3 className="text-lg font-semibold text-brand-yellow mb-3">
                      {item.subtitle}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gray-900/30 rounded-xl p-8 border border-gray-700/30 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            If you have any questions about this Privacy Policy or how we handle your data, 
            please don't hesitate to contact us. We're here to help and ensure your privacy is protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:privacy@zenic.com"
              className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium"
            >
              Contact Privacy Team
            </a>
            <button
              onClick={() => navigate('/faq')}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-colors font-medium"
            >
              View FAQ
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPage; 