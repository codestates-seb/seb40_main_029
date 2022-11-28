import { useState } from 'react';
import { ContentLayout } from '../atoms/Layouts';
import Header from '../module/Header';
import { MailModal } from '../module/Modal';
import MoodCard from '../module/MoodCard';
import TodoList from '../module/TodoList';
import Friends from '../templates/Friends';
import Letter from './Letter';
import { useDispatch, useSelector } from 'react-redux';
import modalReducer from '../../redux/modalSlice';
import GlobalModal from './GlobalModal';

const Home = () => {
  // const dispatch = useDispatch();
  // const handleFriendModal = () => {
  //   dispatch(
  //     openModal({
  //       modalType: 'FriendModal',
  //       isOpen: true,
  //     })
  //   );
  // };
  // const handleLetterModal = () => {
  //   dispatch(
  //     openModal({
  //       modalType: 'LetterModal',
  //       isOpen: true,
  //     })
  //   );
  // };
  return (
    <>
      <Header />
      <ContentLayout>
        <MoodCard />
        {/* 여기서 모달 조정 */}
        <GlobalModal />
      </ContentLayout>
    </>
  );
};

export default Home;
