import { Fragment, PureComponent } from 'react';
import Link from 'next/link';
import css from 'styled-jsx/css';

import { DefaultProps } from '../../types';
import { isItemActive } from './utils';
import List from '.';

type ListItemProps = {
  readonly prefetch?: boolean,
  readonly href?: string,
  readonly as?: string,
  readonly label?: string,
  readonly noTranslate?: boolean,
  readonly active?: boolean,
  readonly activeHref?: string | ReadonlyArray<string>,
  readonly onClick?: Function,
  readonly items?: ReadonlyArray<ListItemProps>,
  readonly [key: string]: any,
};

type ItemProps = DefaultProps & {
  readonly item: ListItemProps,
  readonly template?: Function,
};

type ItemState = {
  readonly show: boolean,
};

const styles = css`
  li > :global(a) {
    @apply block cursor-pointer;
  }
`;

const renderItem = (
  { className, item, template }: ItemProps,
  show?: boolean,
  toggle?: Function,
) => {
  const onClick = (e) => {
    if (item.onClick) {
      item.onClick(e);
    }

    if (toggle) {
      toggle();
    }
  };
  const itemWrapper = (children: any) => (
    <Link href={item.href} as={item.as} prefetch={item.prefetch}>{children}</Link>
  );
  const itemContent: any = template ? template({ onClick, ...item }) : (
    <a onClick={e => onClick(e)}>{item.label}</a>
  );

  return (
    <Fragment>
      <li className={[className, isItemActive(item) && 'active'].join(' ')}>
        {item.href ? itemWrapper(itemContent) : itemContent}

        {item.items && show && (
          <List items={item.items} itemTemplate={template} />
        )}
      </li>

      <style jsx>{styles}</style>
    </Fragment>
  );
};

const Item = (props: ItemProps) => renderItem(props);

// SC means Stateful Component
class ItemSC extends PureComponent<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);

    this.state = {
      // expand sub-items if it's being set to show equals true or active
      show: props.item.show || isItemActive(props.item),
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const { show } = this.state;

    this.setState({ show: !show });
  }

  render() {
    const { show } = this.state;

    return renderItem(this.props, show, this.toggle);
  }
}

export default Item;
export {
  ItemSC,
  ItemProps,
  ListItemProps,
};
