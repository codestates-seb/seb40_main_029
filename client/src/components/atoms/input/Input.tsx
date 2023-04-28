import * as Style from './InputStyle';

export interface InputProps {
  placeholder?: string;
  value: string[];
  color?: string;
  name?: string;
  id?: string;
}

const Input = ({ id, placeholder, value, color }: InputProps) => {
  return (
    <Style.InputItem
      id={id}
      color={color}
      {...value}
      type="text"
      placeholder={placeholder}
    />
  );
};

export default Input;
