import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PracticePageHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 left-4 z-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-800/40 text-gray-300 hover:text-white rounded-lg border border-gray-700/50 transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">戻る</span>
      </button>
    </div>
  );
};

export default PracticePageHeader;
