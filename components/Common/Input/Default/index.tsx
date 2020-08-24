import { PureComponent, Fragment } from 'react';
import css from 'styled-jsx/css';

import { DefaultProps } from '../../types';

enum SIZE {
  base = 'base',
  sm = 'sm',
}

type InputProps = DefaultProps & {
  readonly type?: string,
  readonly value?: string | number,
  readonly onChange?: (value: any) => void,
  readonly size?: string | SIZE,
  readonly [key: string]: any,
};

type InputState = {
  readonly value: string | number,
};

const styles = css`
  .input {
    @apply appearance-none w-full border rounded outline-none;

    &:hover,
    &:focus,
    &:active {
      @apply border-yellow-dark;
    }
  }

  .input-base {
    @apply p-2;
  }

  .input-sm {
    @apply px-2 py-1;
  }
`;

class Input extends PureComponent<InputProps, InputState> {
  static readonly defaultProps = {
    type: 'text',
    size: SIZE.base,
  };

  constructor(props: InputProps) {
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

  componentWillReceiveProps({ value }: InputProps) {
    this.setState({ value });
  }

  render() {
    const {
      value: v, onChange: o, // unused props
      className, type, size, ...restProps
    } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <input
          className={['input', className, `input-${size}`].join(' ')}
          type={type}
          value={value}
          onChange={e => this.change(e.target.value)}
          {...restProps}
        />

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

export default Input;
export {
  InputProps,
};
