import { STYLE, SIZE } from './types';

const getClassName = ({
  className: customClassName,
  style = STYLE.default,
  outline = false,
  size = SIZE.base,
  active = false,
}: any) => {
  // tslint:disable-next-line readonly-array
  const classNames: string[] = [
    'btn',
    `btn-${style}`,
    `btn-${size}`,
  ];

  if (customClassName) {
    classNames.push(customClassName);
  }
  if (outline) {
    classNames.push('outline');
  }
  if (active) {
    classNames.push('active');
  }

  return classNames.join(' ');
};

export {
  getClassName,
};
