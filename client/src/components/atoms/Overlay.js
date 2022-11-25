import styled from 'styled-components';

const OverLay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Overlay = () => {
  return <OverLay className="overlay"></OverLay>;
};

export default Overlay;
