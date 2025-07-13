import React from 'react';
import { Guitar, Users, Target, Trophy, Crown, Medal } from 'lucide-react';
import { Chord, LeaderboardEntry } from '../../types';

interface ChordChartProps {
  chords: Chord[];
  selectedChord: string | null;
  onChordSelect: (chord: string) => void;
  renderChordDiagram: (chordName: string) => React.ReactNode;
}

const ChordChart: React.FC<ChordChartProps> = ({ chords, selectedChord, onChordSelect, renderChordDiagram }) => {
  return (
    <div className="space-y-6">
      {/* Chord Selection Grid */}
      <div className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/30">
        <h4 className="text-sm font-semibold text-white mb-3">コード選択</h4>
        <div className="grid grid-cols-2 gap-3">
          {chords.map((chord, index) => (
            <button
              key={index}
              onClick={() => onChordSelect(chord.name)}
              className={`relative p-4 rounded-lg text-center font-mono text-xl transition-all transform hover:scale-105 ${
                selectedChord === chord.name
                  ? 'bg-gradient-to-r from-brand-brown to-brand-yellow text-white shadow-lg border-2 border-brand-brown'
                  : 'bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 border-2 border-transparent hover:border-brand-brown/50'
              }`}
            >
              {chord.name}
              {selectedChord === chord.name && (
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-brand-yellow rounded-full flex items-center justify-center">
                  <Target className="w-2 h-2 text-black" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Chord Diagram */}
      {selectedChord && (
        <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-2xl text-brand-brown">{selectedChord}</span>
              <span className="text-sm font-normal text-gray-400">コード</span>
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-gray-400">練習中</span>
            </div>
          </div>
          <div className="flex justify-center">{renderChordDiagram(selectedChord)}</div>
          <div className="mt-4 p-3 bg-gray-700/20 rounded-lg">
            <h4 className="text-sm font-semibold text-white mb-2">練習のヒント</h4>
            <p className="text-xs text-gray-400">
              指の位置を確認し、各弦を個別に弾いて音がクリアに出るか確認しましょう。
            </p>
          </div>
        </div>
      )}

      {/* Chord Progression */}
      <div className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-white">コード進行</h4>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-brown" />
            <span className="text-xs text-gray-400">全{chords.length}コード</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {chords.map((chord, index) => (
            <button
              key={index}
              onClick={() => onChordSelect(chord.name)}
              className={`px-3 py-2 rounded-lg text-sm font-mono transition-colors ${
                selectedChord === chord.name
                  ? 'bg-brand-brown text-white'
                  : 'bg-gray-700/30 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              {chord.name}
            </button>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          コードをクリックして詳細を表示
        </div>
      </div>
    </div>
  );
};

interface PracticeSidebarProps {
    chords: Chord[];
    selectedChord: string | null;
    onChordSelect: (chord: string) => void;
    renderChordDiagram: (chordName: string) => React.ReactNode;
    leaderboard: LeaderboardEntry[];
    showChords: boolean;
    onToggleShowChords: () => void;
}

const PracticeSidebar: React.FC<PracticeSidebarProps> = ({
  chords,
  selectedChord,
  onChordSelect,
  renderChordDiagram,
  leaderboard,
  showChords,
  onToggleShowChords,
}) => {
  return (
    <div className="lg:col-span-3 p-6">
      {/* Enhanced Chord Chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Guitar className="w-5 h-5 text-brand-brown" />
            <h3 className="text-lg font-bold text-white">コード表</h3>
          </div>
          <button
            onClick={onToggleShowChords}
            className="text-sm text-brand-brown hover:text-brand-yellow transition-colors"
          >
            {showChords ? '非表示' : '表示'}
          </button>
        </div>
        {showChords && (
          <ChordChart
            chords={chords}
            selectedChord={selectedChord}
            onChordSelect={onChordSelect}
            renderChordDiagram={renderChordDiagram}
          />
        )}
      </div>

      {/* Enhanced Practice Leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-brown" />
            <h3 className="text-lg font-bold text-white">練習リーダーボード</h3>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-400">リアルタイム</span>
          </div>
        </div>

        <div className="bg-gray-800/20 rounded-xl p-4 border border-gray-700/30 space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.userId}
              className={`relative flex items-center justify-between p-4 rounded-lg transition-all hover:scale-[1.02] ${
                entry.userName === 'You'
                  ? 'bg-gradient-to-r from-brand-brown/30 to-brand-yellow/20 border-2 border-brand-brown/50 shadow-lg'
                  : 'bg-gray-700/30 hover:bg-gray-700/50 border border-gray-600/30'
              }`}
            >
              {/* Rank and Badge */}
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center justify-center w-10 h-10">
                  {entry.rank === 1 ? (
                    <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <Crown className="w-5 h-5 text-yellow-900" />
                    </div>
                  ) : entry.rank === 2 ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                      <Medal className="w-5 h-5 text-gray-700" />
                    </div>
                  ) : entry.rank === 3 ? (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center">
                      <Medal className="w-5 h-5 text-amber-900" />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-600/50 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">{entry.rank}</span>
                    </div>
                  )}

                  {/* Rank Change Indicator */}
                  {entry.rank <= 3 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">↑</span>
                    </div>
                  )}
                </div>

                {/* Player Info */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={entry.userAvatar || "/placeholder-avatar.png"}
                      alt={entry.userName}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-600/50"
                    />
                    {entry.userName === 'You' && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-brown rounded-full flex items-center justify-center">
                        <Target className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <span
                      className={`font-semibold ${
                        entry.userName === 'You' ? 'text-brand-yellow' : 'text-white'
                      }`}
                    >
                      {entry.userName}
                    </span>
                    {entry.userName === 'You' && (
                      <div className="text-xs text-brand-brown">あなた</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Score and Progress */}
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-xl text-brand-brown">{entry.score}</div>
                  <div className="text-xs text-gray-400">pts</div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-brown to-brand-yellow rounded-full transition-all"
                      style={{ width: `${(entry.score / 100) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400">{entry.score}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Current Position */}
        <div className="mt-4 bg-gradient-to-r from-brand-brown/20 to-brand-yellow/10 rounded-xl p-4 border border-brand-brown/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-brown rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white">あなたの現在位置</h4>
                <p className="text-sm text-gray-400">今日の練習で順位を上げましょう</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-brown">6位</div>
              <div className="text-xs text-gray-400">目標: 5位</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSidebar;
