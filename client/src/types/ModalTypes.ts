export interface ModalType {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}
export type Modal =
  | 'LetterModal'
  | 'TodoModal'
  | 'FriendModal'
  | 'ThemeModal'
  | 'MonthlyModal'
  | 'LookbackModal';

export interface GlobalModalType {
  setHiddenCard: React.Dispatch<React.SetStateAction<boolean>>;
}
