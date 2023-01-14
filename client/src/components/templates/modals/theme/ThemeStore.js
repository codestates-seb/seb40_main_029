import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCookie } from '../../../../utils/cookie';
import {
  memberIdSelector,
  paletteCodeSelector,
  myPaletteSelector,
} from '../../../../redux/hooks';
import { setMyPalette, setPaletteCode } from '../../../../redux/slice';
import { BuyPalette, SetPalette } from '../../../../api/ThemeStoreApi';
import Button from '../../../atoms/button/commonButton/Button';
import Overlay from '../../../atoms/overlay/Overlay';
import { StoreModal } from '../../../module/modal/Modal';
import CircleCarousel from '../../../module/theme/CircleCarousel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import * as Style from './Style';

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
        toast('팔레트 구매가 완료되었습니다');
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
          toast('먼저 로그인해주세요', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
    }
  };

  const handleSet = (paletteCode, memberId) => {
    SetPalette(paletteCode, memberId);
    toast('팔레트 적용이 완료되었습니다');
    dispatch(setPaletteCode(paletteCode));
    setRefresher(refresher * -1);
  };

  const onSetClick = () => {
    {
      accessToken
        ? handleSet(paletteCode, memberId)
        : (setPopup(true),
          toast('먼저 로그인해주세요', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
    }
  };

  const isMine = () => {
    // 내 팔레트에 포함하고 있지 않거나 또는 이미 적용한 팔레트일 때 적용 버튼 비활성화(true)
    const condition1 =
      myPalette.includes(paletteCode) == false ||
      paletteCodeSelec == paletteCode;
    // 내 팔레트에 포함하고 있고 내가 적용한 팔레트가 아닐 때 적용 버튼 활성화(false)
    const condition2 =
      myPalette.includes(paletteCode) == true &&
      paletteCodeSelec != paletteCode;
    const isDisabled = condition1 ? true : condition2 ? false : null;
    setapplyBtnIsdisabled(isDisabled);

    // 리팩토링 전 코드
    // if (
    //   myPalette.includes(paletteCode) == false ||
    //   paletteCodeSelec == paletteCode // 내 팔레트에 포함하고 있지 않거나 또는 이미 적용한 팔레트일 때 적용 버튼 비활성화
    // ) {
    //   setapplyBtnIsdisabled(true);
    // } else if (
    //   myPalette.includes(paletteCode) == true &&
    //   paletteCodeSelec != paletteCode // 내 팔레트에 포함하고 있고 내가 적용한 팔레트가 아닐 때 적용 버튼 활성화
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
      <Style.TitleContainer>
        {Array.isArray(paletteInfo) && (
          <>
            <Style.Point>{`${paletteInfo[carouselIndex].palettePrice}P`}</Style.Point>
            <Style.PaletteName>
              {paletteInfo[carouselIndex].paletteName}
            </Style.PaletteName>
          </>
        )}
        <Style.BtnContainer>
          <Button
            size="long"
            fontsize="middle"
            onClick={onBuyClick}
            disabled={myPalette.includes(paletteCode)}
          >
            구매
          </Button>
          <Button
            size="long"
            fontsize="middle"
            onClick={onSetClick}
            disabled={applyBtnIsdisabled}
          >
            적용
          </Button>
        </Style.BtnContainer>
      </Style.TitleContainer>
      <Style.ArrowContainer>
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
      </Style.ArrowContainer>
      <Style.CarouselContainer>
        <CircleCarousel
          carouselIndex={carouselIndex}
          paletteInfo={paletteInfo}
          setPaletteInfo={setPaletteInfo}
        />
      </Style.CarouselContainer>
    </StoreModal>
  );
};

export default ThemeStore;
