import styled from 'styled-components';

export const TitleContainer = styled.div`
  margin: 5px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Point = styled.div`
  height: 50px;
  margin-top: 20px;
  font-size: 17px;
  font-weight: 500;
  color: #fcc403;
`;

export const PaletteName = styled.div`
  margin: 10px;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 3px;
`;

export const BtnContainer = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

export const ArrowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 45px;
  padding-right: 45px;
  .arrow {
    color: gray;
  }
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
`;
