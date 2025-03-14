import React from "react";
import { AlertCircle, Droplet } from "lucide-react";

interface BloodGlucoseCardProps {
  glucoseLevel: number | null;
  timestamp: string;
}

const getGlucoseStatus = (glucose: number | null) => {
  if (glucose === null) return { status: "No Data", color: "text-gray-500" };
  if (glucose < 70) return { status: "Low", color: "text-blue-500" };
  if (glucose >= 70 && glucose <= 140) return { status: "Normal", color: "text-green-500" };
  if (glucose > 140) return { status: "High", color: "text-red-500" };
  return { status: "Unknown", color: "text-gray-500" };
};

const BloodGlucoseCard: React.FC<BloodGlucoseCardProps> = ({ glucoseLevel, timestamp }) => {
  const { status, color } = getGlucoseStatus(glucoseLevel);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <div className="flex items-center space-x-2">
        <Droplet className="h-6 w-6 text-purple-600" />
        <h2 className="text-lg font-semibold">Blood Glucose</h2>
      </div>
      <p className="text-2xl font-bold mt-2">
        {glucoseLevel !== null ? `${glucoseLevel.toFixed(1)} mg/dL` : "N/A"}
      </p>
      <p className={`mt-1 font-medium ${color}`}>{status}</p>
      <p className="text-xs text-gray-500 mt-1">Updated: {new Date(timestamp).toLocaleString()}</p>
      {status === "High" && (
        <div className="mt-2 flex items-center text-red-600">
          <AlertCircle className="h-5 w-5 mr-1" />
          <span>Warning: Elevated blood sugar levels</span>
        </div>
      )}
    </div>
  );
};

export default BloodGlucoseCard;
