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
      title: '収集する情報',
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          subtitle: 'アカウント情報',
          text: 'Zenicアカウントを作成する際、メールアドレス、ユーザー名、パスワードなどの基本情報を収集します。この情報は、プラットフォームへのアクセスを提供し、あなたの体験をパーソナライズするために必要です。'
        },
        {
          subtitle: '練習データ',
          text: '練習時間、練習した楽曲、進歩指標、パフォーマンス分析など、音楽練習セッションに関するデータを収集します。このデータは、パーソナライズされた推奨を提供し、あなたの音楽の旅を追跡するのに役立ちます。'
        },
        {
          subtitle: 'デバイス情報',
          text: 'セキュリティと最適化の目的で、Zenicへのアクセスに使用するデバイスに関する情報（デバイスタイプ、オペレーティングシステム、ブラウザタイプ、IPアドレスなど）を収集する場合があります。'
        },
        {
          subtitle: '使用分析',
          text: 'ユーザーがプラットフォームとどのように相互作用するか、どの機能が最も人気か、ユーザーエクスペリエンスをどのように改善できるかを理解するために、匿名化された使用データを収集します。'
        }
      ]
    },    {
      id: 'information-use',
      title: '情報の使用方法',
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          subtitle: 'サービス提供',
          text: 'AI搭載練習推奨、進歩追跡、パーソナライズされた学習体験を含むZenicプラットフォームの提供と維持のために、あなたの情報を使用します。'
        },
        {
          subtitle: 'パーソナライゼーション',
          text: 'あなたの練習データは、体験をカスタマイズし、関連する楽曲やエクササイズを提案し、AIチュータリングをあなたのスキルレベルと音楽の好みに適応させるのに役立ちます。'
        },
        {
          subtitle: 'コミュニケーション',
          text: 'アカウントに関する重要な更新、新機能、練習リマインダーを送信するために連絡先情報を使用する場合があります（いつでもオプトアウトできます）。'
        },
        {
          subtitle: '改善と分析',
          text: '集約された匿名化データは、サービスの改善、新機能の開発、全体的なプラットフォームを向上させるためのユーザー行動パターンの理解に役立ちます。'
        }
      ]
    },    {
      id: 'data-protection',
      title: 'データ保護とセキュリティ',
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: '暗号化',
          text: 'あなたのデバイスと当社のサーバー間で送信されるすべてのデータは、業界標準のSSL/TLSプロトコルを使用して暗号化されます。あなたの個人情報は高度な暗号化方式を使用して保存されます。'
        },
        {
          subtitle: 'アクセス制御',
          text: '認可された担当者のみがユーザーデータにアクセスできるよう、サービス提供やサポートに必要な場合にのみ、厳格なアクセス制御と認証措置を実装しています。'
        },
        {
          subtitle: '定期的なセキュリティ監査',
          text: '潜在的な脆弱性が悪用される前に特定し対処するため、システムは定期的なセキュリティ監査と侵入テストを受けています。'
        },
        {
          subtitle: 'データ最小化',
          text: 'サービスの提供に必要なデータのみを収集し、データ保持ポリシーに従って不要になった情報は削除します。'
        }
      ]
    },    {
      id: 'data-sharing',
      title: '情報共有と開示',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          subtitle: 'サードパーティサービス',
          text: 'クラウドホスティングプロバイダーや分析サービスなど、プラットフォームの運営を支援する信頼できるサードパーティサービスプロバイダーと限定的なデータを共有する場合があります。これらのプロバイダーは、あなたのデータを保護する契約上の義務を負っています。'
        },
        {
          subtitle: '法的要件',
          text: '法律、裁判所命令、政府規制により要求された場合、または当社の権利やユーザーの安全を保護するために必要と判断される場合、あなたの情報を開示する場合があります。'
        },
        {
          subtitle: '事業譲渡',
          text: '合併、買収、資産売却の場合、あなたの情報は買収会社に譲渡される可能性がありますが、このポリシーで概説されている同じプライバシー保護の下でのみ行われます。'
        },
        {
          subtitle: 'ユーザーの同意',
          text: 'マーケティング目的であなたの個人情報をサードパーティに販売することは決してありません。ここで説明されている範囲を超える共有は、あなたの明示的な同意がある場合にのみ行われます。'
        }
      ]
    },    {
      id: 'user-rights',
      title: 'あなたの権利とコントロール',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: 'データアクセス',
          text: '当社があなたについて収集したすべての個人データにアクセスし、確認する権利があります。アカウント設定またはサポートチームへの連絡により、データのコピーを要求できます。'
        },
        {
          subtitle: 'データ修正',
          text: 'アカウント設定を通じて、いつでも個人情報を更新・修正できます。不正確な情報にお気づきの場合は、迅速に修正できるようお知らせください。'
        },
        {
          subtitle: 'データ削除',
          text: '個人データの削除を要求する権利があります。アカウントを削除すると、30日以内にアクティブシステムから個人情報を削除しますが、法的またはセキュリティ上の目的で一部のデータが保持される場合があります。'
        },
        {
          subtitle: 'データポータビリティ',
          text: 'ご要望により、Zenicを離れることを選択した場合に他のサービスに転送できるよう、構造化された機械読み取り可能な形式でデータを提供できます。'
        }
      ]
    },    {
      id: 'international-transfers',
      title: '国際データ転送',
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: 'グローバルインフラストラクチャ',
          text: 'Zenicはグローバルに運営されており、あなたが居住する国以外でデータを保存・処理する場合があります。すべての国際転送が適用されるデータ保護法に準拠していることを保証します。'
        },
        {
          subtitle: '十分性決定',
          text: '関連当局によって十分な保護を提供すると判断された国にのみデータを転送するか、標準契約条項などの適切な保護措置を実装します。'
        },
        {
          subtitle: '地域コンプライアンス',
          text: 'GDPR（欧州連合）、CCPA（カリフォルニア）、および運営する管轄区域の適用される他のプライバシー法を含む地域プライバシー規制に準拠しています。'
        },
        {
          subtitle: 'データローカライゼーション',
          text: '法律で要求される場合、特定の管轄区域内でデータのローカルコピーを維持し、ユーザーがデータの保存場所と処理場所をコントロールできるようにします。'
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
          </div>          <h1 className="text-4xl md:text-5xl font-bold mb-6">プライバシーポリシー</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Zenicでは、あなたのプライバシーを保護し、個人情報のセキュリティを確保することをお約束します。
            このポリシーでは、データの収集、使用、保護方法について説明します。
          </p>
          <div className="mt-6 text-sm text-gray-400">
            最終更新：2025年1月
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-gray-900/30 rounded-xl p-6 mb-12 border border-gray-700/30">
          <h2 className="text-xl font-bold mb-4 text-white">目次</h2>
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
        <div className="mt-16 bg-gray-900/30 rounded-xl p-8 border border-gray-700/30 text-center">          <h2 className="text-2xl font-bold mb-4">プライバシーについてのご質問は？</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            このプライバシーポリシーや当社がどのようにあなたのデータを取り扱うかについて質問がございましたら、
            お気軽にお問い合わせください。あなたのプライバシーが保護されるよう、喜んでサポートいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:privacy@zenic.com"
              className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/90 transition-colors font-medium"
            >
              プライバシーチームに問い合わせ
            </a>
            <button
              onClick={() => navigate('/faq')}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-brand-brown hover:text-brand-yellow transition-colors font-medium"
            >
              FAQ表示
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