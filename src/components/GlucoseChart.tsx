import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { HealthReading } from '../types';
import { formatDate } from '../utils/healthUtils';

interface Props {
  readings: HealthReading[];
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const getDescription = (name: string, value: number) => {
    switch (name) {
      case 'Heart Rate':
        return value < 60
          ? 'Bradycardia: Abnormally slow heart rate'
          : value > 100
          ? 'Tachycardia: Abnormally fast heart rate'
          : 'Normal resting heart rate';
      case 'SpO2':
        return value < 95
          ? 'Critical: Immediate medical attention needed'
          : value < 97
          ? 'Warning: Below normal oxygen saturation'
          : 'Normal blood oxygen level';
      case 'Temperature':
        return value < 36.1
          ? 'Hypothermia: Below normal body temperature'
          : value > 37.2
          ? 'Fever: Above normal body temperature'
          : 'Normal body temperature';
      case 'GSR':
        return 'Galvanic Skin Response: Measures electrical conductance of the skin, indicating stress or emotional arousal';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
      <p className="font-semibold text-gray-900">{formatDate(label)}</p>
      <div className="space-y-2 mt-2">
        {payload.map((entry, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="font-medium">{entry.name}:</span>
              <span>{entry.value} {entry.unit}</span>
            </div>
            <p className="text-sm text-gray-600">{getDescription(entry.name, entry.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GlucoseChart: React.FC<Props> = ({ readings }) => {
  const data = readings.map((reading) => ({
    time: reading.created_at,
    'Heart Rate': parseFloat(reading.field1),
    'SpO2': parseFloat(reading.field2),
    'Temperature': parseFloat(reading.field3),
    'GSR': parseFloat(reading.field4),
    
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatDate} interval="preserveStartEnd" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line name="Heart Rate" type="monotone" dataKey="Heart Rate" stroke="#2563eb" unit="bpm" strokeWidth={2} dot={{ fill: '#2563eb' }} />
          <Line name="SpO2" type="monotone" dataKey="SpO2" stroke="#16a34a" unit="%" strokeWidth={2} dot={{ fill: '#16a34a' }} />
          <Line name="Temperature" type="monotone" dataKey="Temperature" stroke="#dc2626" unit="°C" strokeWidth={2} dot={{ fill: '#dc2626' }} />
          <Line name="GSR" type="monotone" dataKey="GSR" stroke="#9333ea" unit="µS" strokeWidth={2} dot={{ fill: '#9333ea' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
