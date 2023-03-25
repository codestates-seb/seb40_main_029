import * as Style from './InputStyle';

export interface InputProps {
  placeholder?: string;
  value: string[];
  size?: 'long';
  border?: 'shadow' | 'transparent';
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
