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
      title: "高度な分析",
      description: "AIによる詳細なパフォーマンス洞察とパーソナライズされた練習推奨を取得"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "スマート学習",
      description: "あなたのスキルレベルと音楽の好みに適応するAI搭載のアダプティブ学習"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "安全なプラットフォーム",
      description: "プライバシーを重視した安全な学習環境で安心して練習"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "コミュニティ主導",
      description: "世界中のミュージシャンとつながり、プロフェッショナルのコミュニティから学習"
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
                        {/* Small Badge */}            <div className="inline-flex items-center gap-3 bg-gray-600/20 border border-gray-600/30 px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse"></div>
              <span className="text-base text-white font-medium">音楽練習を効率化し、楽器をマスターする</span>
        </div>
        
            {/* Main Heading */}            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                練習する
              </span>
              <span className="mx-1 md:mx-3"></span>
              <span className="bg-gradient-to-r from-brand-brown via-brand-yellow to-brand-brown bg-clip-text text-transparent">
                ZENIC
              </span>
          </h1>
          
            {/* Subtitle */}            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Zenicであなたの音楽キャリアを向上させ
              <br className="hidden md:block" />
              移動中でも練習しましょう。
            </p>

            {/* CTA Buttons */}            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-all shadow-xl hover:shadow-brand-brown/25 flex items-center gap-3 font-semibold text-lg"
              >
                無料で始める
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-all font-semibold text-lg">
                コミュニティに参加
            </button>
            </div>

            {/* Trust Indicators */}            <div className="text-center text-gray-400 text-sm mb-4">
              何千人ものミュージシャンが参加
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
        
        <div className="max-w-7xl mx-auto relative z-10">          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-brand-brown">本物の</span>
              <span className="bg-gradient-to-r from-brand-yellow to-brand-brown bg-clip-text text-transparent">AI</span> 
              <span className="text-white">エンジンで練習</span>
          </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Zenicは自然な会話でヒューマンAIコラボレーションの可能性を解き放ちます。
              <span className="text-brand-yellow">@エージェント</span> <span className="text-brand-yellow">@コンテキスト</span>で、
              Zenicがあなたの練習を完了させます。
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
            <div className="space-y-6">              <div className="inline-block">
                <span className="text-sm font-semibold text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-full">
                  #1 エージェント
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                あなた専用の
                <br />
                <span className="text-brand-brown">AIチューターをカスタマイズ</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Traeはミュージシャン向けに設計された強力で完全に設定可能な
                エージェントシステムを導入します。即座の練習ガイダンスには
                事前構築されたAIチューターを使用するか、ツール、スキル、
                年齢ベースのエージェントをカスタマイズして最適な分野に
                焦点を当てた独自のAIチューターを作成します。TraeのAI方式があなたのためにあります。
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
            <div className="space-y-6">              <div className="inline-block">
                <span className="text-sm font-semibold text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-full">
                  #1 ツール
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                より多くのツール、
                <br />
                <span className="text-brand-brown">より多くの機能</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Traeはさまざまな外部ツールとの統合をサポートし、
                エージェントがそれらを使用できるようにします。現在、
                モデルコンテキストプロトコル（MCP）標準をサポートしており、
                タスクをより良く実行するための豊富な
                リソースへのアクセスを可能にします。
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
            <div className="space-y-6">              <div className="inline-block">
                <span className="text-sm font-semibold text-brand-brown bg-brand-brown/10 px-3 py-1 rounded-full">
                  #1 コンテキスト
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                より多くのコンテキスト、
                <br />
                <span className="text-brand-brown">より高い精度</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                TraeはVSを介したコードベース統合やオンライン
                リソースからの外部情報を通じて、あなたの開発
                コンテキストを深く理解できます。Traeで作成した
                ドキュメントやワークフローの音楽指導により、
                タスクをより正確に実行できます。
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {['メトロノーム', 'チューナー', 'タブ譜', 'コード', '音楽理論'].map((tool, index) => (
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
            </div>            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              プライバシーとセキュリティ
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              私たちはユーザーのプライバシーとデータセキュリティの保護を優先し、「ローカルファースト」と「最小限のデータ収集」の原則を遵守しています。
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">            {[
              {
                icon: <BarChart3 className="w-8 h-8 text-brand-brown" />,
                title: "ローカルデータストレージ",
                description: "コードベースはお客様のデバイス上でローカルに保存され、データをユーザーの近くに保ちながらアクセシビリティを確保し、データベースへのデータ保護を優先します。"
              },
              {
                icon: <Shield className="w-8 h-8 text-brand-brown" />,
                title: "安全なデータアクセス",
                description: "厳格なアクセス制御と暗号化された送信により、あなたの練習データと音楽のセキュリティルールが確保されます。"
              },
              {
                icon: <Users className="w-8 h-8 text-brand-brown" />,
                title: "地域別展開",
                description: "ユーザーデータとインフラストラクチャは地域の場所に基づいて展開され、選択肢を提供します。どこでも展開可能なコンプライアンスにより、重要な事項を維持できます。"
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
        <div className="max-w-6xl mx-auto text-center relative z-10">          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ミュージシャンに愛されています
          </h2>
          <p className="text-xl text-gray-300 mb-16">
            Traeは世界中のミュージシャンに人気です。
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">            {[
              {
                name: "カイ・スミス・パソン",
                role: "プロギタリスト",
                content: "Cursor統合がAI練習を私のワークスペースに素晴らしい方法で持ち込んでくれると思います。レッスン計画と練習管理に役立つゲームチェンジャーです。"
              },
              {
                name: "スティーブ・マークス",
                role: "音楽教師",
                content: "生徒のためのAIベースのギターレッスンと練習セッションを見つけてから、教えることがこれまでにないほど効果的になりました。"
              },
              {
                name: "アルビナ・カーセル",
                role: "バイオリニスト",
                content: "私の進歩を理解し、改善を助ける完璧な練習パートナーを持つことをいつも夢見ていました。Zenicはまさにそれを実現し、練習時間の追跡、マイルストーンの取得など、素晴らしい機能があります。"
              },
              {
                name: "ozanseriamp",
                role: "ピアニスト",
                content: "AIを教室のアシスタントとして使用し、コード進行、スケール、音楽理論について質問に答えてくれる音楽チューターを持つのが大好きです。ただ素晴らしく、クリーンで美しいデザインと機能性です。"
              },
              {
                name: "ミーシャ・エシカエフ",
                role: "音楽プロデューサー",
                content: "Zenic TraeのeFiftyishで、このツールはクリーンな作業を行い、ワークフローでユーザーと最高の体験と最高のクラス機能を構築します。"
              },
              {
                name: "ギタウタス・マーク・ヴィトリー",
                role: "ベース奏者",
                content: "録音で最も偉大なミュージシャンの一人として価値を得て、彼らの簡単さで最も多くの経験を持つすべての最高の作業があり、それは最高ではないかもしれません。"
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
        <div className="max-w-6xl mx-auto text-center relative z-10">          <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-white to-brand-yellow bg-clip-text text-transparent">
            世界中のミュージシャンに信頼されています
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "アクティブミュージシャン" },
              { number: "1M+", label: "練習セッション" },
              { number: "10K+", label: "楽曲ライブラリ" },
              { number: "99%", label: "ユーザー満足度" }
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
        
        <div className="max-w-4xl mx-auto relative z-10">          <div className="text-center mb-8">
            <span className="text-sm text-gray-400 uppercase tracking-wider">すべての機能をチェック →</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">無料で </span>
            <span className="bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">始める</span>
            </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            無料で始めて、強力なAIコーディングツールフローの
            コミュニティ無料ワーカーをお楽しみください。
          </p>
          
          <div className="mb-16">
              <button 
                onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-brown to-brand-yellow text-white font-semibold rounded-lg hover:shadow-2xl hover:shadow-brand-brown/25 transition-all text-lg"
            >
              <Music className="w-5 h-5" />
              始める
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