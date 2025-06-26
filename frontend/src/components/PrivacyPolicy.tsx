import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';
import zenicBanner from '../assets/images/zenic_banner.png';

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();
  const sections = [
    {
      id: 'information-collection',
      title: '収集する情報',
      icon: <Database className="w-6 h-6" />,
      content: [
        {
          subtitle: 'アカウント情報',
          text: 'アカウントを作成する際、メールアドレス、ユーザー名、および提供を選択したプロフィール情報を収集します。'
        },
        {
          subtitle: '練習データ',
          text: '練習した楽曲、セッション時間、パフォーマンス指標、進歩追跡など、音楽練習セッションに関するデータを収集します。'
        },
        {
          subtitle: 'デバイス情報',
          text: 'デバイスタイプ、オペレーティングシステム、ブラウザ情報など、Zenicにアクセスするために使用するデバイスに関する情報を収集する場合があります。'
        },
        {
          subtitle: '使用分析',
          text: 'サービスの改善とAI推奨機能の向上のため、プラットフォームの使用方法に関する匿名化されたデータを収集します。'
        }
      ]
    },
    {
      id: 'data-usage',
      title: '情報の使用方法',
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          subtitle: 'パーソナライズされたAIチュータリング',
          text: 'あなたの練習データは、AIがパーソナライズされた推奨を提供し、進歩を追跡し、あなたのスキルレベルに合わせてレッスンを適応させるのに役立ちます。'
        },
        {
          subtitle: 'サービス改善',
          text: '集約された匿名化データを使用して、プラットフォームの改善、新機能の開発、全体的なユーザーエクスペリエンスの向上を行います。'
        },
        {
          subtitle: 'コミュニケーション',
          text: '重要なサービス更新、練習リマインダー、プロモーションコンテンツ（オプトアウト可能）を送信するためにメールアドレスを使用する場合があります。'
        },        {
          subtitle: 'サポートサービス',
          text: 'あなたの情報は、カスタマーサポートの提供と技術的問題のトラブルシューティングに役立ちます。'
        }
      ]
    },    {
      id: 'data-protection',
      title: 'データ保護とセキュリティ',
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: '暗号化',
          text: 'すべてのデータ送信は業界標準のSSL/TLSプロトコルを使用して暗号化されます。あなたの練習データは転送中および保存時の両方で暗号化されます。'
        },
        {
          subtitle: 'ローカルストレージ',
          text: '練習セッションと個人データは主にあなたのデバイス上にローカルに保存され、バックアップとマルチデバイスアクセスのための最小限のクラウド同期が行われます。'
        },
        {
          subtitle: 'アクセス制御',
          text: '正当な業務目的で認可された担当者のみがユーザーデータにアクセスできるよう、厳格なアクセス制御と認証措置を実装しています。'
        },
        {
          subtitle: '定期監査',
          text: '最高水準のデータ保護を維持するため、セキュリティ慣行は定期的な監査とコンプライアンスチェックを受けています。'
        }
      ]
    },    {
      id: 'data-sharing',
      title: 'データ共有とサードパーティ',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          subtitle: '個人データの販売禁止',
          text: '私たちはあなたの個人情報や練習データをサードパーティに販売することは決してありません。あなたの音楽の旅はプライベートであり、あなたのものです。'
        },
        {
          subtitle: 'サービスプロバイダー',
          text: 'クラウドホスティングや分析サービスなど、プラットフォームの運営を支援する信頼できるサービスプロバイダーと限定的なデータを共有する場合があります。'
        },
        {
          subtitle: '法的要件',
          text: '法律、裁判所命令により要求された場合、またはユーザーとプラットフォームの権利と安全を保護するために、情報を開示する場合があります。'
        },
        {
          subtitle: '匿名化された分析',
          text: '音楽教育とAI開発の改善に役立てるため、集約された匿名化された使用統計を共有する場合がありますが、これには個人識別子は含まれません。'
        }
      ]
    },    {
      id: 'user-rights',
      title: 'あなたの権利と選択',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: 'データアクセス',
          text: 'アカウント設定またはサポートチームへの連絡により、私たちが保持するあなたのすべての個人データのコピーをいつでも要求できます。'
        },
        {
          subtitle: 'データ修正',
          text: 'アカウントダッシュボードを通じて、個人情報と練習設定を更新、修正、変更できます。'
        },
        {
          subtitle: 'データ削除',
          text: 'アカウントと関連データの削除を要求できます。要求から30日以内にあなたの情報を完全に削除します。'
        },
        {
          subtitle: 'オプトアウトオプション',
          text: 'コアプラットフォーム機能を維持しながら、プロモーションメール、データ分析、特定のAI機能をオプトアウトできます。'
        }
      ]
    },    {
      id: 'international',
      title: '国際データ転送',
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: '地域コンプライアンス',
          text: 'GDPR、CCPA、その他の地域プライバシー規制に準拠しています。データ処理慣行は地域要件を満たすよう適応されています。'
        },
        {
          subtitle: 'データローカライゼーション',
          text: '可能な限り、あなたの地域でデータを保存・処理します。国境を越えた転送は適切な保護措置と法的枠組みによって保護されています。'
        },
        {
          subtitle: 'セーフハーバー条項',
          text: '国際データ転送は標準契約条項や十分性決定などの承認されたメカニズムの下で実施されます。'
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
              <span className="hidden sm:inline">ホームに戻る</span>
            </button>
            <img src={zenicBanner} alt="Zenic" className="h-8 object-contain" />
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/signin')}
              className="px-4 py-2 text-gray-300 hover:text-brand-yellow transition-colors"
            >
              サインイン
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="px-6 py-2 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-all shadow-lg hover:shadow-brand-brown/25"
            >
              はじめる
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
              プライバシー
            </span>
            <span className="bg-gradient-to-r from-brand-brown to-brand-yellow bg-clip-text text-transparent">
              {" "}ポリシー
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            あなたのプライバシーは私たちが行うすべての基盤です。私たちがどのようにあなたのデータを保護し、取り扱うかをご覧ください。
          </p>
          
          <div className="text-sm text-gray-400">
            最終更新：2024年12月
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="px-6 py-8 bg-[#101218] relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">目次</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {sections.map((section) => (
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
          {sections.map((section) => (
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
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-12">            <h2 className="text-3xl font-bold text-white mb-6">プライバシーについてのご質問は？</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              このプライバシーポリシーや私たちがどのようにあなたのデータを取り扱うかについて質問がございましたら、
              喜んでサポートいたします。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-brand-brown text-white font-semibold rounded-lg hover:bg-brand-brown/90 hover:shadow-2xl hover:shadow-brand-brown/25 transition-all"
              >
                サポートに問い合わせ
              </button>
              <button 
                onClick={() => navigate('/faq')}
                className="px-8 py-4 border-2 border-brand-brown text-brand-brown font-semibold rounded-lg hover:bg-brand-brown hover:text-white hover:shadow-2xl hover:shadow-brand-brown/25 transition-all"
              >
                FAQ表示
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
          </div>          <p className="text-gray-400 text-sm">
            © 2024 Zenic. すべての権利予約。AI搭載音楽学習プラットフォーム。
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy; 