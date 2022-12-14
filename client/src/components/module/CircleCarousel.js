import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import { PaletteList } from '../../api/ThemeStoreApi';

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
  box-shadow: 2px 0px 4px 4px rgba(22, 27, 29, 0.1);
  border-radius: 50%;
  transition: 0.5s;
  transform-origin: center center;
  ::before {
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

const CircleCarousel = ({ carouselIndex, paletteInfo, setPaletteInfo }) => {
  const [carouselDetail, setCarouselDetail] = useState({
    carouselDeg: 17,
    itemDeg: -17,
    centerItem: 0,
    prevItem: 7,
    lastItem: 7,
    nextItem: 1,
  });

  useEffect(() => {
    const loadData = async () => {
      const paletteInfo = await PaletteList();
      setCarouselDetail({ ...carouselDetail, carousel: paletteInfo });
      const paletteInfoArr = [];
      for (let i = 0; i < paletteInfo.length; i++) {
        const el = {};
        el.paletteName = paletteInfo[i][0].paletteKorName;
        el.palettePrice = paletteInfo[i][0].palettePrice;
        paletteInfoArr.push(el);
      }
      setPaletteInfo(paletteInfoArr);
    };
    loadData();
  }, []);

  const next = () => {
    setCarouselDetail({
      ...carouselDetail,
      carouselDeg: carouselDetail.carouselDeg - 45,
      itemDeg: carouselDetail.itemDeg + 45,
      centerItem: carouselDetail.nextItem,
    });
  };

  const prev = () => {
    setCarouselDetail({
      ...carouselDetail,
      carouselDeg: carouselDetail.carouselDeg + 45,
      itemDeg: carouselDetail.itemDeg - 45,
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
      {carouselDetail.carousel && (
        <Carousel
          style={{ transform: `rotate(${carouselDetail.carouselDeg}deg)` }}
        >
          {carouselDetail.carousel[carouselIndex] &&
            carouselDetail.carousel[carouselIndex].map((item, index) => (
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
