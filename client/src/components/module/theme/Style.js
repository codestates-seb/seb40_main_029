import styled from 'styled-components';

export const CarouselContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 59.9%;
  display: block;
  overflow: hidden;
`;

export const CarouselBtnContainer = styled.div`
  padding-top: 50px;
  padding-left: 40px;
`;

export const Carousel = styled.div`
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

export const ItemCarousel = styled.div`
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
