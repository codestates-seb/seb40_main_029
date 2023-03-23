export interface Mail {
  mailId: number; //pk
  senderDisplayName: string; //보낸이 닉네임
  body: string; //편지내용
  senderId: number; //보낸이 pk
  receiverId: number; //받는이 pk
  verifyMail: boolean; //메일 확인 여부
  createdAt: string; //메일 수신 날짜
}

export interface MailState {
  mails: Mail[];
  setMails: React.Dispatch<React.SetStateAction<Mail[]>>;
}
