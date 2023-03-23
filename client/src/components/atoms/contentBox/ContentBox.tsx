import * as Style from './ContentBoxStyle';

interface ContentBoxProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const ContentBox = ({ children, onClick }: ContentBoxProps) => {
  return (
    <>
      <Style.Box onClick={onClick}>{children}</Style.Box>
    </>
  );
};

export default ContentBox;
