import { Place, TooltipProps } from 'react-tooltip';

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

export interface Tooltip extends TooltipProps {
  info: string;
  place?: Place;
}
