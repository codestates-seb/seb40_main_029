import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreModal } from './Modal';
import Button from '../atoms/Button';
import CircleCarousel from './CircleCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { BuyPalette, SetPalette } from '../../api/PaletteShopApi';
import {
  memberIdSelector,
  paletteCodeSelector,
  myPaletteSelector,
} from '../../redux/hooks';
import { setMyPalette, setPaletteCode } from '../../redux/slice';
import { showToast } from '../atoms/Toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const CarouselBtnContainer = styled.div`
  padding-top: 50px;
  padding-left: 40px;
`;

export const ThemeStore = ({ pointRefresher }) => {
  const dispatch = useDispatch();
  const memberId = useSelector(memberIdSelector);
  const paletteCodeSelec = useSelector(paletteCodeSelector);
  const myPalette = useSelector(myPaletteSelector);
  const [carouselIndex, setIndex] = useState(0);
  const [isdisabled, setDisable] = useState(false);
  const [paletteCode, SetPaletteCode] = useState('P00' + (carouselIndex + 1));
  const [button, setButton] = useState(-1);
  const lastIndex = 5;
  const paletteName = [
    '기본',
    '테라코타',
    '빈티지',
    '크리스마스',
    '모노',
    '비비드',
  ];
  const palettePoint = ['0P', '1000P', '500P', '1500P', '500P', '500P'];
  // console.log('팔레트 코드' + paletteCode);

  const handleBuy = (paletteCode, memberId) => {
    (async () => {
      console.log('토스트');
      const notify = () =>
        toast('Fetching the Model Do not Close', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 60000,
        });

      notify();
      // const result = await BuyPalette(paletteCode, memberId);
      // if (result) {
      //   dispatch(setMyPalette(paletteCode));
      //   // alert('팔레트 구매가 완료되었습니다');
      //   Toast('팔레트 구매가 완료되었습니다');
      //   pointRefresher();
      //   setButton(button * -1);
      // }
    })();
  };

  const handleSet = (paletteCode, memberId) => {
    SetPalette(paletteCode, memberId);
    dispatch(setPaletteCode(paletteCode));
    window.location.reload();
  };

  const isMine = () => {
    if (
      myPalette.includes(paletteCode) == false ||
      paletteCodeSelec == paletteCode
    ) {
      setDisable(true);
    } else if (
      myPalette.includes(paletteCode) == true &&
      paletteCodeSelec != paletteCode
    ) {
      setDisable(false);
    }
  };

  const toRight = () => {
    if (carouselIndex < lastIndex) {
      // console.log('인덱스');
      setIndex(carouselIndex + 1);
    } else {
      // console.log('인덱스');
      setIndex(0);
    }
  };

  const toLeft = () => {
    if (carouselIndex > 0) {
      // console.log('인덱스');
      setIndex(carouselIndex - 1);
    } else {
      // console.log('인덱스');
      setIndex(lastIndex);
    }
  };

  useEffect(() => {
    // console.log('팔레트 코드 업데이트');
    SetPaletteCode('P00' + (carouselIndex + 1));
  }, [carouselIndex]);

  useEffect(() => {
    isMine();
  }, [paletteCode, button]);

  return (
    <StoreModal>
      <TitleContainer>
        <Point>{palettePoint[carouselIndex]}</Point>
        <PaletteName>{paletteName[carouselIndex]}</PaletteName>
        <BtnContainer>
          <Button
            size="long"
            fontsize="middle"
            onClick={() => handleBuy(paletteCode, memberId)}
            disabled={myPalette.includes(paletteCode)}
          >
            구매
          </Button>
          <Button
            size="long"
            fontsize="middle"
            onClick={() => handleSet(paletteCode, memberId)}
            disabled={isdisabled}
          >
            적용
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
        <CircleCarousel carouselIndex={carouselIndex} />
      </CarouselContainer>
    </StoreModal>
  );
};

export default ThemeStore;
