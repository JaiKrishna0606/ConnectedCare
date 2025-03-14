import React from 'react';
import { Activity } from 'lucide-react';
import { HealthStatus } from '../types';

interface Props {
  title: string;
  value: number;
  unit: string;
  status: HealthStatus;
  timestamp: string;
}

export const HealthParameter: React.FC<Props> = ({ title, value, unit, status, timestamp }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Activity className="w-6 h-6 text-blue-600" />
      </div>
      <div className="text-4xl font-bold mb-2">
        {value} <span className="text-lg">{unit}</span>
      </div>
      <div className={`text-lg font-medium ${status.color}`}>{status.status}</div>
      <div className="text-sm text-gray-500 mt-2">
        Last updated: {new Date(timestamp).toLocaleString()}
      </div>
    </div>
  );
};