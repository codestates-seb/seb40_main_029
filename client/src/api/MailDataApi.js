import axios from 'axios';
const url = `${process.env.REACT_APP_NGROK_URL}`;
const serverUrl = `${process.env.REACT_APP_BASIC_URL}`;

export const getAllMails = async memberId => {
  const res = await axios.get(serverUrl + '/mails' + `/${memberId}`);
  // const res = await axios.get(url + '/mails' + `/${memberId}`);
  return res.data;
};

export const deleteMail = async (memberId, mailId) => {
  const res = await axios.delete(serverUrl + `/mails/${memberId}/${mailId}`);
  // const res = await axios.delete(url + `/mails/${memberId}/${mailId}`);
  return res.data;
};

export const sendMail = async ({ body, senderName, receiverName }) => {
  const res = await axios.post(serverUrl + '/mails', {
    body,
    senderName,
    receiverName,
  });
  // const res = await axios.post(url + '/mails', {
  //   body,
  //   senderName,
  //   receiverName,
  // });
  return res.data;
};

export const readMail = async (memberId, mailId) => {
  const res = await axios.patch(serverUrl + `/mails/${memberId}/${mailId}`);
  // const res = await axios.patch(url + `/mails/${memberId}/${mailId}`);
  return res.data;
};
