import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Music, 
  Users, 
  BarChart3,
  Shield,
  Zap,
  ArrowRight
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import landingPage1 from '../assets/images/landing_page1.png';
import landingPage2 from '../assets/images/landing_page2.png';
import landingPage3 from '../assets/images/landing_page3.png';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Get detailed performance insights and personalized practice recommendations powered by AI"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Learning",
      description: "AI-powered adaptive learning that adjusts to your skill level and musical preferences"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Practice with confidence on our secure, privacy-focused learning environment"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Connect with musicians worldwide and learn from a community of professionals"
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

            {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
                        {/* Small Badge */}
            <div className="inline-flex items-center gap-3 bg-gray-600/20 border border-gray-600/30 px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse"></div>
              <span className="text-base text-white font-medium">Streamline music practice and master your instrument</span>
        </div>
        
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                Practice with
              </span>
              <span className="mx-1 md:mx-3"></span>
              <span className="bg-gradient-to-r from-brand-brown via-brand-yellow to-brand-brown bg-clip-text text-transparent">
                ZENIC
              </span>
          </h1>
          
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Enhance you music career with Zenic and
              <br className="hidden md:block" />
              practice  on the go.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-all shadow-xl hover:shadow-brand-brown/25 flex items-center gap-3 font-semibold text-lg"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-all font-semibold text-lg">
                Join our Community
            </button>
            </div>

            {/* Trust Indicators */}
            <div className="text-center text-gray-400 text-sm mb-4">
              Join thousands of musicians
            </div>
              </div>

          {/* Preview Interface */}
          <div className="relative max-w-7xl mx-auto">
            <div className="bg-[#101218]/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
              <div className="bg-gradient-to-br from-[#101218] to-[#0a0b0f] rounded-xl overflow-hidden">
                <iframe 
                  width="100%" 
                  height="600"
                  src="https://www.youtube.com/embed/hAP2QF--2Dg" 
                  title="Zenic Practice Demo"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborate Section */}
      <section className="relative px-6 py-24 bg-[#101218]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-brand-brown/10 via-brand-brown/3 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-brand-yellow/8 via-brand-yellow/2 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-brand-brown">Practice with</span> The Real
              <span className="bg-gradient-to-r from-brand-yellow to-brand-brown bg-clip-text text-transparent">AI</span> 
              <span className="text-white"> Engine</span>
          </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Zenic enables natural conversations to unlock possibilities for Human-AI 
              collaboration; just <span className="text-brand-yellow">@Agent</span> <span className="text-brand-yellow">@Context</span>, and 
              Zenic will get your practice done.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-brand-brown/50 hover:bg-gray-900/70 transition-all duration-300 h-full">
                  <div className="text-brand-brown mb-4 p-3 bg-brand-brown/10 rounded-lg w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-brand-yellow transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Customize Practice Sessions */}
      <section className="px-6 py-24 bg-[#101218] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-brown/20 via-brand-yellow/10 to-transparent rounded-2xl p-2">
                <div className="bg-gradient-to-br from-[#101218] to-[#0a0b0f] rounded-xl overflow-hidden">
                  <img 
                    src={landingPage1}
                    alt="AI Tutors Demo"
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-full">
                  #1 Agent
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Customize your
                <br />
                <span className="text-brand-brown">own AI Tutors</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Trae introduces a powerful, fully configurable 
                Agent system designed for musicians. Use 
                pre-built AI tutors for instant practice guidance, or create your own AI tutor by customizing 
                tools, skills, and age-based Agent focused on 
                what it does best. With Trae AI-way means for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Tools Section */}
      <section className="px-6 py-24 bg-[#101218] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-full">
                  #1 Tool
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                More tools,
                <br />
                <span className="text-brand-brown">more capabilities</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Trae supports integration with various external 
                tools and enables agents to use them. Currently, 
                it supports the Model Context Protocol (MCP) 
                standard, which unlocks access to vast 
                resources to better execute your tasks.
              </p>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-yellow/20 via-brand-brown/10 to-transparent rounded-2xl p-2">
                <div className="bg-gradient-to-br from-[#101218] to-[#0a0b0f] rounded-xl overflow-hidden">
                  <img 
                    src={landingPage2}
                    alt="Music Practice Tools Demo"
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Context Section */}
      <section className="px-6 py-24 bg-[#101218] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-brand-brown/20 via-brand-yellow/10 to-transparent rounded-2xl p-2">
                <div className="bg-gradient-to-br from-[#101218] to-[#0a0b0f] rounded-xl overflow-hidden">
                  <img 
                    src={landingPage3}
                    alt="Practice Analytics Demo"
                    className="w-full h-[400px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
            
            {/* Right side - Content */}
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm font-semibold text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-full">
                  #1 Context
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                More context,
                <br />
                <span className="text-brand-brown">more accuracy</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Trae can deeply understand your development 
                context through your codebase integration via the 
                VS, as well as external information from online 
                resources. Documents that you may have 
                created in Trae, and any music instruction 
                in your workflows, enabling it to execute tasks 
                more accurately more.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {['Metronome', 'Tuner', 'Tabs', 'Chords', 'Theory'].map((tool, index) => (
                  <span key={index} className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-gray-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy and Security */}
      <section className="px-6 py-24 bg-[#101218] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-brand-brown/8 via-brand-brown/2 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mb-16">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy and Security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We prioritize protecting users' privacy and data security, adhering to the principle of 'local first' and 'minimal data collection'.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-brand-brown" />,
                title: "Local Data Storage",
                description: "Codebases live and stored locally on your devices, for keeping data close to the user while ensuring accessibility, with prioritizing data protection to database."
              },
              {
                icon: <Shield className="w-8 h-8 text-brand-brown" />,
                title: "Secure Data Access",
                description: "Strict access control and encrypted transmission are enforced to ensure your practice data and music requires to security rules."
              },
              {
                icon: <Users className="w-8 h-8 text-brand-brown" />,
                title: "Regional Deployment",
                description: "User data and infrastructure are deployed based on regional locations, giving you the choice. Deploy-anywhere compliance with local regulations allows the you maintain importants."
              }
            ].map((item, index) => (
              <div key={index} className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 hover:border-brand-brown/50 hover:bg-gray-900/50 transition-all duration-300">
                <div className="bg-brand-brown/10 rounded-xl p-4 w-fit mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loved by Musicians */}
      <section className="px-6 py-24 bg-[#101218] relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by Musicians
          </h2>
          <p className="text-xl text-gray-300 mb-16">
            Trae is popular among musicians worldwide.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Kai Smith Pason",
                role: "Professional Guitarist",
                content: "I think Cursor integration brings AI practice to my workspace in an awesome way. It's a game changer that helps with lesson planning and practice management."
              },
              {
                name: "Steve Marks",
                role: "Music Teacher",
                content: "Since I found AI-based guitar lessons and practice sessions for my students, teaching has never been more effective."
              },
              {
                name: "Albina Karsel",
                role: "Violinist",
                content: "I've always dreamed of having a perfect practice companion that understands my progress and helps me improve. Zenic does exactly that and it's amazing for tracking my practice time, getting my milestones and so much more."
              },
              {
                name: "ozanseriamp",
                role: "Pianist",
                content: "I love using AI as a classroom assistant, having a music tutor that can answer questions about chord progressions, scales, and theory. Just amazing, just clean, beautiful design and functionality."
              },
              {
                name: "Misha Esikaev",
                role: "Music Producer",
                content: "Zenic Trae's eFiftyish, and this tool does clean work, building your best experiences and best in class features with users in the workflow."
              },
              {
                name: "Gytautas Mark Vitriys",
                role: "Bass Player",
                content: "Getting value as one of the greatest musicians in recording and they have that are all greatest amount of experience with their easy is just not very easy, may be best all the best work and it is may not."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-6 hover:border-brand-brown/50 hover:bg-gray-900/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-full"></div>
                  <div>
                    <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-gray-400 text-xs">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-24 bg-[#101218] relative">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-white to-brand-yellow bg-clip-text text-transparent">
            Trusted by Musicians Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Active Musicians" },
              { number: "1M+", label: "Practice Sessions" },
              { number: "10K+", label: "Songs Library" },
              { number: "99%", label: "User Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 p-8 rounded-2xl hover:border-brand-brown hover:bg-gray-900/50 transition-all duration-300">
                  <div className="text-4xl font-bold mb-3 bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="px-6 py-24 text-center bg-[#101218] relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-brand-brown/15 via-brand-brown/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-radial from-brand-yellow/10 via-brand-yellow/3 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-sm text-gray-400 uppercase tracking-wider">Check out all features →</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">Get Started for </span>
            <span className="bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">Free</span>
            </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Go to the first in your free and enjoy the community free worker among 
            powerful AI coding tools flow.
          </p>
          
          <div className="mb-16">
              <button 
                onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-brown to-brand-yellow text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-brand-brown/25 transition-all text-lg"
            >
              <Music className="w-5 h-5" />
              Get Started
              </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage; 