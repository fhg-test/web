import Btn, { BtnProps, STYLE, TYPE } from '../../Btn';

type SubmitProps = BtnProps;

const Submit = ({ type, style, ...restProps }: SubmitProps) => (
  <Btn type={TYPE.submit} style={STYLE.primary} {...restProps} />
);

export default Submit;
export {
  SubmitProps,
};
