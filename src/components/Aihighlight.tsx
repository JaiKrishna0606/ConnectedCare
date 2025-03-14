import React, { useEffect, useState, useRef } from "react";
import { fetchHealthReadings } from "../utils/api";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface MetricData {
  glucose: number;
  heartRate: number;
  spO2: number;
  bodyTemperature: number;
  gsr: number;
}

const AIHighlightCard: React.FC = () => {
  const [data, setData] = useState<MetricData | null>(null);
  const [aiMessage, setAiMessage] = useState<string>("");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchHealthReadings();
        const latestEntry = response.feeds[response.feeds.length - 1];
        const newData: MetricData = {
          glucose: Number(parseFloat(String(latestEntry?.field1)).toFixed(2)),
          heartRate: Number(parseFloat(String(latestEntry?.field2)).toFixed(2)),
          spO2: Number(parseFloat(String(latestEntry?.field3)).toFixed(2)),
          bodyTemperature: Number(parseFloat(String(latestEntry?.field4)).toFixed(2)),
          gsr: Number(parseFloat(String(latestEntry?.field5)).toFixed(2)),
        };
        setData(newData);
        generateAIInsights(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const generateAIInsights = (metrics: MetricData) => {
    if (!metrics) return "No data available.";

    let messages: string[] = [];

    if (metrics.glucose > 180) {
      messages.push("⚠️ High blood sugar detected! Consider insulin or dietary changes.");
    } else if (metrics.glucose < 70) {
      messages.push("🚨 Low blood sugar detected! Consume glucose immediately.");
    } else {
      messages.push("✅ Your glucose levels are stable.");
    }

    if (metrics.heartRate > 100) {
      messages.push("⚠️ High heart rate detected! Consider resting.");
    }

    if (metrics.spO2 < 90) {
      messages.push("🚨 Low SpO2 detected. Ensure proper oxygenation.");
    }

    if (metrics.bodyTemperature > 37.5) {
      messages.push("⚠️ You might have a fever. Stay hydrated and monitor.");
    }

    if (metrics.gsr > 1500) {
      messages.push("🔴 High stress levels detected! Try deep breathing.");
    }

    setAiMessage(messages.join("\n"));
  };

  const downloadPDF = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 180, (canvas.height * 180) / canvas.width);
        pdf.save("diabetes_insights.pdf");
      });
    }
  };

  return (
    <div className=" w-full py-4">
      <div
        ref={cardRef}
        className="border-2 border-dashed border-gray-400 p-4 rounded-lg shadow-md bg-white"
      >
        <h2 className="text-xl font-bold text-black-600">⚠️ AI Health Insights</h2>
        <p className="text-gray-700 mt-2 whitespace-pre-line">{aiMessage}</p>
        <button
        onClick={downloadPDF}
        className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        📥 Download Report
      </button>
      </div>
    
    </div>
  );
};

export default AIHighlightCard;
