import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, Wifi, WifiOff } from 'lucide-react';
import { ReceivedEmoji } from '../../contexts/SocketContext';

// Types for floating reactions
interface FloatingReaction {
  id: string;
  emoji: string;
  x: number;
  y: number;
  timestamp: number;
  userName?: string;
}

interface EmojiReactionsProps {
  sentEmojis: string[];
  activeEmoji: string | null;
  emojiAnimation: string | null;
  receivedEmojis: ReceivedEmoji[];
  reactionCounts: Record<string, number>;
  activeUsers: number;
  isConnected: boolean;
  onEmojiClick: (emoji: string) => void;
  onSend: () => void;
  onCancel: () => void;
}

const EmojiReactions: React.FC<EmojiReactionsProps> = ({
  sentEmojis,
  activeEmoji,
  emojiAnimation,
  receivedEmojis,
  reactionCounts,
  activeUsers,
  isConnected,
  onEmojiClick,
  onSend,
  onCancel,
}) => {
  const emojis = ['🎸', '🎵', '🎼', '🎹', '🎺', '🎻', '🥁', '🎤', '🔥', '💪', '😍', '🎯', '👏', '⭐', '🚀', '❤️'];
  const animationDuration = 3000;
  const maxReactions = 50;

  // State for floating reactions
  const [floatingReactions, setFloatingReactions] = useState<FloatingReaction[]>([]);
  const [recentReactions, setRecentReactions] = useState<(ReceivedEmoji & { isOwn?: boolean })[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add floating reaction when emoji is sent - positioned for top right corner
  const addFloatingReaction = useCallback((emoji: string, userName?: string) => {
    if (floatingReactions.length >= maxReactions) {
      setFloatingReactions(prev => prev.slice(1));
    }

    const newReaction: FloatingReaction = {
      id: Math.random().toString(36).substr(2, 9),
      emoji,
      userName,
      x: Math.random() * 30 + 65, // Position in top right area (65% to 95% from left)
      y: Math.random() * 15 + 10, // Start from top area (10% to 25% from top)
      timestamp: Date.now(),
    };

    setFloatingReactions((prev) => [...prev, newReaction]);

    // Remove reaction after animation completes
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, animationDuration);
  }, [floatingReactions.length, maxReactions, animationDuration]);

  // Enhanced emoji click handler that includes floating animation
  const handleEmojiClickWithAnimation = useCallback((emoji: string) => {
    onEmojiClick(emoji);
    addFloatingReaction(emoji, 'You');
    
    // Add to recent reactions for your own emoji
    const newReaction = {
      id: Math.random().toString(36).substr(2, 9),
      emoji,
      userId: 'you',
      userName: 'You',
      timestamp: Date.now(),
      isOwn: true
    };
    setRecentReactions(prev => [...prev.slice(-9), newReaction]);
  }, [onEmojiClick, addFloatingReaction]);

  // Enhanced send handler
  const handleSendWithAnimation = useCallback(() => {
    if (activeEmoji) {
      addFloatingReaction(activeEmoji, 'You');
    }
    onSend();
  }, [activeEmoji, onSend, addFloatingReaction]);

  // Add floating animations for received emojis from other users
  useEffect(() => {
    console.log('💫 EmojiReactions: Received emojis changed:', receivedEmojis);
    receivedEmojis.forEach(receivedEmoji => {
      console.log('🎨 EmojiReactions: Adding floating reaction for:', receivedEmoji);
      addFloatingReaction(receivedEmoji.emoji, receivedEmoji.userName);
      
      // Add to recent reactions
      setRecentReactions(prev => [...prev.slice(-9), { ...receivedEmoji, isOwn: false }]);
    });
  }, [receivedEmojis, addFloatingReaction]);

  // Debug logging for props changes
  useEffect(() => {
    console.log('📊 EmojiReactions: Props updated:', {
      receivedEmojis: receivedEmojis.length,
      reactionCounts: Object.keys(reactionCounts).length,
      activeUsers,
      isConnected
    });
  }, [receivedEmojis, reactionCounts, activeUsers, isConnected]);

  return (
    <div className="mt-8 relative">
      {/* Floating Reactions Overlay - Positioned absolutely to cover the entire practice area */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <AnimatePresence>
          {floatingReactions.map((reaction) => (
            <motion.div
              key={reaction.id}
              initial={{
                x: `${reaction.x}vw`,
                y: `${reaction.y}vh`,
                opacity: 1,
                scale: 0.8,
              }}
              animate={{
                y: `${reaction.y + 60}vh`, // Float downward
                opacity: 0,
                scale: 1.5,
                rotate: Math.random() * 60 - 30,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: animationDuration / 1000,
                ease: "easeOut",
              }}
              className="absolute pointer-events-none select-none"
              style={{
                fontSize: "48px",
                filter: "drop-shadow(3px 3px 6px rgba(0,0,0,0.5))",
                zIndex: 1000,
              }}
            >
              <div className="flex flex-col items-center">
                <div className="text-5xl mb-1">{reaction.emoji}</div>
                {reaction.userName && (
                  <div className="text-xs bg-black/70 text-white px-2 py-1 rounded-full font-medium">
                    {reaction.userName}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
          <div className="flex items-center gap-2 mb-1">
            {isConnected ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs text-gray-400">
              {isConnected ? 'リアルタイム接続中' : '接続待ち'}
            </span>
          </div>
          <div className="text-sm text-gray-400">アクティブユーザー: {activeUsers}</div>
          <div className="text-xs text-gray-500">送信済み: {sentEmojis.length}</div>
          <div className="text-xs text-gray-500">フローティング: {floatingReactions.length}</div>
        </div>
      </div>

      {/* Emoji Selection Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {emojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiClickWithAnimation(emoji)}
            className={`relative p-3 text-2xl rounded-lg transition-all transform hover:scale-110 ${
              activeEmoji === emoji
                ? 'bg-brand-brown/30 border-2 border-brand-brown scale-110'
                : 'hover:bg-gray-800/20 border-2 border-transparent hover:border-brand-brown/50'
            } ${emojiAnimation === emoji ? 'animate-bounce' : ''}`}
          >
            {emoji}
            {/* Show global reaction count for this emoji */}
            {reactionCounts[emoji] > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {reactionCounts[emoji]}
                </span>
              </div>
            )}
            {/* Show personal count as a smaller badge if you've sent this emoji */}
            {sentEmojis.filter((e) => e === emoji).length > 0 && (
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-brand-brown rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">
                  {sentEmojis.filter((e) => e === emoji).length}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Recent Emoji Stream with User Names */}
      <div className="bg-gray-800/20 rounded-lg p-4 border border-gray-700/30 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-brand-brown" />
          <h4 className="text-sm font-semibold text-white">リアルタイム感想</h4>
        </div>
        <div className="flex flex-wrap gap-2 min-h-[40px] items-center">
          {recentReactions.length > 0 ? (
            recentReactions.slice(-10).map((reaction) => (
              <div 
                key={reaction.id} 
                className={`flex items-center gap-1 rounded-full px-3 py-2 transition-all ${
                  reaction.isOwn 
                    ? 'bg-brand-brown/20 border border-brand-brown/30' 
                    : 'bg-blue-500/20 border border-blue-500/30'
                }`}
              >
                <span className="text-lg">{reaction.emoji}</span>
                <span className={`text-xs font-medium ${
                  reaction.isOwn ? 'text-brand-brown' : 'text-blue-400'
                }`}>
                  {reaction.userName}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">感想を送信して他の練習者とコミュニケーションしましょう</p>
          )}
        </div>
      </div>

      {/* Global Reaction Counts */}
      {Object.keys(reactionCounts).length > 0 && (
        <div className="mb-4 p-3 bg-gray-800/20 border border-gray-700/30 rounded-lg">
          <div className="text-sm font-medium text-gray-300 mb-2">
            グローバルリアクション統計 ({activeUsers}人が参加中):
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(reactionCounts)
              .sort(([,a], [,b]) => b - a) // Sort by count, descending
              .map(([emoji, count]) => (
                <div key={emoji} className="flex items-center gap-1 bg-blue-500/20 rounded-full px-3 py-1">
                  <span className="text-base">{emoji}</span>
                  <span className="text-sm font-medium text-blue-300">{count}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Send Button */}
      {activeEmoji && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSendWithAnimation}
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
