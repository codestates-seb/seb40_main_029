import * as Style from './InputStyle';
export interface InputProps {
  placeholder?: string;
  value;
  size?: string;
  border?: string;
  color?: string;
  name?: string;
  id?: string;
}

const Input = ({ id, placeholder, value, size, border, color }: InputProps) => {
  const sizeStyle = Style.SIZES[size];
  const borderStyle = Style.BORDER[border];
  return (
    <Style.InputItem
      id={id}
      sizeStyle={sizeStyle}
      borderStyle={borderStyle}
      color={color}
      {...value}
      type="text"
      placeholder={placeholder}
    />
  );
};

export default Input;