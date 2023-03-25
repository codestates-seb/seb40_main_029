import { useState, useEffect } from 'react';
import Button from '../../atoms/button/commonButton/Button';
import { PaletteList } from '../../../api/ThemeStoreApi';
import * as Style from './Style';

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
    <Style.CarouselContainer>
      <Style.CarouselBtnContainer>
        <Button size="long" fontsize="little" onClick={next}>
          Next
        </Button>
        <Button size="long" fontsize="little" onClick={prev}>
          prev
        </Button>
      </Style.CarouselBtnContainer>
      {carouselDetail.carousel && (
        <Style.Carousel
          style={{ transform: `rotate(${carouselDetail.carouselDeg}deg)` }}
        >
          {carouselDetail.carousel[carouselIndex] &&
            carouselDetail.carousel[carouselIndex].map((item, index) => (
              <Style.ItemCarousel
                key={index}
                id={index}
                color={`#${item.colorCode}`}
                style={{
                  transform: `rotate(calc(360deg / 8 * ${index}))`,
                }}
              >
                {item.mood}
              </Style.ItemCarousel>
            ))}
        </Style.Carousel>
      )}
    </Style.CarouselContainer>
  );
};

export default CircleCarousel;
