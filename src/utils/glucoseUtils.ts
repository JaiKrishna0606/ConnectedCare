export const getGlucoseStatus = (level: number) => {
  if (level < 70) return { status: 'Critical Low', color: 'text-red-600' };
  if (level > 180) return { status: 'Critical High', color: 'text-red-600' };
  if (level >= 70 && level <= 140) return { status: 'Normal', color: 'text-green-600' };
  return { status: 'Warning', color: 'text-yellow-600' };
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};