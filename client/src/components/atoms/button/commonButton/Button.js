import * as Style from './ButtonStyle';

function Button({ size, fontsize, children, onClick, disabled }) {
  const sizeStyle = Style.SIZES[size];
  const fontSizeStyle = Style.FONTSIZES[fontsize];

  return (
    <Style.Btn
      sizeStyle={sizeStyle}
      fontSizeStyle={fontSizeStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Style.Btn>
  );
}

export default Button;
