import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getCookie } from '../../utils/cookie';
import {
  memberIdSelector,
  paletteCodeSelector,
  myPaletteSelector,
} from '../../redux/hooks';
import { setMyPalette, setPaletteCode } from '../../redux/slice';
import { BuyPalette, SetPalette } from '../../api/ThemeStoreApi';
import { StoreModal } from './Modal';
import CircleCarousel from './CircleCarousel';
import Button from '../atoms/Button';
import Overlay from '../atoms/Overlay';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

const TitleContainer = styled.div`
  margin: 5px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Point = styled.div`
  height: 50px;
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
  height: 100%;
  display: block;
  overflow: hidden;
`;

export const ThemeStore = ({ pointRefresher }) => {
  const dispatch = useDispatch();
  const memberId = useSelector(memberIdSelector);
  const paletteCodeSelec = useSelector(paletteCodeSelector);
  const myPalette = useSelector(myPaletteSelector);
  const [carouselIndex, setIndex] = useState(0);
  const [applyBtnIsdisabled, setapplyBtnIsdisabled] = useState(false);
  const [paletteCode, SetPaletteCode] = useState('P00' + (carouselIndex + 1));
  const [refresher, setRefresher] = useState(-1);
  const [paletteInfo, setPaletteInfo] = useState(-1);
  const [popup, setPopup] = useState(false);
  const accessToken = getCookie('accessToken');
  const lastIndex = 5;

  const handleBuy = (paletteCode, memberId) => {
    (async () => {
      const result = await BuyPalette(paletteCode, memberId);
      if (result) {
        pointRefresher();
        toast('????????? ????????? ?????????????????????');
        dispatch(setMyPalette(paletteCode));
        setRefresher(refresher * -1);
      }
    })();
  };

  const onBuyClick = () => {
    {
      accessToken
        ? handleBuy(paletteCode, memberId)
        : (setPopup(!popup),
          toast('?????? ?????????????????????', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
    }
  };

  const handleSet = (paletteCode, memberId) => {
    SetPalette(paletteCode, memberId);
    toast('????????? ????????? ?????????????????????');
    dispatch(setPaletteCode(paletteCode));
    setRefresher(refresher * -1);
  };

  const onSetClick = () => {
    {
      accessToken
        ? handleSet(paletteCode, memberId)
        : (setPopup(true),
          toast('?????? ?????????????????????', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
    }
  };

  const isMine = () => {
    // ??? ???????????? ???????????? ?????? ????????? ?????? ?????? ????????? ???????????? ??? ?????? ?????? ????????????(true)
    const condition1 =
      myPalette.includes(paletteCode) == false ||
      paletteCodeSelec == paletteCode;
    // ??? ???????????? ???????????? ?????? ?????? ????????? ???????????? ?????? ??? ?????? ?????? ?????????(false)
    const condition2 =
      myPalette.includes(paletteCode) == true &&
      paletteCodeSelec != paletteCode;
    const isDisabled = condition1 ? true : condition2 ? false : null;
    setapplyBtnIsdisabled(isDisabled);

    // ???????????? ??? ??????
    // if (
    //   myPalette.includes(paletteCode) == false ||
    //   paletteCodeSelec == paletteCode // ??? ???????????? ???????????? ?????? ????????? ?????? ?????? ????????? ???????????? ??? ?????? ?????? ????????????
    // ) {
    //   setapplyBtnIsdisabled(true);
    // } else if (
    //   myPalette.includes(paletteCode) == true &&
    //   paletteCodeSelec != paletteCode // ??? ???????????? ???????????? ?????? ?????? ????????? ???????????? ?????? ??? ?????? ?????? ?????????
    // ) {
    //   setapplyBtnIsdisabled(false);
    // }
  };

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

  useEffect(() => {
    SetPaletteCode('P00' + (carouselIndex + 1));
  }, [carouselIndex]);

  useEffect(() => {
    isMine();
  }, [paletteCode, refresher]);

  return (
    <StoreModal>
      {popup && <Overlay />}
      <TitleContainer>
        {Array.isArray(paletteInfo) && (
          <>
            <Point>{`${paletteInfo[carouselIndex].palettePrice}P`}</Point>
            <PaletteName>{paletteInfo[carouselIndex].paletteName}</PaletteName>
          </>
        )}
        <BtnContainer>
          <Button
            size="long"
            fontsize="middle"
            onClick={onBuyClick}
            disabled={myPalette.includes(paletteCode)}
          >
            ??????
          </Button>
          <Button
            size="long"
            fontsize="middle"
            onClick={onSetClick}
            disabled={applyBtnIsdisabled}
          >
            ??????
          </Button>
        </BtnContainer>
      </TitleContainer>
      <ArrowContainer>
        <FontAwesomeIcon
          icon={faChevronLeft}
          size="2x"
          onClick={() => toLeft()}
          style={{ cursor: 'pointer' }}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          size="2x"
          onClick={() => toRight()}
          style={{ cursor: 'pointer' }}
        />
      </ArrowContainer>
      <CarouselContainer>
        <CircleCarousel
          carouselIndex={carouselIndex}
          paletteInfo={paletteInfo}
          setPaletteInfo={setPaletteInfo}
        />
      </CarouselContainer>
    </StoreModal>
  );
};

export default ThemeStore;
