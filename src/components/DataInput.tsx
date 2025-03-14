import React, { useState } from 'react';
import { submitHealthReading } from '../utils/api';

interface FieldInput {
  id: number;
  name: string;
  unit: string;
}

const fields: FieldInput[] = [
  { id: 1, name: 'Heart Rate', unit: 'bpm' },
  { id: 2, name: 'SpO2', unit: '%' },
  { id: 3, name: 'Temperature', unit: '°C' },
  { id: 4, name: 'GSR', unit: 'µS' },
];

export const DataInput: React.FC = () => {
  const [selectedField, setSelectedField] = useState<number>(1);
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) return;

    setIsSubmitting(true);
    try {
      await submitHealthReading(selectedField, parseFloat(value));
      setValue('');
      // You might want to trigger a refresh of the readings here
    } catch (error) {
      console.error('Error submitting reading:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Reading</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Parameter
          </label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {fields.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name} ({field.unit})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Enter value in ${fields[selectedField - 1].unit}`}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.1"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};