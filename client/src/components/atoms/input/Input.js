import * as Style from './InputStyle';

const Input = ({ placeHolder, value, size, border, color }) => {
  const sizeStyle = InputStyle.SIZES[size];
  const borderStyle = InputStyle.BORDER[border];
  return (
    <Style.InputItem
      sizeStyle={sizeStyle}
      borderStyle={borderStyle}
      color={color}
      {...value}
      type="text"
      placeholder={placeHolder}
    />
  );
};

export default Input;
