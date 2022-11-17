import styled from 'styled-components';
import { useState } from 'react';
import { StoreModal } from './Modal';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faCircleHalfStroke,
  faPaperPlane,
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
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 59%;
  display: block;
  overflow: hidden;
`;

const CarouselBtnContainer = styled.div`
  padding-top: 70px;
  padding-left: 50px;
`;

const Carousel = styled.div`
  position: absolute;
  bottom: -200px;
  left: 170px;
  width: 364px;
  height: 364px;
  background-color: black;
  border-radius: 50%;
  transition: 0.5s;
  /* transform: rotate(15deg); */
  transform-origin: center center;
  ::before {
    /* content: “”; */
    position: absolute;
    width: 50%;
    height: 100%;
    background: #000;
    border-radius: 50% 0 0 50%;
  }
`;

const ItemCarousel = styled.div`
  position: absolute;
  border-radius: 10%;
  background-color: ${props => props.color || '#fff'};
  width: 70px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 2px;
  bottom: 0;
  transition: 0.5s;

  /* &.next {
    background: blue;
    color: white;
  }
  &.prev {
    background: green;
    color: white;
  }

  &.active {
    background: #000;
    color: white;
  } */

  &:nth-child(1) {
    // 기쁨
    right: -9px;
    top: 157px;
    left: 310px;
  }
  &:nth-child(2) {
    // 분노
    right: 30px;
    top: 253px;
  }
  &:nth-child(3) {
    // 설렘
    right: 165px;
    top: 308px;
  }
  &:nth-child(4) {
    // 걱정
    right: 285px;
    top: 245px;
  }
  &:nth-child(5) {
    // 평온
    right: 15px;
    top: 13px;
  }
  &:nth-child(6) {
    // 예민
    right: 150px;
    top: -45px;
    left: 158px;
  }
  &:nth-child(7) {
    // 슬픔
    right: 250px;
    top: 10px;
    right: 280px;
  }
  &:nth-child(8) {
    // 희망
    right: 325px;
    top: 100px;
  }
`;

export const ColorCarousel = () => {
  const [state, setState] = useState({
    carouselDeg: 17,
    itemDeg: -17,
    centerItem: 0,
    prevItem: 7,
    lastItem: 7,
    nextItem: 1,
    carousel: [
      { name: '기쁨', id: 0, position: 1, color: '#EE8242' },
      { name: '분노', id: 1, position: 2, color: '#EE8686' },
      { name: '설렘', id: 2, position: 3, color: '#E6AACB' },
      { name: '걱정', id: 3, position: 4, color: '#D2CCC2' },
      { name: '평온', id: 4, position: 5, color: '#FFE27A' },
      { name: '예민', id: 5, position: 6, color: '#6868AC' },
      { name: '슬픔', id: 6, position: 7, color: '#9FC1EE' },
      { name: '희망', id: 7, position: 8, color: '#A7CF99' },
    ],
  });

  const getIdItems = side => {
    // true = next, false = prev
    const { nextItem, prevItem, lastItem } = state;

    if (side) {
      setState({ ...state, centerItem: nextItem });
      () => prevNext(state.centerItem);
    } else {
      setState({ ...state, centerItem: prevItem });
      () => prevNext(state.centerItem);
    }

    const prevNext = itemId => {
      if (itemId === lastItem) {
        setState({ ...state, nextItem: 0, prevItem: lastItem - 1 });
      } else if (itemId === 0) {
        setState({ ...state, prevItem: lastItem, nextItem: 1 });
      } else {
        setState({
          ...state,
          nextItem: state.centerItem + 1,
          prevItem: state.centerItem - 1,
        });
      }
    };
  };

  console.log(state);

  const next = () => {
    getIdItems(true);
    setState({
      ...state,
      carouselDeg: state.carouselDeg - 45,
      itemDeg: state.itemDeg + 45,
    });
  };

  const prev = () => {
    getIdItems(false);
    setState({
      ...state,
      carouselDeg: state.carouselDeg + 45,
      itemDeg: state.itemDeg - 45,
    });
  };

  // const getCssClass = id => {
  //   const { centerItem, nextItem, prevItem } = state;

  //   if (id === centerItem) {
  //     return 'active';
  //   } else if (id === nextItem) {
  //     return 'next';
  //   } else if (id === prevItem) {
  //     return 'prev';
  //   }
  // };

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
        <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          onClick={() => toRight()}
        />
      </ArrowContainer>
      <CarouselContainer>
        <CarouselBtnContainer>
          <Button size="long" fontsize="little" onClick={next}>
            Next
          </Button>
          <Button size="long" fontsize="little" onClick={prev}>
            prev
          </Button>
        </CarouselBtnContainer>
        <Carousel style={{ transform: `rotate(${state.carouselDeg}deg)` }}>
          {state.carousel.map((item, index) => (
            <ItemCarousel
              key={item.id}
              id={item.id}
              color={item.color}
              style={{ transform: `rotate(${state.itemDeg}deg)` }}
            >
              {item.name}
            </ItemCarousel>
          ))}
        </Carousel>
      </CarouselContainer>
    </StoreModal>
  );
};

export default ColorCarousel;
