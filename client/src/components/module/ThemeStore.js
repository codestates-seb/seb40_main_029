import styled from 'styled-components';
import { useState } from 'react';
import { StoreModal } from './Modal';
import Button from '../atoms/Button';
import CircleCarousel from './CircleCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const TitleContainer = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Point = styled.div`
  margin-top: 20px;
  font-size: 17px;
  font-weight: 500;
  color: #fcc403;
`;

const PaletteName = styled.div`
  margin: 10px;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 3px;
`;

const BtnContainer = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 45px;
  padding-right: 45px;
  .arrow {
    color: gray;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 59%;
  display: block;
  overflow: hidden;
`;

const CarouselBtnContainer = styled.div`
  padding-top: 50px;
  padding-left: 40px;
`;

export const ThemeStore = () => {
  const [carouselIndex, setIndex] = useState(0);
  const lastIndex = 4;

  const toRight = () => {
    if (carouselIndex < lastIndex) {
      setIndex(carouselIndex + 1);
    } else {
      setIndex(0);
    }
  };

  const toLeft = () => {
    if (carouselIndex > 0) {
      setIndex(carouselIndex - 1);
    } else {
      setIndex(lastIndex);
    }
  };

  console.log(carouselIndex);
  return (
    <StoreModal>
      <TitleContainer>
        <Point>1000P</Point>
        <PaletteName>테라코타</PaletteName>
        <BtnContainer>
          <Button size="long" fontsize="middle">
            구매
          </Button>
          <Button size="long" fontsize="middle">
            적용
          </Button>
        </BtnContainer>
      </TitleContainer>
      <ArrowContainer>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2x"
          onClick={() => toLeft()}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          onClick={() => toRight()}
        />
      </ArrowContainer>
      <CircleCarousel carouselIndex={carouselIndex} />
    </StoreModal>
  );
};

export default ThemeStore;
