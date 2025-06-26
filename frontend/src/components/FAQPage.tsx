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
    { id: 'all', name: 'すべての質問', icon: <HelpCircle className="w-5 h-5" />, count: 18 },
    { id: 'getting-started', name: 'はじめに', icon: <Music className="w-5 h-5" />, count: 6 },
    { id: 'ai-features', name: 'AI機能', icon: <Settings className="w-5 h-5" />, count: 5 },
    { id: 'privacy', name: 'プライバシーとセキュリティ', icon: <Shield className="w-5 h-5" />, count: 4 },
    { id: 'technical', name: 'テクニカルサポート', icon: <Headphones className="w-5 h-5" />, count: 3 }
  ];  const faqData = [
    {
      id: 1,
      category: 'getting-started',
      question: 'Zenicの始め方を教えてください。',
      answer: 'Zenicを始めるのはとても簡単です！まず「はじめる」ボタンをクリックして無料アカウントを作成してください。登録後、楽器を選択し、スキルレベルを設定して、ガイド付きオンボーディングプロセスを開始できます。私たちのAIがあなたの現在の能力を評価し、あなただけのパーソナライズされた学習パスを作成します。'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'Zenicはどの楽器をサポートしていますか？',
      answer: 'Zenicは現在、ギター、ピアノ、バイオリン、ドラム、ベースギター、ボーカルをサポートしています。ユーザーフィードバックに基づいて、継続的により多くの楽器のサポートを追加しています。各楽器には、その楽器のテクニックとレパートリーに特化してトレーニングされた専用のAIチューターが付いています。'
    },
    {
      id: 3,
      category: 'ai-features',
      question: 'AI練習推奨システムはどのように機能しますか？',
      answer: '私たちのAIは、あなたの練習セッションを分析し、改善が必要な分野を特定して、パーソナライズされたエクササイズと楽曲を提案します。スキルレベル、音楽の好み、練習履歴、進歩パターンを考慮して、適切にチャレンジしながらもモチベーションを保てる推奨を作成します。'
    },
    {
      id: 4,
      category: 'ai-features',
      question: 'AIチューターは私の学習スタイルに適応できますか？',
      answer: 'もちろんです！私たちのAIは、あなたのインタラクション、練習パターン、フィードバックから継続的に学習し、教授アプローチを適応させます。視覚的な手がかり、反復、理論的説明のいずれがより良い学習方法であっても、AIはあなたの好みの学習スタイルに合わせて方法論を調整します。'
    },
    {
      id: 5,
      category: 'getting-started',
      question: 'Zenicを使用するために特別な機器は必要ですか？',
      answer: '基本的な使用には、楽器とインターネットアクセス可能なデバイスのみが必要です。ただし、リアルタイムフィードバックや精密な音声分析などの高度な機能には、高品質のマイクまたはオーディオインターフェースの使用をお勧めします。私たちのアプリは、デバイス内蔵マイクとプロ用オーディオ機器の両方で優れた動作をします。'
    },
    {
      id: 6,
      category: 'privacy',
      question: '練習データはどのように保護されていますか？',
      answer: '私たちはあなたのプライバシーを真剣に考えています。すべての練習データは送信中と保管中の両方で暗号化されています。個人情報は第三者に販売されることはなく、あなたのデータを完全にコントロールできます。アカウント設定からいつでもデータをエクスポート、変更、削除することができます。'
    },
    {
      id: 7,
      category: 'ai-features',
      question: '私の演奏に対するAIフィードバックの精度はどの程度ですか？',
      answer: '私たちのAIフィードバックシステムは、ピッチ、タイミング、テクニックの問題を95%以上の精度で検出します。システムは機械学習とプロの音楽家からのフィードバックを通じて継続的に改善されています。高い精度を誇りますが、最良の結果を得るために、AIフィードバックと人間のインストラクターからの時折のレッスンを組み合わせることをお勧めします。'
    },
    {
      id: 8,
      category: 'getting-started',
      question: 'オフラインで練習できますか？',
      answer: 'Zenicの一部機能は、ダウンロードした楽曲へのアクセス、練習エクササイズ、基本的な録音を含めてオフラインで動作します。ただし、AI分析、リアルタイムフィードバック、進歩の同期にはインターネット接続が必要です。オフライン使用のために、インターネット接続がある時に練習素材をダウンロードしておくことをお勧めします。'
    },
    {
      id: 9,
      category: 'technical',
      question: 'アプリが私の楽器を認識しない場合はどうすればよいですか？',
      answer: 'まず、マイクの権限を確認し、デバイスのマイクが正常に動作していることを確認してください。静かな環境にいて、楽器がマイクに十分近いことを確認してください。問題が続く場合は、アプリ設定で入力感度を調整するか、個別のトラブルシューティングについて私たちのサポートチームにお問い合わせください。'
    },
    {
      id: 10,
      category: 'ai-features',
      question: 'AIチューターの性格と教授スタイルをカスタマイズできますか？',
      answer: 'はい！設定でAIチューターのコミュニケーションスタイル、フィードバック頻度、動機づけアプローチを調整できます。あなたの好みに合わせて、励ましたり、直接的だったり、分析的だったりする異なる性格タイプから選択してください。理想的な学習環境を作るために、目標を設定し、チャレンジレベルを調整することもできます。'
    },
    {
      id: 11,
      category: 'privacy',
      question: 'Zenicは私のデータを他のユーザーと共有しますか？',
      answer: 'いいえ、あなたの個人的な練習データと進歩情報は完全にプライベートです。個人識別子のない匿名化・集約されたデータのみが、私たちのAIモデルとプラットフォーム機能の改善に使用される場合があります。希望する場合は、プライバシー設定でこのデータ使用をオプトアウトできます。'
    },
    {
      id: 12,
      category: 'getting-started',
      question: 'モバイルアプリはありますか？',
      answer: 'はい！ZenicはiOSとAndroidデバイス、さらにデスクトップコンピュータのWebブラウザで利用できます。すべての進歩がデバイス間で同期されるため、スマートフォン、タブレット、コンピュータでシームレスに練習できます。モバイルアプリには、タッチ最適化されたインターフェースを持つすべての主要機能が含まれています。'
    },
    {
      id: 13,
      category: 'technical',
      question: 'オーディオフィードバックに遅延があるのはなぜですか？',
      answer: 'オーディオレイテンシは、デバイスの処理能力、オーディオドライバー、インターネット接続など、いくつかの要因によって引き起こされる可能性があります。Bluetoothの代わりに有線ヘッドフォンを使用し、他のアプリケーションを閉じ、安定したインターネット接続を確保してみてください。最良の体験のために、少なくとも4GBのRAMを持つデバイスの使用をお勧めします。'
    },
    {
      id: 14,
      category: 'ai-features',
      question: 'AIはどのくらいの頻度で私の学習パスを更新しますか？',
      answer: 'AIは継続的にあなたの進歩を分析し、リアルタイムで推奨を調整します。主要な学習パス更新は通常、各練習セッション後に行われ、練習中に細かい調整が行われます。新しいスキルをマスターしたり、AIが追加の焦点が必要な分野を特定したりすると、大幅なパス変更が見られます。'
    },
    {
      id: 15,
      category: 'privacy',
      question: 'アカウントを作成せずにZenicを使用できますか？',
      answer: 'アカウントなしでも一部の基本機能にアクセスできますが、無料アカウントを作成することで、パーソナライズされたAIチュータリング、進歩追跡、デバイス間のクラウド同期を含むZenicの全潜在能力を解放できます。アカウント作成は無料で、メールアドレスのみが必要です。'
    },
    {
      id: 16,
      category: 'getting-started',
      question: 'Zenicはどのスキルレベルに対応していますか？',
      answer: 'Zenicは、完全な初心者から上級音楽家まで、すべてのスキルレベル向けに設計されています。私たちのAI評価は、開始地点に関係なく適切なチャレンジを作成します。初心者は基礎レッスンと基本テクニックを得て、上級者は複雑なアレンジとプロレベルのフィードバックを受けます。'
    },
    {
      id: 17,
      category: 'technical',
      question: 'Zenicはどのくらいのストレージ容量が必要ですか？',
      answer: 'Zenicアプリ自体は約150MBのストレージ容量を必要とします。ダウンロードした楽曲と録音された練習セッションには追加の容量が必要で、通常は楽曲あたり2-5MBです。古い録音を削除し、不要になったダウンロード楽曲を削除することでストレージを管理できます。'
    },
    {
      id: 18,
      category: 'privacy',
      question: '私のデータはどのくらいの期間保持されますか？',
      answer: 'あなたの練習データと進歩情報は、アカウントがアクティブである限り保持されます。アカウント削除後、ほとんどのデータは30日以内に永続的に削除されますが、一部の匿名化された分析データはサービス改善のためにより長期間保持される場合があります。私たちのプライバシーチームに連絡することで、完全なデータ削除を要求できます。'
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
          </div>          <h1 className="text-4xl md:text-5xl font-bold mb-6">よくある質問</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            ZenicのAI搭載音楽学習プラットフォームに関するよくある質問への回答をご覧ください。
            お探しのものが見つからない場合は、サポートチームにお問い合わせください。
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />            <input
              type="text"
              placeholder="よくある質問を検索..."
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
          {filteredFAQs.length === 0 ? (            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">質問が見つかりません</h3>
              <p className="text-gray-500">検索語句を調整するか、別のカテゴリを選択してみてください。</p>
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
            </div>            <h2 className="text-2xl font-bold mb-4">まだ質問がございますか？</h2>
            <p className="text-gray-300 mb-6">
              私たちのサポートチームが、Zenicの体験を最大限に活用できるようお手伝いいたします。
              通常24時間以内にお返事いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:support@zenic.com"
                className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium"
              >
                サポートに連絡
              </a>
              <button
                onClick={() => navigate('/privacy')}
                className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-colors font-medium"
              >
                プライバシーポリシー
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