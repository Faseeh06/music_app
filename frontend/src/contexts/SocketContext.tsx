import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../hooks/useAuth';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  joinSong: (songId: string) => void;
  leaveSong: (songId: string) => void;
  sendEmoji: (emoji: string, songId: string) => void;
  addReaction: (emoji: string, songId: string) => void;
  receivedEmojis: ReceivedEmoji[];
  reactionCounts: Record<string, number>;
  activeUsers: number;
  clearReceivedEmojis: () => void;
}

export interface ReceivedEmoji {
  id: string;
  emoji: string;
  userId: string;
  userName: string;
  timestamp: number;
}

interface ReactionUpdate {
  songId: string;
  reactions: Record<string, number>;
  activeUsers: number;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [receivedEmojis, setReceivedEmojis] = useState<ReceivedEmoji[]>([]);
  const [reactionCounts, setReactionCounts] = useState<Record<string, number>>({});
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    console.log('🔌 Initializing socket connection...');
    console.log('👤 Current user:', user);
    
    // Initialize socket connection
    const newSocket = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to socket server, Socket ID:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from socket server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('🚨 Socket connection error:', error);
    });

    // Listen for global reaction updates
    newSocket.on('reaction-update', (data: ReactionUpdate) => {
      console.log('📊 Received reaction update:', data);
      setReactionCounts(data.reactions);
      setActiveUsers(data.activeUsers);
    });

    // Listen for individual emoji reactions from other users (for floating animation)
    newSocket.on('emoji-received', (emojiData: ReceivedEmoji) => {
      console.log('😀 Received emoji from another user:', emojiData);
      setReceivedEmojis(prev => {
        const newEmojis = [...prev, emojiData];
        console.log('📝 Updated receivedEmojis:', newEmojis);
        return newEmojis;
      });
      
      // Remove emoji after 3 seconds
      setTimeout(() => {
        setReceivedEmojis(prev => prev.filter(emoji => emoji.id !== emojiData.id));
      }, 3000);
    });

    // Listen for user join/leave notifications
    newSocket.on('user-joined', ({ userName, message, activeUsers: userCount }) => {
      console.log('👋 User joined:', message, 'Active users:', userCount);
      setActiveUsers(userCount);
    });

    newSocket.on('user-left', ({ userName, message, activeUsers: userCount }) => {
      console.log('👋 User left:', message, 'Active users:', userCount);
      setActiveUsers(userCount);
    });

    setSocket(newSocket);

    return () => {
      console.log('🔌 Cleaning up socket connection');
      newSocket.close();
    };
  }, [user]);

  const joinSong = (songId: string) => {
    if (!socket) {
      console.error('❌ Cannot join song - socket not connected');
      return;
    }
    if (!user) {
      console.error('❌ Cannot join song - user not authenticated');
      return;
    }
    
    const userData = {
      songId,
      userId: user.uid,
      userName: user.displayName || user.email || 'Anonymous User'
    };
    console.log('🎵 Joining song room:', userData);
    socket.emit('join-song', userData);
  };

  const leaveSong = (songId: string) => {
    if (socket && user) {
      const userData = {
        songId,
        userId: user.uid,
        userName: user.displayName || user.email || 'Anonymous User'
      };
      console.log('🚪 Leaving song room:', userData);
      socket.emit('leave-song', userData);
    }
  };

  // New method for adding reactions with counting
  const addReaction = (emoji: string, songId: string) => {
    if (!socket) {
      console.error('❌ Cannot send reaction - socket not connected');
      return;
    }
    if (!user) {
      console.error('❌ Cannot send reaction - user not authenticated');
      return;
    }
    
    const reactionData = {
      emoji,
      songId,
      userId: user.uid,
      userName: user.displayName || user.email || 'Anonymous User'
    };
    console.log('⚡ Sending reaction:', reactionData);
    socket.emit('add-reaction', reactionData);
  };

  // Legacy method for backward compatibility
  const sendEmoji = (emoji: string, songId: string) => {
    if (socket && user) {
      const emojiData = {
        emoji,
        songId,
        userId: user.uid,
        userName: user.displayName || user.email || 'Anonymous User'
      };
      console.log('📤 Sending emoji (legacy):', emojiData);
      socket.emit('send-emoji', emojiData);
    }
  };

  const clearReceivedEmojis = () => {
    setReceivedEmojis([]);
  };

  const value: SocketContextType = {
    socket,
    isConnected,
    joinSong,
    leaveSong,
    sendEmoji,
    addReaction,
    receivedEmojis,
    reactionCounts,
    activeUsers,
    clearReceivedEmojis,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}; 