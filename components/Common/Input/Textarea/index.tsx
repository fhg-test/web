import { PureComponent, Fragment } from 'react';
import css from 'styled-jsx/css';

import { DefaultProps } from '../../types';

enum SIZE {
  base = 'base',
  sm = 'sm',
}

type TextareaProps = DefaultProps & {
  readonly value?: string | number,
  readonly onChange?: (value: string) => void,
  readonly size?: string | SIZE,
  readonly [key: string]: any,
};

type TextareaState = {
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

class Textarea extends PureComponent<TextareaProps, TextareaState> {
  static readonly defaultProps = {
    type: 'text',
    size: SIZE.base,
  };

  constructor(props: TextareaProps) {
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

  componentWillReceiveProps({ value }: TextareaProps) {
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
        <textarea
          className={['input', className, `input-${size}`].join(' ')}
          value={value}
          onChange={e => this.change(e.target.value)}
          rows={10}
          {...restProps}
        />

        <style jsx>{styles}</style>
      </Fragment>
    );
  }
}

export default Textarea;
export {
  TextareaProps,
};
