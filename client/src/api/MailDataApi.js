import axios from 'axios';
const serverUrl = `${process.env.REACT_APP_BASIC_URL}`;
const mockUrl = 'http://localhost:3001';

export const getAllMails = async memberId => {
  // const res = await axios.get(serverUrl + '/mails' + `/${memberId}`);
  const res = await axios.get(mockUrl + '/mails' + `?receiverId=${memberId}`);
  return res.data;
};

export const deleteMail = async (memberId, mailId) => {
  // const res = await axios.delete(serverUrl + `/mails/${memberId}/${mailId}`);
  const res = await axios.delete(
    mockUrl + `/mails?receiverId=${memberId}&mailId=${mailId}`
  );
  return res.data;
};

export const sendMail = async ({ body, senderName, receiverName }) => {
  // const res = await axios.post(serverUrl + '/mails', {
  //   body,
  //   senderName,
  //   receiverName,
  // });
  const res = await axios.post(mockUrl + '/mails', {
    body,
    senderName,
    receiverName,
  });
  return res.data;
};

export const readMail = async (memberId, mailId) => {
  // const res = await axios.patch(serverUrl + `/mails/${memberId}/${mailId}`);
  const res = await axios.patch(
    mockUrl + `/mails?receiverId=${memberId}&mailId=${mailId}`
  );
  return res.data;
};
