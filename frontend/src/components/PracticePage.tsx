import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MusicPlayerBar from './MusicBar';
import { useMusicPlayer } from '../contexts/PlayerContext';
import { useSidebar } from '../contexts/SidebarContext';
import { usePracticeSessions } from '../hooks/usePracticeSessions';
import { getSongLeaderboard } from '../services/practiceService';
import PracticePageHeader from './practice/PracticePageHeader';
import MusicPlayer from './practice/MusicPlayer';
import PracticeTimer from './practice/PracticeTimer';
import EmojiReactions from './practice/EmojiReactions';
import PracticeSidebar from './practice/PracticeSidebar';
import { Song, ChordPosition, LeaderboardEntry } from '../types';
import { PracticeSessionInput } from '../services/practiceSessionService';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const PracticePage: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const { isCollapsed } = useSidebar();
  const { currentTrack, isPlaying } = useMusicPlayer();
  const { addSession } = usePracticeSessions();
  const [practiceTime, setPracticeTime] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);
  const [showChords, setShowChords] = useState(true);
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null);
  const [selectedChord, setSelectedChord] = useState<string | null>(null);
  const [sentEmojis, setSentEmojis] = useState<string[]>([]);
  const [emojiAnimation, setEmojiAnimation] = useState<string | null>(null);

  const practiceTimeRef = useRef(practiceTime);
  practiceTimeRef.current = practiceTime;

  const currentTrackRef = useRef(currentTrack);
  currentTrackRef.current = currentTrack;

  // Mock Song Data - Replace with API call
  const song: Song = currentTrack ? {
    id: currentTrack.id,
    title: currentTrack.title,
    artist: currentTrack.channelTitle,
    youtubeId: currentTrack.id,
    currentPractitioners: Math.floor(Math.random() * 100) + 1,
    difficulty: 'Intermediate',
    duration: '4:23',
    chords: [{name: 'Am'}, {name: 'G'}, {name: 'F'}, {name: 'C'}, {name: 'Dm'}, {name: 'Em'}],
    sections: [
      { name: 'イントロ', startTime: 0, endTime: 30 },
      { name: 'バース1', startTime: 30, endTime: 60 },
      { name: 'コーラス', startTime: 60, endTime: 90 },
      { name: 'バース2', startTime: 90, endTime: 120 },
      { name: 'ブリッジ', startTime: 120, endTime: 150 },
      { name: 'アウトロ', startTime: 150, endTime: 180 }
    ]
  } : {
    id: songId || '1',
    title: 'No Song Selected',
    artist: 'Select a song to practice',
    youtubeId: '',
    currentPractitioners: 0,
    difficulty: 'Beginner',
    duration: '0:00',
    chords: [],
    sections: []
  };

  const chordPositions: Record<string, ChordPosition> = {
    'Am': { chord: 'Am', frets: [0, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0] },
    'G': { chord: 'G', frets: [3, 2, 0, 0, 3, 3], fingers: [3, 1, 0, 0, 4, 4] },
    'F': { chord: 'F', frets: [1, 1, 3, 3, 2, 1], fingers: [1, 1, 3, 4, 2, 1] },
    'C': { chord: 'C', frets: [0, 1, 0, 2, 3, 0], fingers: [0, 1, 0, 2, 3, 0] },
    'Dm': { chord: 'Dm', frets: [0, 0, 0, 2, 3, 1], fingers: [0, 0, 0, 1, 3, 2] },
    'Em': { chord: 'Em', frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0] }
  };

  useEffect(() => {
    if (songId) {
      setLeaderboardLoading(true);
      getSongLeaderboard(songId)
        .then((data: { leaderboard: DocumentData[], lastDoc: QueryDocumentSnapshot<DocumentData> | null } | undefined) => {
          if (!data) return;
          const rankedData: LeaderboardEntry[] = data.leaderboard.map((item, index) => ({
            userId: item.userId,
            userName: item.userName,
            score: item.score,
            userAvatar: item.userAvatar,
            rank: index + 1,
          }));
          setLeaderboard(rankedData);
        })
        .catch((err: Error) => console.error(err))
        .finally(() => setLeaderboardLoading(false));
    }
  }, [songId]);

  useEffect(() => {
    return () => {
      const finalPracticeTime = practiceTimeRef.current;
      const finalTrack = currentTrackRef.current;

      if (finalPracticeTime > 0 && finalTrack && songId) {
        const score = Math.floor(Math.random() * 30) + 70;
        const sessionData: PracticeSessionInput = {
            songTitle: finalTrack.title,
            artist: finalTrack.channelTitle,
            duration: finalPracticeTime,
            score: score,
            difficulty: 3, // Placeholder
            practiceType: 'song',
        };
        addSession(sessionData)
          .catch((err: Error) => console.error("Failed to log practice session:", err));
      }
    };
  }, [songId, addSession]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setPracticeTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderChordDiagram = (chordName: string) => {
    const chordData = chordPositions[chordName];
    if (!chordData) return null;

    return (
      <div className="bg-gray-700/30 border border-gray-600/50 rounded-lg p-3 text-center">
        <div className="font-bold text-lg mb-2 text-white">{chordName}</div>
        <div className="relative">
          <svg width="80" height="100" className="mx-auto">
            {[0, 1, 2, 3, 4, 5].map((string: number) => (
              <line key={string} x1={15 + string * 10} y1={10} x2={15 + string * 10} y2={85} stroke="#9CA3AF" strokeWidth="1" />
            ))}
            {[0, 1, 2, 3, 4].map((fret: number) => (
              <line key={fret} x1={15} y1={10 + fret * 15} x2={65} y2={10 + fret * 15} stroke="#9CA3AF" strokeWidth="1" />
            ))}
            {chordData.frets.map((fret: number, string: number) => {
              if (fret === 0) return null;
              return <circle key={string} cx={15 + string * 10} cy={10 + (fret - 0.5) * 15} r="4" fill="#8B4513" />;
            })}
          </svg>
        </div>
      </div>
    );
  };

  const handleEmojiClick = (emoji: string) => {
    setActiveEmoji(emoji);
    setEmojiAnimation(emoji);
    setSentEmojis(prev => [...prev, emoji]);
    setTimeout(() => setEmojiAnimation(null), 1000);
  };

  const handleSendEmoji = () => {
    if (activeEmoji) {
      setSentEmojis(prev => [...prev, activeEmoji]);
      setActiveEmoji(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#101218] to-[#03020a] font-poppins">
      <Sidebar />
      <div className={`transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Navbar />
        <PracticePageHeader />

        <div className="px-4 py-8 flex flex-col gap-8">
          <div className="grid lg:grid-cols-12 gap-6">
            <MusicPlayer leaderboard={leaderboard} leaderboardLoading={leaderboardLoading} />
            <PracticeTimer practiceTime={practiceTime} formatTime={formatTime} />
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9 p-6">
              <EmojiReactions
                sentEmojis={sentEmojis}
                activeEmoji={activeEmoji}
                emojiAnimation={emojiAnimation}
                onEmojiClick={handleEmojiClick}
                onSend={handleSendEmoji}
                onCancel={() => setActiveEmoji(null)}
              />
            </div>
            <PracticeSidebar
              chords={song.chords}
              selectedChord={selectedChord}
              onChordSelect={setSelectedChord}
              renderChordDiagram={renderChordDiagram}
              leaderboard={leaderboard}
              showChords={showChords}
              onToggleShowChords={() => setShowChords(!showChords)}
            />
          </div>
        </div>
      </div>
      <MusicPlayerBar />
    </div>
  );
};

export default PracticePage;