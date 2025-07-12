import React from 'react';
import { practiceSessionService } from '../services/practiceSessionService';

const SampleDataButton: React.FC = () => {
  const addSampleData = () => {
    const sampleSessions = [
      {
        songId: '1',
        songTitle: 'ワンダーウォール',
        artist: 'オアシス',
        thumbnail: 'https://images.pexels.com/photos/1763076/pexels-photo-1763076.jpeg?w=40&h=40&fit=crop',
        duration: 25,
        progress: 78,
        aiScore: 85,
        skillsImproved: ['コード移行', 'ストラミングパターン'],
        practiceTime: 1500,
        difficulty: '中級者',
        trackData: {
          id: '2Vv-BfVoq4g',
          title: 'ワンダーウォール',
          channelTitle: 'オアシス',
          thumbnail: 'https://images.pexels.com/photos/1763076/pexels-photo-1763076.jpeg?w=40&h=40&fit=crop'
        }
      },
      {
        songId: '2',
        songTitle: 'ホテル・カリフォルニア',
        artist: 'イーグルス',
        thumbnail: 'https://images.pexels.com/photos/1763077/pexels-photo-1763077.jpeg?w=40&h=40&fit=crop',
        duration: 35,
        progress: 92,
        aiScore: 91,
        skillsImproved: ['フィンガーピッキング', 'テンポコントロール'],
        practiceTime: 2100,
        difficulty: '上級者',
        trackData: {
          id: 'BciS5krYL80',
          title: 'ホテル・カリフォルニア',
          channelTitle: 'イーグルス',
          thumbnail: 'https://images.pexels.com/photos/1763077/pexels-photo-1763077.jpeg?w=40&h=40&fit=crop'
        }
      },
      {
        songId: '3',
        songTitle: '天国への階段',
        artist: 'レッド・ツェッペリン',
        thumbnail: 'https://images.pexels.com/photos/1763079/pexels-photo-1763079.jpeg?w=40&h=40&fit=crop',
        duration: 42,
        progress: 65,
        aiScore: 72,
        skillsImproved: ['バレーコード', 'ダイナミクス'],
        practiceTime: 2520,
        difficulty: '上級者',
        trackData: {
          id: 'QkF3oxziUI4',
          title: '天国への階段',
          channelTitle: 'レッド・ツェッペリン',
          thumbnail: 'https://images.pexels.com/photos/1763079/pexels-photo-1763079.jpeg?w=40&h=40&fit=crop'
        }
      },
      {
        songId: '4',
        songTitle: 'スウィート・チャイルド・オ・マイン',
        artist: 'ガンズ・アンド・ローゼズ',
        thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=40&h=40&fit=crop',
        duration: 28,
        progress: 88,
        aiScore: 89,
        skillsImproved: ['リードギター', 'タイミング'],
        practiceTime: 1680,
        difficulty: '中級者',
        trackData: {
          id: 'Man4t8eIOh0',
          title: 'スウィート・チャイルド・オ・マイン',
          channelTitle: 'ガンズ・アンド・ローゼズ',
          thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=40&h=40&fit=crop'
        }
      },
      {
        songId: '5',
        songTitle: 'ブラックバード',
        artist: 'ザ・ビートルズ',
        thumbnail: 'https://images.pexels.com/photos/1763078/pexels-photo-1763078.jpeg?w=40&h=40&fit=crop',
        duration: 18,
        progress: 95,
        aiScore: 94,
        skillsImproved: ['フィンガーピッキング', 'メロディー'],
        practiceTime: 1080,
        difficulty: '初心者',
        trackData: {
          id: 'bx1Bh8ZvH84',
          title: 'ブラックバード',
          channelTitle: 'ザ・ビートルズ',
          thumbnail: 'https://images.pexels.com/photos/1763078/pexels-photo-1763078.jpeg?w=40&h=40&fit=crop'
        }
      }
    ];

    // Add sessions with different timestamps
    sampleSessions.forEach((session, index) => {
      const date = new Date();
      date.setHours(date.getHours() - (index + 1) * 2); // Each session 2 hours apart
      
      practiceSessionService.addHistoricalPracticeSession(session, date.toISOString());
    });

    // Reload the page to see the new data
    window.location.reload();
  };

  return (
    <button
      onClick={addSampleData}
      className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/80 transition-colors text-sm"
    >
      Add Sample Data
    </button>
  );
};

export default SampleDataButton; 