const CHANNEL_ID = '2876833';
const READ_API_KEY = '1P2BBEZ0FX67UYVP';
const WRITE_API_KEY = '4F7V1WJ5P80T06FE';

export const fetchHealthReadings = async () => {
  try {
    const response = await fetch(
      `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch readings');
    return await response.json();
  } catch (error) {
    console.error('Error fetching health readings:', error);
    throw error;
  }
};

export const submitHealthReading = async (field: number, value: number) => {
  try {
    const response = await fetch(
      `https://api.thingspeak.com/update?api_key=${WRITE_API_KEY}&field${field}=${value}`
    );
    if (!response.ok) throw new Error('Failed to submit reading');
    return await response.json();
  } catch (error) {
    console.error('Error submitting health reading:', error);
    throw error;
  }
};