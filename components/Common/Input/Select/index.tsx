import { PureComponent, Fragment } from 'react';
import css from 'styled-jsx/css';

import { DefaultProps } from '../../types';

enum SIZE {
  base = 'base',
  sm = 'sm',
}

type SelectProps = DefaultProps & {
  readonly value?: string | number,
  readonly onChange?: Function,
  readonly size?: string | SIZE,
  readonly [key: string]: any,
};

type SelectState = {
  readonly value: string | number,
};

const styles = css`
  .input {
    @apply relative;

    > select {
      @apply appearance-none w-full bg-white border rounded outline-none;

      &:hover,
      &:focus,
      &:active {
        @apply border-yellow-dark;
      }
    }

    > span {
      @apply pointer-events-none absolute pin-y pin-r flex items-center px-2 text-black;

      > svg {
        @apply fill-current h-4 w-4;
      }
    }
  }

  .input-base > select {
    @apply pl-2 pr-8 py-2;
  }

  .input-sm > select {
    @apply pl-2 pr-8 py-1;
  }
`;

class Select extends PureComponent<SelectProps, SelectState> {
  static readonly defaultProps = {
    size: SIZE.base,
  };

  constructor(props: SelectProps) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  change(value: string) {
    const { onChange } = this.props;

    this.setState(
      { value },
      () => onChange && onChange(value),
    );
  }

  componentWillReceiveProps({ value }: SelectProps) {
    this.setState({ value });
  }

  render() {
    const {
      value: v, onChange: o, // unused props
      className, size, ...restProps
    } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <div className={['input', `input-${size}`].join(' ')}>
          <select
            className={className}
            value={value}
            onChange={e => this.change(e.target.value)}
            {...restProps}
          />

          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </span>
        </div>

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

export default Select;
export {
  SelectProps,
};
