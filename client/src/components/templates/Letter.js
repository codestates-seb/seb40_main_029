import styled from 'styled-components';
import Letters from '../module/Letters';
import MoodCard from '../module/MoodCard';

const ContentLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Letter = () => {
  return (
    <ContentLayout>
      <MoodCard />
      <Letters />
    </ContentLayout>
  );
};

export default Letter;
