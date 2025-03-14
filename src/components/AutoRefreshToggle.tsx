import React from 'react';
import { RefreshCw, RefreshCcw } from 'lucide-react';
import { useStore } from '../store/useStore';

export const AutoRefreshToggle: React.FC = () => {
  const { autoRefresh, setAutoRefresh } = useStore();

  return (
    <button
      onClick={() => setAutoRefresh(!autoRefresh)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
        autoRefresh
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {autoRefresh ? (
        <RefreshCw className="h-5 w-5" />
      ) : (
        <RefreshCcw className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">
        Auto Refresh: {autoRefresh ? 'On' : 'Off'}
      </span>
    </button>
  );
};