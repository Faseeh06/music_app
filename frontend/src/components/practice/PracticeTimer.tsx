import React from 'react';
import { Timer } from 'lucide-react';

interface PracticeTimerProps {
  practiceTime: number;
  formatTime: (seconds: number) => string;
}

const PracticeTimer: React.FC<PracticeTimerProps> = ({ practiceTime, formatTime }) => {
  return (
    <div className="lg:col-span-3 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="w-5 h-5 text-brand-brown" />
        <h3 className="text-lg font-bold text-white">練習時間</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/20 transition-colors">
          <span className="text-gray-300">今日</span>
          <span className="text-white font-mono">{formatTime(practiceTime)}</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/20 transition-colors">
          <span className="text-gray-300">合計</span>
          <span className="text-white font-mono">23:45</span>
        </div>
      </div>
    </div>
  );
};

export default PracticeTimer;
