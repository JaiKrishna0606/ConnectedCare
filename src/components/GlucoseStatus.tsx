import React from 'react';
import { Activity } from 'lucide-react';
import { getGlucoseStatus } from '../utils/glucoseUtils';

interface Props {
  level: number;
  timestamp: string;
}

export const GlucoseStatus: React.FC<Props> = ({ level, timestamp }) => {
  const { status, color } = getGlucoseStatus(level);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Current Glucose Level</h2>
        <Activity className="w-6 h-6 text-blue-600" />
      </div>
      <div className="text-4xl font-bold mb-2">
        {level} <span className="text-lg">mg/dL</span>
      </div>
      <div className={`text-lg font-medium ${color}`}>{status}</div>
      <div className="text-sm text-gray-500 mt-2">
        Last updated: {new Date(timestamp).toLocaleString()}
      </div>
    </div>
  );
};