import axios from 'axios';
const serverUrl = process.env.REACT_APP_BASIC_URL;
const mockUrl = 'http://localhost:3001';

export const getDayMood = async (displayName: string) => {
  const res = await axios.get(serverUrl + `/mood/day/${displayName}`);
  // const res = await axios.get(mockUrl + `/moods?moodId=1`);
  return res.data;
};
