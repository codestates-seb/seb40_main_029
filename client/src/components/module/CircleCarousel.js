import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { PaletteList } from '../../api/PaletteShopApi';

const CarouselContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 59.9%;
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
  left: 180px;
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
  transform-origin: 270px;
  top: 130px;
  left: -90px;
  background-color: ${props => props.color || '#fff'};
  width: 140px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin: 2px;
  transition: 0.5s;
  box-shadow: 1px -2px 2px 1px rgba(22, 27, 29, 0.2);
`;

const CircleCarousel = ({ carouselIndex }) => {
  const [palette, setPalette] = useState({
    carouselDeg: 17,
    itemDeg: -17,
    centerItem: 0,
    prevItem: 7,
    lastItem: 7,
    nextItem: 1,
  });

  useEffect(() => {
    const loadData = async () => {
      // const API_URL = process.env.REACT_APP_BASIC_URL;
      const API_URL = process.env.REACT_APP_JSON_URL;
      const path = '/palette';
      try {
        // 팔레트가 담긴 배열
        await axios.get(API_URL + path).then(res => {
          // console.log(res.data);
          const paletteSet = [];
          for (let i = 0; i < res.data.length; i += 8)
            paletteSet.push(res.data.slice(i, i + 8));
          setPalette({ ...palette, carousel: paletteSet });
          // console.log(palette.carousel);
        });
      } catch (err) {
        throw err;
      }
    };
    loadData();
    // const loadData = async () => {
    //   const result = await PaletteList();
    //   console.log('결과');
    //   console.log(result);
    //   if (isCancelled) {
    //     return;
    //   }

    //   setPalette({ ...palette, result });
    // };
    // loadData();

    // PaletteList().then(res => {
    //   let temp = {};
    //   temp.carousel = res;
    //   console.log(temp);
    // });
    // .then(res => {
    //   console.log('객체');
    //   console.log(res);
    // let temp = {};
    // temp.carousel = res.data;

    // setPalette(...palette, paletteSet);
    // console.log(palette);
  }, []);

  // const getIdItems = side => {
  //   // true = next, false = prev
  //   const { nextItem, prevItem, lastItem, centerItem } = palette;

  //   if (side == true) {
  //     setPalette({ ...palette, centerItem: nextItem });
  //     () => prevNext(centerItem);
  //   } else {
  //     setPalette({ ...palette, centerItem: prevItem });
  //     () => prevNext(centerItem);
  //   }

  const prevNext = itemId => {
    if (itemId === palette.lastItem) {
      setPalette({ ...palette, nextItem: 0, prevItem: palette.lastItem - 1 });
    } else if (itemId === 0) {
      setPalette({ ...palette, prevItem: palette.lastItem, nextItem: 1 });
    } else {
      setPalette({
        ...palette,
        nextItem: palette.centerItem + 1,
        prevItem: palette.centerItem - 1,
      });
    }
  };
  //   console.log(palette);
  // };

  const next = () => {
    // getIdItems(true);
    // setPalette({ ...palette, centerItem: palette.nextItem });
    // console.log('돼');
    // prevNext(palette.centerItem);
    setPalette({
      ...palette,
      carouselDeg: palette.carouselDeg - 45,
      itemDeg: palette.itemDeg + 45,
      centerItem: palette.nextItem,
    });
    // prevNext(palette.centerItem);
    // console.log(palette);
  };

  const prev = () => {
    // getIdItems(false);
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
      {palette.carousel && (
        <Carousel style={{ transform: `rotate(${palette.carouselDeg}deg)` }}>
          {palette.carousel[carouselIndex] &&
            palette.carousel[carouselIndex].map((item, index) => (
              <ItemCarousel
                key={index}
                id={index}
                color={`#${item.colorCode}`}
                style={{
                  transform: `rotate(calc(360deg / 8 * ${index}))`,
                }}
              >
                {item.mood}
              </ItemCarousel>
            ))}
        </Carousel>
      )}
    </CarouselContainer>
  );
};

export default CircleCarousel;

// {palette.carousel &&
//   palette.carousel[{ index }].map((item, index) => (
//     <ItemCarousel
//       key={item.id}
//       id={item.id}
//       color={item.color}
//       style={{ transform: `rotate(calc(360deg / 8 * ${item.id}))` }}
//     >
//       {item.name}
//     </ItemCarousel>
//   ))}
