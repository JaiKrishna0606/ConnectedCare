import { create } from 'zustand';
import type { User, HealthReading } from "../types";

interface Store {
  user: User | null;
  readings: HealthReading[];
  isLoading: boolean;
  error: string | null;
  autoRefresh: boolean;
  setUser: (user: User | null) => void;
  setReadings: (readings: HealthReading[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setAutoRefresh: (enabled: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  readings: [],
  isLoading: false,
  error: null,
  autoRefresh: true,
  setUser: (user) => set({ user }),
  setReadings: (readings) => set({ readings }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setAutoRefresh: (autoRefresh) => set({ autoRefresh }),
}));
