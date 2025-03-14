import React, { useEffect } from 'react';
import { Activity, AlertTriangle } from 'lucide-react';
import { useStore } from './store/useStore';
import { fetchHealthReadings } from './utils/api';
import { getHeartRateStatus, getSpO2Status, getTemperatureStatus } from './utils/healthUtils';
import { HealthParameter } from './components/HealthParameter';
import { GlucoseChart } from './components/GlucoseChart';
import { AutoRefreshToggle } from './components/AutoRefreshToggle';
import AIHighlightCard from './components/Aihighlight';
import BloodGlucoseCard from './components/BloodGlucoseCard';

function App() {
  const { readings, isLoading, error, autoRefresh, setReadings, setLoading, setError } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchHealthReadings();
        setReadings(data.feeds);
        setError(null);
      } catch (err) {
        setError('Failed to fetch health readings');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    let interval: number | null = null;

    if (autoRefresh) {
      interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const latestReading = readings[readings.length - 1];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                Connected Care 💚
              </h1>
            </div>
            <AutoRefreshToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : (
          <>
          <div><AIHighlightCard/> </div>
      
          <div className="space-y-6">
            {latestReading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HealthParameter
                  title="Heart Rate"
                  value={parseFloat(latestReading.field1)}
                  unit="bpm"
                  status={getHeartRateStatus(parseFloat(latestReading.field1))}
                  timestamp={latestReading.created_at}
                />
                <HealthParameter
                  title="SpO2"
                  value={parseFloat(latestReading.field2)}
                  unit="%"
                  status={getSpO2Status(parseFloat(latestReading.field2))}
                  timestamp={latestReading.created_at}
                />
                <HealthParameter
                  title="Temperature"
                  value={parseFloat(latestReading.field3)}
                  unit="°C"
                  status={getTemperatureStatus(parseFloat(latestReading.field3))}
                  timestamp={latestReading.created_at}
                />
                <HealthParameter
                  title="GSR"
                  value={parseFloat(latestReading.field4)}
                  unit="µS"
                  status={{ status: 'Info', color: 'text-blue-600' }}
                  timestamp={latestReading.created_at}
                />
              </div>
            )}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Health Trends</h2>
              <GlucoseChart readings={readings} />
            </div>
          </div>
          </>
          
        )}
      </main>
    </div>
  );
}

export default App;
