import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { CalendarDays, ChevronDown, Search, Download } from 'lucide-react';

const dummySessions = [
  {
    date: '2024-01-15',
    time: '14:30-15:15',
    duration: '45:00',
    song: 'Wonderwall - Oasis',
    instrument: 'Guitar',
    rating: 5,
    notes: 'Worked on the chorus transition',
  },
  {
    date: '2024-01-14',
    time: '19:00-19:25',
    duration: '25:00',
    song: 'Hotel California - Eagles',
    instrument: 'Guitar',
    rating: 4,
    notes: 'Solo section needs more work',
  },
];

const insights = [
  'Most active day: Tuesday (avg 2.3 sessions)',
  'Longest streak: 7 days (Jan 10-16)',
  'Most improved song: Stairway to Heaven (+40% accuracy)',
  'Recommendation: Try practicing in shorter, focused chunks',
];

const HistoryPage: React.FC = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Navbar />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Practice History</h1>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 items-center">
            <button className="flex items-center gap-2 bg-brand-brown text-white px-4 py-2 rounded-lg font-medium">
              <CalendarDays className="w-5 h-5" /> Last 30 days <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-brand-brown text-white px-4 py-2 rounded-lg font-medium">
              🎸 All instruments <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 bg-brand-brown text-white px-4 py-2 rounded-lg font-medium">
              ⏱️ All durations <ChevronDown className="w-4 h-4" />
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search songs..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
            <button className="ml-auto flex items-center gap-2 bg-brand-brown text-white px-4 py-2 rounded-lg font-medium">
              <Download className="w-5 h-5" /> Export
            </button>
          </div>
          {/* Calendar View */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg w-full max-w-2xl mx-auto">
            <div className="text-gray-900 font-semibold mb-2">Calendar View</div>
            <div className="grid grid-cols-7 gap-2 text-center text-gray-400 mb-2">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>
            {/* Dummy calendar days */}
            <div className="grid grid-cols-7 gap-2 text-center">
              <div></div><div></div><div className="text-gray-400">1</div><div className="text-gray-400">2</div><div className="text-gray-400">3</div><div className="text-gray-400">4</div><div></div>
              <div className="text-gray-400">5</div><div className="text-gray-400">6</div><div className="text-gray-400">7</div><div className="text-gray-400">8</div><div className="text-gray-400">9</div><div className="text-gray-400">10</div><div className="text-gray-400">11</div>
              <div className="text-gray-400">12</div><div className="text-gray-400">13</div><div className="bg-brand-brown text-white rounded-full">14</div><div className="bg-brand-brown text-white rounded-full">15</div><div className="bg-brand-brown text-white rounded-full">16</div><div className="text-gray-400">17</div><div className="text-gray-400">18</div>
              <div className="text-gray-400">19</div><div className="text-gray-400">20</div><div className="bg-brand-brown text-white rounded-full">21</div><div className="text-gray-400">22</div><div className="bg-brand-brown text-white rounded-full">23</div><div className="text-gray-400">24</div><div className="text-gray-400">25</div>
              <div className="text-gray-400">26</div><div className="text-gray-400">27</div><div className="text-gray-400">28</div><div className="text-gray-400">29</div><div className="text-gray-400">30</div><div className="text-gray-400">31</div><div></div>
            </div>
            <div className="mt-2 text-xs text-gray-400 flex items-center gap-2"><span className="bg-brand-brown w-3 h-3 rounded-full inline-block"></span> = Practice day</div>
          </div>
          {/* Session Details */}
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg w-full max-w-2xl mx-auto">
            <div className="text-gray-900 font-semibold mb-4">Session Details</div>
            {dummySessions.map((session, idx) => (
              <div key={idx} className="mb-6 last:mb-0 border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex flex-wrap gap-4 items-center text-gray-600 mb-1">
                  <span>📅 {session.date}</span>
                  <span>⏰ {session.time}</span>
                  <span>⏱️ {session.duration}</span>
                </div>
                <div className="text-lg text-gray-900 font-semibold mb-1">🎵 {session.song}</div>
                <div className="flex flex-wrap gap-4 items-center text-gray-500 mb-1">
                  <span>🎸 {session.instrument}</span>
                  <span>📊 Session Rating: {'⭐'.repeat(session.rating)}</span>
                </div>
                <div className="text-gray-500 mb-2">📝 Notes: {session.notes}</div>
                <div className="flex gap-2">
                  <button className="bg-brand-brown text-white px-3 py-1 rounded-lg text-sm font-medium">▶️ Practice Again</button>
                  <button className="bg-gray-100 text-gray-900 px-3 py-1 rounded-lg text-sm font-medium border border-gray-200">📊 View Stats</button>
                </div>
              </div>
            ))}
          </div>
          {/* Practice Insights */}
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-2xl mx-auto">
            <div className="text-gray-900 font-semibold mb-2">Practice Insights</div>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              {insights.map((insight, idx) => (
                <li key={idx}>{insight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage; 