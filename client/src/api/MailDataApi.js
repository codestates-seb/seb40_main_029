import axios from 'axios';
export const url = 'http://localhost:3001';

const getAllMails = async () => {
  const res = await axios.get(url + '/mails');
  return res.data;
};

export default getAllMails;
