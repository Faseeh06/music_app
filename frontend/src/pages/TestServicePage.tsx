import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import * as practiceService from '../services/practiceService';
import { DocumentSnapshot, Timestamp } from 'firebase/firestore';

// Simplified interface for the modal, can be expanded
interface ModalHistoryItem {
  id: string;
  songTitle: string;
  artist: string;
  score: number;
  practicedAt: Date;
  duration: number;
}

const HistoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  history: ModalHistoryItem[] | null;
  loading: boolean;
  error: string | null;
}> = ({ isOpen, onClose, history, loading, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-800 text-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">My Practice History</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div className="overflow-y-auto">
          {loading && <p>Loading history...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {history && history.length > 0 ? (
            <ul className="space-y-3">
              {history.map(item => (
                <li key={item.id} className="bg-gray-700 p-4 rounded-md">
                  <p className="font-semibold text-lg">{item.songTitle} - <span className="font-normal text-gray-300">{item.artist}</span></p>
                  <p>Score: <span className="font-bold text-green-400">{item.score}</span></p>
                  <p>Duration: {item.duration} minutes</p>
                  <p className="text-sm text-gray-400">Practiced on: {item.practicedAt.toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No practice history found.</p>
          )}
        </div>
      </div>
    </div>
  );
};


const TestServicePage: React.FC = () => {
  const { currentUser: user } = useAuth();
  const [output, setOutput] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | undefined>(undefined);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState<ModalHistoryItem[] | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const handleServiceCall = async (serviceCall: Promise<unknown>) => {
    setLoading(true);
    setError(null);
    setOutput(null);
    try {
      const result = await serviceCall;
      setOutput(result);
      // Handle pagination for different function results
      if (result && typeof result === 'object' && 'lastDoc' in result) {
        const potentialLastDoc = result.lastDoc as DocumentSnapshot | undefined;
        // Ensure it's a valid snapshot before setting, to prevent bad pagination requests
        if (potentialLastDoc && typeof potentialLastDoc.exists === 'function') {
          setLastDoc(potentialLastDoc);
        } else {
          setLastDoc(undefined); // Reset if the last doc is invalid or not present
        }
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
      setOutput(null);
    } finally {
      setLoading(false);
    }
  };

  const resetPagination = () => {
    setLastDoc(undefined);
    alert('Pagination has been reset.');
  };

  // --- Modal and History Handlers ---
  const handleShowHistoryModal = async () => {
    if (!user) return;
    setIsHistoryModalOpen(true);
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const result = await practiceService.getUserPracticeHistory(user.uid, {});
      const formattedData = result.history.map(item => ({
        ...item,
        practicedAt: (item.completedAt as Timestamp).toDate(),
      }));
      setHistoryData(formattedData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setHistoryError(e.message);
      } else {
        setHistoryError('An unknown error occurred while fetching history.');
      }
    } finally {
      setHistoryLoading(false);
    }
  };

  // --- Core Function Handlers ---
  const handleLogPracticeSession = () => {
    if (!user) return;
    const sessionData: practiceService.PracticeSessionInput = {
      songTitle: 'Stairway to Heaven',
      artist: 'Led Zeppelin',
      duration: Math.floor(Math.random() * 20) + 5,
      score: Math.floor(Math.random() * 50) + 51, // Score between 51-100
      difficulty: 5,
      practiceType: 'song',
      notes: 'Practiced the solo section.',
    };
    const userInfo: practiceService.UserInfo = {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    handleServiceCall(practiceService.logPracticeSession(userInfo, sessionData));
  };

  const handleGetSongLeaderboard = () => {
    const songId = 'stairway_to_heaven_led_zeppelin'; // Example songId
    handleServiceCall(practiceService.getSongLeaderboard(songId, { limitCount: 5, lastDoc }));
  };

  const handleGetUserPracticeHistory = () => {
    if (!user) return;
    handleServiceCall(practiceService.getUserPracticeHistory(user.uid, { limitCount: 5, lastDoc }));
  };

  const handleGetAllUserSongData = () => {
    if (!user) return;
    handleServiceCall(practiceService.getAllUserSongData(user.uid));
  };

  return (
    <>
      <HistoryModal 
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        history={historyData}
        loading={historyLoading}
        error={historyError}
      />
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-200 mb-6">Practice Service Test Page</h1>
        {!user ? (
          <p className="text-gray-600">Please sign in to use the test page.</p>
        ) : (
          <div className="space-y-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700"><span className="font-semibold">Logged in as:</span> {user.displayName || user.email}</p>
              <p className="text-sm text-gray-700"><span className="font-semibold">User ID:</span> {user.uid}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Core Actions</h2>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleLogPracticeSession}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Log Dummy Practice Session
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Data Fetching</h2>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleGetSongLeaderboard}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Get Song Leaderboard (Paginated)
                </button>
                <button 
                  onClick={handleGetUserPracticeHistory}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Get My Practice History (Paginated)
                </button>
                <button 
                  onClick={handleGetAllUserSongData}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Get All My Song Progress
                </button>
                 <button 
                  onClick={handleShowHistoryModal}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Show My Full Practice History (Modal)
                </button>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Controls</h2>
              <button 
                onClick={resetPagination}
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors mb-2"
              >
                Reset Pagination (clear lastDoc)
              </button>
              <p className="text-sm text-gray-600">Note: Some queries are paginated. Click a button again to get the next page, or reset.</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Output</h2>
              {loading && <p className="text-blue-600 font-medium">Loading...</p>}
              {error && (
                <pre className="text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                  <span className="font-semibold">Error:</span> {error}
                </pre>
              )}
              {output !== null && output !== undefined && (
                <pre className="bg-gray-100 p-4 rounded-lg border text-sm overflow-auto whitespace-pre-wrap break-all">
                  {JSON.stringify(output, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TestServicePage;
