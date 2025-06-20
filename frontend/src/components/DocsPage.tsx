import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Play, 
  Settings, 
  Mic, 
  BarChart3, 
  Users, 
  Code, 
  Headphones,
  Music,
  Search,
  ChevronRight,
  ExternalLink,
  Download
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const DocsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Play className="w-5 h-5" />,
      description: 'Learn the basics of using Zenic'
    },
    {
      id: 'ai-features',
      title: 'AI Features',
      icon: <Settings className="w-5 h-5" />,
      description: 'Master AI-powered practice tools'
    },
    {
      id: 'practice-tools',
      title: 'Practice Tools',
      icon: <Music className="w-5 h-5" />,
      description: 'Essential tools for effective practice'
    },
    {
      id: 'audio-setup',
      title: 'Audio Setup',
      icon: <Mic className="w-5 h-5" />,
      description: 'Configure your audio equipment'
    },
    {
      id: 'analytics',
      title: 'Analytics & Progress',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'Track your musical journey'
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: <Code className="w-5 h-5" />,
      description: 'Developer documentation'
    }
  ];

  const documentation = {
    'getting-started': {
      title: 'Getting Started with Zenic',
      items: [
        {
          title: 'Creating Your Account',
          content: `
            <h3>Sign Up Process</h3>
            <p>Getting started with Zenic is simple and free. Follow these steps to create your account:</p>
            <ol>
              <li>Click the "Get Started" button on our homepage</li>
              <li>Enter your email address and create a secure password</li>
              <li>Verify your email address through the confirmation link</li>
              <li>Complete your musical profile setup</li>
            </ol>
            
            <h3>Profile Setup</h3>
            <p>During setup, you'll be asked to:</p>
            <ul>
              <li>Select your primary instrument(s)</li>
              <li>Indicate your current skill level</li>
              <li>Choose your musical goals</li>
              <li>Set practice preferences and schedule</li>
            </ul>
          `
        },
        {
          title: 'First Practice Session',
          content: `
            <h3>Starting Your Journey</h3>
            <p>Your first practice session helps our AI understand your current abilities:</p>
            
            <h4>Initial Assessment</h4>
            <ul>
              <li>Play a simple song or exercise</li>
              <li>Our AI analyzes your technique, timing, and pitch accuracy</li>
              <li>Receive personalized recommendations based on your performance</li>
            </ul>
            
            <h4>Setting Up Practice Goals</h4>
            <p>Define what you want to achieve:</p>
            <ul>
              <li>Daily practice time targets</li>
              <li>Skill development priorities</li>
              <li>Song learning objectives</li>
            </ul>
          `
        },
        {
          title: 'Navigating the Interface',
          content: `
            <h3>Dashboard Overview</h3>
            <p>Your dashboard provides quick access to:</p>
            <ul>
              <li><strong>Practice Sessions:</strong> Start new sessions or continue previous ones</li>
              <li><strong>Progress Tracking:</strong> View your improvement over time</li>
              <li><strong>AI Recommendations:</strong> Personalized practice suggestions</li>
              <li><strong>Song Library:</strong> Browse and search available songs</li>
            </ul>
            
            <h3>Practice Interface</h3>
            <p>During practice sessions, you'll see:</p>
            <ul>
              <li>Real-time feedback on your performance</li>
              <li>Visual indicators for timing and pitch</li>
              <li>Progress bars showing completion status</li>
              <li>Recording controls for playback review</li>
            </ul>
          `
        }
      ]
    },
    'ai-features': {
      title: 'AI-Powered Learning Features',
      items: [
        {
          title: 'Smart Practice Recommendations',
          content: `
            <h3>How It Works</h3>
            <p>Our AI analyzes your practice sessions to provide personalized recommendations:</p>
            
            <h4>Analysis Factors</h4>
            <ul>
              <li>Current skill level and progress rate</li>
              <li>Areas of strength and improvement needed</li>
              <li>Practice frequency and consistency</li>
              <li>Musical preferences and goals</li>
            </ul>
            
            <h4>Recommendation Types</h4>
            <ul>
              <li><strong>Technical Exercises:</strong> Targeted drills for specific skills</li>
              <li><strong>Song Suggestions:</strong> Pieces matching your level and interests</li>
              <li><strong>Practice Scheduling:</strong> Optimal timing and duration</li>
              <li><strong>Difficulty Progression:</strong> Gradual challenge increases</li>
            </ul>
          `
        },
        {
          title: 'Real-Time Feedback System',
          content: `
            <h3>Instant Performance Analysis</h3>
            <p>Get immediate feedback on your playing:</p>
            
            <h4>Pitch Detection</h4>
            <ul>
              <li>Accuracy measurement with 95%+ precision</li>
              <li>Visual indicators for sharp/flat notes</li>
              <li>Intonation improvement suggestions</li>
            </ul>
            
            <h4>Rhythm Analysis</h4>
            <ul>
              <li>Beat accuracy tracking</li>
              <li>Tempo consistency monitoring</li>
              <li>Rhythm pattern recognition</li>
            </ul>
            
            <h4>Technique Assessment</h4>
            <ul>
              <li>Fingering and hand position analysis</li>
              <li>Bowing technique (for string instruments)</li>
              <li>Breath control (for wind instruments)</li>
            </ul>
          `
        }
      ]
    },
    'practice-tools': {
      title: 'Essential Practice Tools',
      items: [
        {
          title: 'Metronome & Tempo Control',
          content: `
            <h3>Built-in Metronome</h3>
            <p>Master timing with our advanced metronome features:</p>
            
            <h4>Features</h4>
            <ul>
              <li>BPM range: 40-200 beats per minute</li>
              <li>Time signatures: 2/4, 3/4, 4/4, 6/8, and more</li>
              <li>Accent patterns for complex rhythms</li>
              <li>Visual and audio cues</li>
            </ul>
            
            <h4>Practice Modes</h4>
            <ul>
              <li><strong>Progressive Tempo:</strong> Gradually increase speed</li>
              <li><strong>Rhythm Trainer:</strong> Focus on specific patterns</li>
              <li><strong>Subdivision Practice:</strong> Quarter, eighth, sixteenth notes</li>
            </ul>
          `
        },
        {
          title: 'Digital Tuner',
          content: `
            <h3>Precision Tuning</h3>
            <p>Keep your instrument perfectly in tune:</p>
            
            <h4>Tuner Features</h4>
            <ul>
              <li>Chromatic tuning with ±0.1 cent accuracy</li>
              <li>Multiple temperaments (Equal, Just, Pythagorean)</li>
              <li>Custom tuning presets</li>
              <li>Transposition for different instruments</li>
            </ul>
          `
        }
      ]
    },
    'audio-setup': {
      title: 'Audio Configuration',
      items: [
        {
          title: 'Microphone Setup',
          content: `
            <h3>Optimal Audio Input</h3>
            <p>Configure your microphone for best results:</p>
            
            <h4>Built-in Microphones</h4>
            <ul>
              <li>Position device 2-3 feet from instrument</li>
              <li>Avoid background noise and echoes</li>
              <li>Use a quiet practice space</li>
              <li>Adjust input sensitivity in settings</li>
            </ul>
            
            <h4>External Microphones</h4>
            <ul>
              <li><strong>USB Microphones:</strong> Plug-and-play convenience</li>
              <li><strong>XLR Microphones:</strong> Professional quality with audio interface</li>
              <li><strong>Instrument Pickups:</strong> Direct connection for electric instruments</li>
            </ul>
          `
        }
      ]
    },
    'analytics': {
      title: 'Progress Analytics',
      items: [
        {
          title: 'Performance Metrics',
          content: `
            <h3>Tracking Your Progress</h3>
            <p>Understand your improvement with detailed analytics:</p>
            
            <h4>Practice Statistics</h4>
            <ul>
              <li>Daily, weekly, and monthly practice time</li>
              <li>Session frequency and consistency</li>
              <li>Goal achievement rates</li>
              <li>Streak tracking and milestones</li>
            </ul>
            
            <h4>Skill Development</h4>
            <ul>
              <li>Accuracy improvement over time</li>
              <li>Tempo progression tracking</li>
              <li>Technical skill advancement</li>
              <li>Song mastery levels</li>
            </ul>
          `
        }
      ]
    },
    'api': {
      title: 'Developer API Reference',
      items: [
        {
          title: 'Authentication',
          content: `
            <h3>API Authentication</h3>
            <p>Secure access to Zenic's developer API:</p>
            
            <h4>Getting Started</h4>
            <pre><code>// Request API key
curl -X POST https://api.zenic.com/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "your@email.com", "password": "your_password"}'</code></pre>
            
            <h4>Authentication Headers</h4>
            <pre><code>Authorization: Bearer YOUR_API_TOKEN
Content-Type: application/json</code></pre>
          `
        }
      ]
    }
  };

  const filteredSections = sections.filter(section => 
    searchQuery === '' || 
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDoc = documentation[activeSection as keyof typeof documentation];

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
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Complete guides and references for mastering Zenic's AI-powered music learning platform. 
            From beginner setup to advanced features and API integration.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/30 border border-gray-700/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-brand-brown focus:bg-gray-900/50 transition-all"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold mb-4 text-brand-yellow">Documentation Sections</h3>
              <nav className="space-y-2">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-brand-brown text-white'
                        : 'bg-gray-900/30 text-gray-300 hover:bg-gray-900/50 hover:text-brand-yellow'
                    }`}
                  >
                    {section.icon}
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-gray-400">{section.description}</div>
                    </div>
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8 p-4 bg-gray-900/30 rounded-xl border border-gray-700/30">
                <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <button 
                    onClick={() => navigate('/faq')}
                    className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors w-full text-left"
                  >
                    <ExternalLink className="w-4 h-4" />
                    FAQ
                  </button>
                  <a href="mailto:support@zenic.com" className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors">
                    <Headphones className="w-4 h-4" />
                    Support
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors">
                    <Download className="w-4 h-4" />
                    PDF Guide
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentDoc && (
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2">{currentDoc.title}</h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-brand-brown to-brand-yellow rounded-full"></div>
                </div>

                {currentDoc.items.map((item, index) => (
                  <div key={index} className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-6 text-brand-yellow flex items-center gap-3">
                      <ChevronRight className="w-6 h-6" />
                      {item.title}
                    </h3>
                    <div 
                      className="prose prose-invert prose-lg max-w-none
                        prose-headings:text-white prose-headings:font-semibold
                        prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6
                        prose-h4:text-lg prose-h4:mb-3 prose-h4:mt-4 prose-h4:text-brand-yellow
                        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                        prose-ul:text-gray-300 prose-li:mb-2
                        prose-ol:text-gray-300 prose-li:text-gray-300
                        prose-strong:text-white prose-strong:font-semibold
                        prose-code:bg-gray-800 prose-code:text-brand-yellow prose-code:px-2 prose-code:py-1 prose-code:rounded
                        prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700/30 prose-pre:rounded-lg prose-pre:p-4"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
            <p className="text-gray-300 mb-6">
              Join our community of musicians or reach out to our support team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/faq')}
                className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium"
              >
                View FAQ
              </button>
              <a 
                href="mailto:support@zenic.com"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-colors font-medium"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DocsPage; 