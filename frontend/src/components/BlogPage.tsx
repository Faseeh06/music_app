import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Music, Headphones, TrendingUp, BookOpen, Play } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  const featuredPost = {
    id: 1,
    title: "The Science Behind AI-Powered Music Learning",
    excerpt: "Discover how artificial intelligence is revolutionizing the way we learn and practice music, backed by cognitive science research.",
    author: "Dr. Sarah Chen",
    date: "January 15, 2025",
    readTime: "8 min read",
    category: "AI & Technology",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "5 Essential Practice Techniques Every Musician Should Know",
      excerpt: "Master these fundamental practice methods to accelerate your musical progress and build lasting skills.",
      author: "Marcus Rodriguez",
      date: "January 12, 2025",
      readTime: "6 min read",
      category: "Practice Tips",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Building a Sustainable Daily Practice Routine",
      excerpt: "Learn how to create and maintain a practice schedule that fits your lifestyle and maximizes your progress.",
      author: "Emma Thompson",
      date: "January 10, 2025",
      readTime: "5 min read",
      category: "Productivity",
      image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 4,
      title: "The Psychology of Musical Performance Anxiety",
      excerpt: "Understanding and overcoming stage fright with proven psychological techniques and mindfulness practices.",
      author: "Dr. James Wilson",
      date: "January 8, 2025",
      readTime: "7 min read",
      category: "Mental Health",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Exploring World Music: Broadening Your Musical Horizons",
      excerpt: "Dive into diverse musical traditions from around the globe and incorporate new styles into your practice.",
      author: "Yuki Tanaka",
      date: "January 5, 2025",
      readTime: "9 min read",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Technology in Music Education: Tools for Modern Musicians",
      excerpt: "Explore the latest apps, software, and hardware that can enhance your musical learning experience.",
      author: "Alex Kim",
      date: "January 3, 2025",
      readTime: "6 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 7,
      title: "Mastering Music Theory: A Beginner's Guide",
      excerpt: "Break down complex music theory concepts into digestible lessons that will improve your understanding and playing.",
      author: "Professor Maria Garcia",
      date: "December 30, 2024",
      readTime: "10 min read",
      category: "Theory",
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    }
  ];

  const categories = [
    { name: "All Posts", count: 47, active: true },
    { name: "AI & Technology", count: 12 },
    { name: "Practice Tips", count: 15 },
    { name: "Theory", count: 8 },
    { name: "Mental Health", count: 6 },
    { name: "Culture", count: 4 },
    { name: "Productivity", count: 2 }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI & Technology': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Practice Tips': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Theory': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Mental Health': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
      case 'Culture': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Productivity': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

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
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Zenic Blog</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Insights, tips, and stories from the world of AI-powered music learning. 
            Discover expert advice to accelerate your musical journey.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                category.active 
                  ? 'bg-brand-brown text-white border-brand-brown' 
                  : 'bg-gray-800/30 text-gray-300 border-gray-600/30 hover:border-brand-brown/50 hover:text-brand-yellow'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Article</h2>
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl overflow-hidden hover:border-brand-brown/50 transition-all duration-300 group">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(featuredPost.category)}`}>
                    {featuredPost.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-brand-yellow transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium w-fit">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl overflow-hidden hover:border-brand-brown/50 hover:bg-gray-900/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-white group-hover:text-brand-yellow transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-gray-300 mb-6">
              Get the latest insights on AI-powered music learning, practice tips, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-brown"
              />
              <button className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium">
                Subscribe
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

export default BlogPage; 