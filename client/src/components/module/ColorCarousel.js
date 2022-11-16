import styled from 'styled-components';
import { useState } from 'react';

const Carousel = styled.div`
  position: relative;
  width: 364px;
  height: 364px;
  background-color: #edeaea;
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
    top: 131px;
  }
  &:nth-child(2) {
    // 분노
    right: 30px;
    top: 253px;
  }
  &:nth-child(3) {
    // 설렘
    right: 155px;
    top: 293px;
  }
  &:nth-child(4) {
    // 걱정
    right: 265px;
    top: 215px;
  }
  &:nth-child(5) {
    // 평온
    right: 45px;
    top: 9px;
  }
  &:nth-child(6) {
    // 예민
    right: 150px;
    top: -25px;
  }
  &:nth-child(7) {
    // 슬픔
    right: 263px;
    top: 7px;
  }
  &:nth-child(8) {
    // 희망
    right: 290px;
    top: 80px;
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
    <div className="App">
      <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button>
      <div className="test" />
      <Carousel style={{ transform: `rotate(${state.carouselDeg}deg)` }}>
        {state.carousel.map((item, index) => (
          // <div
          //   className={`item-carousel ${getCssClass(index)}`}
          //   key={item.id}
          //   id={item.id}
          //   style={{ transform: `rotate(${state.itemDeg}deg)` }}
          // >
          //   {item.name}
          // </div>
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
    </div>
  );
};

export default ColorCarousel;
