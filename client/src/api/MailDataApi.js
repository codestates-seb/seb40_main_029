import axios from 'axios';
export const url = 'http://localhost:3001';

export const getAllMails = async () => {
  const res = await axios.get(url + '/mails');
  return res.data;
};

export const deleteMail = async ({ mailId }) => {
  const res = await axios.delete(url + `/mails/${mailId}`);
  return res.data;
};
