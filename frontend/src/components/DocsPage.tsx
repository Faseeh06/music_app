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
      title: 'はじめに',
      icon: <Play className="w-5 h-5" />,
      description: 'Zenicの基本的な使い方を学ぶ'
    },
    {
      id: 'ai-features',
      title: 'AI機能',
      icon: <Settings className="w-5 h-5" />,
      description: 'AI搭載練習ツールをマスターする'
    },
    {
      id: 'practice-tools',
      title: '練習ツール',
      icon: <Music className="w-5 h-5" />,
      description: '効果的な練習のための必須ツール'
    },
    {
      id: 'audio-setup',
      title: 'オーディオ設定',
      icon: <Mic className="w-5 h-5" />,
      description: 'オーディオ機器の設定'
    },    {
      id: 'analytics',
      title: '分析と進歩',
      icon: <BarChart3 className="w-5 h-5" />,
      description: 'あなたの音楽の旅を追跡する'
    },
    {
      id: 'api',
      title: 'APIリファレンス',
      icon: <Code className="w-5 h-5" />,
      description: '開発者向けドキュメント'
    }
  ];
  const documentation = {
    'getting-started': {
      title: 'Zenicの始め方',
      items: [
        {
          title: 'アカウントの作成',
          content: `
            <h3>サインアップの手順</h3>
            <p>Zenicを始めるのは簡単で無料です。以下の手順に従ってアカウントを作成してください：</p>
            <ol>
              <li>ホームページの「はじめる」ボタンをクリック</li>
              <li>メールアドレスを入力し、安全なパスワードを作成</li>
              <li>確認リンクを通じてメールアドレスを認証</li>
              <li>音楽プロフィールの設定を完了</li>
            </ol>
            
            <h3>プロフィール設定</h3>
            <p>設定中に以下を選択していただきます：</p>
            <ul>
              <li>主要楽器の選択</li>
              <li>現在のスキルレベルの指定</li>
              <li>音楽の目標を選択</li>
              <li>練習の設定とスケジュール設定</li>
            </ul>
          `
        },
        {
          title: '最初の練習セッション',
          content: `
            <h3>あなたの旅の始まり</h3>
            <p>最初の練習セッションは、AIがあなたの現在の能力を理解するのに役立ちます：</p>
            
            <h4>初期評価</h4>
            <ul>
              <li>簡単な楽曲やエクササイズを演奏</li>
              <li>AIがあなたのテクニック、タイミング、音程の精度を分析</li>
              <li>あなたのパフォーマンスに基づいたパーソナライズされた推奨を受信</li>
            </ul>
            
            <h4>練習目標の設定</h4>
            <p>達成したいことを定義してください：</p>
            <ul>
              <li>日々の練習時間の目標</li>
              <li>スキル開発の優先順位</li>
              <li>楽曲学習の目的</li>
            </ul>
          `
        },
        {
          title: 'インターフェースのナビゲーション',
          content: `
            <h3>ダッシュボード概要</h3>
            <p>ダッシュボードでは以下に素早くアクセスできます：</p>
            <ul>
              <li><strong>練習セッション：</strong> 新しいセッションを開始するか、以前のセッションを継続</li>
              <li><strong>進歩の追跡：</strong> 時間の経過とともにあなたの改善を表示</li>
              <li><strong>AI推奨：</strong> パーソナライズされた練習提案</li>
              <li><strong>楽曲ライブラリ：</strong> 利用可能な楽曲を閲覧・検索</li>            </ul>
            
            <h3>練習インターフェース</h3>
            <p>練習セッション中に以下が表示されます：</p>
            <ul>
              <li>パフォーマンスのリアルタイムフィードバック</li>
              <li>タイミングと音程の視覚的インジケータ</li>
              <li>完了状況を示すプログレスバー</li>
              <li>再生レビュー用の録音コントロール</li>
            </ul>
          `
        }
      ]
    },
    'ai-features': {
      title: 'AI搭載学習機能',
      items: [
        {
          title: 'スマート練習推奨',
          content: `
            <h3>仕組み</h3>
            <p>AIがあなたの練習セッションを分析してパーソナライズされた推奨を提供します：</p>
            
            <h4>分析要因</h4>
            <ul>
              <li>現在のスキルレベルと進歩率</li>
              <li>強みの分野と改善が必要な分野</li>
              <li>練習頻度と一貫性</li>
              <li>音楽の好みと目標</li>
            </ul>
            
            <h4>推奨タイプ</h4>
            <ul>
              <li><strong>テクニカルエクササイズ：</strong> 特定のスキルのための集中的な練習</li>
              <li><strong>楽曲提案：</strong> あなたのレベルと興味に合った楽曲</li>
              <li><strong>練習スケジューリング：</strong> 最適なタイミングと持続時間</li>
              <li><strong>難易度の進歩：</strong> 段階的なチャレンジの増加</li>
            </ul>
          `
        },
        {
          title: 'リアルタイムフィードバックシステム',
          content: `
            <h3>即座のパフォーマンス分析</h3>
            <p>演奏に対する即座のフィードバックを取得：</p>
            
            <h4>音程検出</h4>
            <ul>
              <li>95%以上の精度での正確性測定</li>
              <li>シャープ/フラット音符の視覚的インジケータ</li>
              <li>音程改善の提案</li>
            </ul>
            
            <h4>リズム分析</h4>
            <ul>
              <li>ビート精度の追跡</li>
              <li>テンポ一貫性のモニタリング</li>
              <li>リズムパターンの認識</li>
            </ul>
            
            <h4>テクニック評価</h4>            <ul>
              <li>運指と手の位置の分析</li>
              <li>弓のテクニック（弦楽器用）</li>
              <li>息の制御（管楽器用）</li>
            </ul>
          `
        }
      ]
    },
    'practice-tools': {
      title: '必須練習ツール',
      items: [
        {
          title: 'メトロノーム＆テンポコントロール',
          content: `
            <h3>内蔵メトロノーム</h3>
            <p>高度なメトロノーム機能でタイミングをマスター：</p>
            
            <h4>機能</h4>
            <ul>
              <li>BPM範囲：毎分40-200拍</li>
              <li>拍子記号：2/4、3/4、4/4、6/8など</li>
              <li>複雑なリズムのアクセントパターン</li>
              <li>視覚的・音声的合図</li>
            </ul>
            
            <h4>練習モード</h4>
            <ul>
              <li><strong>プログレッシブテンポ：</strong> 徐々にスピードを上げる</li>
              <li><strong>リズムトレーナー：</strong> 特定のパターンに集中</li>
              <li><strong>細分化練習：</strong> 四分音符、八分音符、十六分音符</li>
            </ul>
          `
        },
        {
          title: 'デジタルチューナー',
          content: `
            <h3>精密チューニング</h3>
            <p>楽器を完璧にチューニングする：</p>
            
            <h4>チューナー機能</h4>
            <ul>
              <li>±0.1セント精度のクロマチックチューニング</li>
              <li>複数の音律（平均律、純正律、ピタゴラス音律）</li>
              <li>カスタムチューニングプリセット</li>
              <li>異なる楽器の移調</li>
            </ul>
          `
        }
      ]
    },
    'audio-setup': {
      title: 'オーディオ設定',
      items: [
        {
          title: 'マイクロフォン設定',
          content: `
            <h3>最適なオーディオ入力</h3>
            <p>最良の結果を得るためにマイクロフォンを設定：</p>
              <h4>内蔵マイクロフォン</h4>
            <ul>
              <li>楽器から2-3フィート離れた位置にデバイスを配置</li>
              <li>背景ノイズやエコーを避ける</li>
              <li>静かな練習スペースを使用</li>
              <li>設定で入力感度を調整</li>
            </ul>
            
            <h4>外部マイクロフォン</h4>
            <ul>
              <li><strong>USBマイクロフォン：</strong> プラグアンドプレイの便利さ</li>
              <li><strong>XLRマイクロフォン：</strong> オーディオインターフェースによるプロ品質</li>
              <li><strong>楽器ピックアップ：</strong> 電子楽器への直接接続</li>
            </ul>
          `
        }
      ]
    },    'analytics': {
      title: '進歩の分析',
      items: [
        {
          title: 'パフォーマンス指標',
          content: `
            <h3>進歩の追跡</h3>
            <p>詳細な分析であなたの改善を理解する：</p>
            
            <h4>練習統計</h4>
            <ul>
              <li>日々、週次、月次の練習時間</li>
              <li>セッション頻度と一貫性</li>
              <li>目標達成率</li>
              <li>連続記録の追跡とマイルストーン</li>
            </ul>
            
            <h4>スキル開発</h4>
            <ul>
              <li>時間の経過による精度の向上</li>
              <li>テンポ進歩の追跡</li>
              <li>技術スキルの向上</li>
              <li>楽曲マスターレベル</li>
            </ul>
          `
        }
      ]
    },    'api': {
      title: '開発者APIリファレンス',
      items: [
        {
          title: '認証',
          content: `
            <h3>API認証</h3>
            <p>Zenicの開発者APIへの安全なアクセス：</p>
            
            <h4>はじめに</h4>
            <pre><code>// APIキーのリクエスト
curl -X POST https://api.zenic.com/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "your@email.com", "password": "your_password"}'</code></pre>
            
            <h4>認証ヘッダー</h4>
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
          </div>          <h1 className="text-4xl md:text-5xl font-bold mb-6">ドキュメント</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ZenicのAI搭載音楽学習プラットフォームをマスターするための完全なガイドとリファレンス。
            初心者の設定から高度な機能やAPI統合まで。
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="ドキュメントを検索..."
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
              <h3 className="text-lg font-semibold mb-4 text-brand-yellow">ドキュメントセクション</h3>
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
                <h4 className="font-semibold mb-3 text-white">クイックリンク</h4>
                <div className="space-y-2 text-sm">
                  <button 
                    onClick={() => navigate('/faq')}
                    className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors w-full text-left"
                  >                    <ExternalLink className="w-4 h-4" />
                    よくある質問
                  </button>
                  <a href="mailto:support@zenic.com" className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors">
                    <Headphones className="w-4 h-4" />
                    サポート
                  </a>
                  <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-brand-yellow transition-colors">
                    <Download className="w-4 h-4" />
                    PDFガイド
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
            </div>            <h2 className="text-2xl font-bold mb-4">さらなるサポートが必要ですか？</h2>
            <p className="text-gray-300 mb-6">
              音楽家のコミュニティに参加するか、パーソナライズされたサポートについてサポートチームにお問い合わせください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/faq')}
                className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium"
              >
                FAQ表示
              </button>
              <a 
                href="mailto:support@zenic.com"
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-colors font-medium"
              >
                サポートに問い合わせ
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