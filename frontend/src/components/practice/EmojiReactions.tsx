import React from 'react';
import { Target, Users } from 'lucide-react';

interface EmojiReactionsProps {
  sentEmojis: string[];
  activeEmoji: string | null;
  emojiAnimation: string | null;
  onEmojiClick: (emoji: string) => void;
  onSend: () => void;
  onCancel: () => void;
}

const EmojiReactions: React.FC<EmojiReactionsProps> = ({
  sentEmojis,
  activeEmoji,
  emojiAnimation,
  onEmojiClick,
  onSend,
  onCancel,
}) => {
  const emojis = ['🎸', '🎵', '🎼', '🎹', '🎺', '🎻', '🥁', '🎤', '🔥', '💪', '😍', '🎯', '👏', '⭐', '🚀', '❤️'];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-brown to-brand-yellow rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">練習の感想を送信</h3>
            <p className="text-sm text-gray-400">他の練習者と感想を共有しましょう</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">送信済み: {sentEmojis.length}</div>
        </div>
      </div>

      {/* Emoji Selection Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onEmojiClick(emoji)}
            className={`relative p-3 text-2xl rounded-lg transition-all transform hover:scale-110 ${
              activeEmoji === emoji
                ? 'bg-brand-brown/30 border-2 border-brand-brown scale-110'
                : 'hover:bg-gray-800/20 border-2 border-transparent hover:border-brand-brown/50'
            } ${emojiAnimation === emoji ? 'animate-bounce' : ''}`}
          >
            {emoji}
            {sentEmojis.filter((e) => e === emoji).length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-brand-brown rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {sentEmojis.filter((e) => e === emoji).length}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Recent Emoji Stream */}
      <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-700/30">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-brand-brown" />
          <h4 className="text-sm font-semibold text-white">リアルタイム感想</h4>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
          {sentEmojis.length > 0 ? (
            sentEmojis.slice(-10).map((emoji, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="text-lg">{emoji}</span>
                <span className="text-xs text-gray-400">You</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">感想を送信して他の練習者とコミュニケーションしましょう</p>
          )}
        </div>
      </div>

      {/* Send Button */}
      {activeEmoji && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={onSend}
            className="px-6 py-3 bg-brand-brown text-white rounded-lg hover:bg-brand-brown/80 transition-colors font-medium flex items-center gap-2"
          >
            <span className="text-lg">{activeEmoji}</span>
            <span>送信</span>
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700/70 transition-colors"
          >
            キャンセル
          </button>
        </div>
      )}
    </div>
  );
};

export default EmojiReactions;
