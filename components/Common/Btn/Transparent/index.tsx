import Btn, { BtnProps, STYLE, TYPE } from '../../Btn';

type TransparentProps = BtnProps;

const Transparent = ({ type, style, ...restProps }: TransparentProps) => (
  <Btn type={TYPE.button} style={STYLE.transparent} {...restProps} />
);

export default Transparent;
export {
  TransparentProps,
};
