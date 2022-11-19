import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
// import { PaletteList } from '../../api/PaletteShop';

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

const Carousel = styled.div`
  position: absolute;
  bottom: -200px;
  left: 170px;
  width: 364px;
  height: 364px;
  background-color: #ffffff;
  box-shadow: 2px 0px 4px 4px rgba(22, 27, 29, 0.1);
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
  position: fixed;
  border-radius: 10%;
  transform-origin: 260px;
  top: 135px;
  left: -80px;
  right: -80px;
  background-color: ${props => props.color || '#fff'};
  width: 120px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 2px;
  transition: 0.5s;
`;

const CircleCarousel = () => {
  const [palette, setPalette] = useState({
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

  // useEffect(() => {
  //   const theme = PaletteList();
  //   setpalette(...palette, theme)
  // }, []);

  const getIdItems = side => {
    // true = next, false = prev
    const { nextItem, prevItem, lastItem } = palette;

    if (side) {
      setPalette({ ...palette, centerItem: nextItem });
      () => prevNext(palette.centerItem);
    } else {
      setPalette({ ...palette, centerItem: prevItem });
      () => prevNext(palette.centerItem);
    }

    const prevNext = itemId => {
      if (itemId === lastItem) {
        setPalette({ ...palette, nextItem: 0, prevItem: lastItem - 1 });
      } else if (itemId === 0) {
        setPalette({ ...palette, prevItem: lastItem, nextItem: 1 });
      } else {
        setPalette({
          ...palette,
          nextItem: palette.centerItem + 1,
          prevItem: palette.centerItem - 1,
        });
      }
    };
  };

  const next = () => {
    getIdItems(true);
    setPalette({
      ...palette,
      carouselDeg: palette.carouselDeg - 45,
      itemDeg: palette.itemDeg + 45,
    });
  };

  const prev = () => {
    getIdItems(false);
    setPalette({
      ...palette,
      carouselDeg: palette.carouselDeg + 45,
      itemDeg: palette.itemDeg - 45,
    });
  };

  return (
    <CarouselContainer>
      <CarouselBtnContainer>
        <Button size="long" fontsize="little" onClick={next}>
          Next
        </Button>
        <Button size="long" fontsize="little" onClick={prev}>
          prev
        </Button>
      </CarouselBtnContainer>
      <Carousel style={{ transform: `rotate(${palette.carouselDeg}deg)` }}>
        {palette.carousel.map((item, index) => (
          <ItemCarousel
            key={item.id}
            id={item.id}
            color={item.color}
            style={{ transform: `rotate(calc(360deg / 8 * ${item.id}))` }}
          >
            {item.name}
          </ItemCarousel>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default CircleCarousel;
