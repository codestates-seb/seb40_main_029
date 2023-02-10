import * as Style from './ContentBoxStyle';

const ContentBox = ({ children, onClick, size }) => {
  const sizeStyle = Style.SIZES[size];
  return (
    <>
      <Style.Box onClick={onClick} sizeStyle={sizeStyle}>
        {children}
      </Style.Box>
    </>
  );
};

export default ContentBox;
