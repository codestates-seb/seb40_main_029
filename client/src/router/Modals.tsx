import Letter from '../components/templates/modals/letter/Letter';
import TodoList from '../components/templates/modals/todo/TodoList';
import Friends from '../components/templates/modals/friend/Friend';
import ThemeStore from '../components/templates/modals/theme/ThemeStore';
import MonthlyLookback from '../components/templates/modals/monthly/MonthlyLookback';
import LookBack from '../components/templates/modals/yearly/YearlyLookBack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faEnvelope,
  faFilm,
  faHighlighter,
  faStore,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Tooltip } from '../types/ModalTypes';

interface Modal {
  type: string;
  component: JSX.Element;
  label: string;
  modalIcon: typeof FontAwesomeIcon;
  iconProp?: IconProp;
  isFull: boolean;
  withAuth: boolean;
  tooltip?: Tooltip;
}

export const modalList: Modal[] = [
  {
    type: 'LetterModal',
    component: <Letter />,
    label: '편지',
    modalIcon: FontAwesomeIcon,
    iconProp: faEnvelope,
    isFull: false,
    withAuth: false,
    tooltip: {
      info: '오른쪽 아래 + 버튼을 눌러서 친구에게 편지를 보낼 수 있어요.',
      place: 'right',
    },
  },
  {
    type: 'TodoModal',
    component: <TodoList lookbackRefresher={undefined} />,
    label: '오늘할일',
    modalIcon: FontAwesomeIcon,
    iconProp: faHighlighter,
    isFull: false,
    withAuth: false,
  },
  {
    type: 'FriendModal',
    component: <Friends />,
    label: '친구',
    modalIcon: FontAwesomeIcon,
    iconProp: faUserGroup,
    isFull: false,
    withAuth: false,
    tooltip: {
      info: '+ 버튼을 눌러서 친구의 무드카드를 얻어보세요.',
      place: 'right',
    },
  },
  {
    type: 'ThemeModal',
    component: <ThemeStore />,
    label: '색상테마',
    modalIcon: FontAwesomeIcon,
    iconProp: faStore,
    isFull: false,
    withAuth: false,
  },
  {
    type: 'MonthlyModal',
    component: <MonthlyLookback setHiddenCard={undefined} />,
    label: '한달기록',
    modalIcon: FontAwesomeIcon,
    iconProp: faCalendarDays,
    isFull: true,
    withAuth: true,
  },
  {
    type: 'LookbackModal',
    component: (
      <LookBack lookbackRefresh={undefined} setHiddenCard={undefined} />
    ),
    label: '일년기록',
    modalIcon: FontAwesomeIcon,
    iconProp: faFilm,
    isFull: true,
    withAuth: true,
  },
];
