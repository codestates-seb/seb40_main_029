import * as Style from './ButtonStyle';

export interface ButtonProps {
  size?: 'circle' | 'long';
  fontsize?: 'little' | 'middle' | 'large';
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

function Button({ size, fontsize, children, onClick, disabled }: ButtonProps) {
  const sizeStyle = Style.SIZES[size];
  const fontSizeStyle = Style.FONTSIZES[fontsize];

  return (
    <Style.Button
      sizeStyle={sizeStyle}
      fontSizeStyle={fontSizeStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Style.Button>
  );
}

export default Button;
