export interface HealthReading {
  created_at: string;
  entry_id: number;
  field1: string; // Heart Rate
  field2: string; // SpO2
  field3: string; // Body Temperature
  field4: string; // GSR
  field5?: string;//Blood Glucose (New)
}

export interface ThingSpeakResponse {
  channel: {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    last_entry_id: number;
  };
  feeds: HealthReading[];
}

export interface HealthStatus {
  status: string;
  color: string;
}

export interface User {
  name: string;
  age: number;
  weight: number;
  targetLevels: {
    heartRate: { min: number; max: number };
    spO2: { min: number; max: number };
    temperature: { min: number; max: number };
  };
}