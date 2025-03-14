export const getHeartRateStatus = (value: number) => {
  if (value < 60) return { status: 'Low', color: 'text-red-600' };
  if (value > 100) return { status: 'High', color: 'text-red-600' };
  return { status: 'Normal', color: 'text-green-600' };
};

export const getSpO2Status = (value: number) => {
  if (value < 95) return { status: 'Critical', color: 'text-red-600' };
  if (value < 97) return { status: 'Warning', color: 'text-yellow-600' };
  return { status: 'Normal', color: 'text-green-600' };
};

export const getTemperatureStatus = (value: number) => {
  if (value < 36.1) return { status: 'Low', color: 'text-red-600' };
  if (value > 37.2) return { status: 'High', color: 'text-red-600' };
  return { status: 'Normal', color: 'text-green-600' };
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};