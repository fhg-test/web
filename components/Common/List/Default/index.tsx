import { Fragment } from 'react';
import css from 'styled-jsx/css';

import { DefaultProps } from '../../types';
import Item, { ItemSC, ListItemProps } from './Item';
import { translateListItemLabel } from './utils';

type ListProps = DefaultProps & {
  readonly items: ReadonlyArray<ListItemProps>,
  readonly itemTemplate?: Function,
};

const styles = css`
  ul {
    @apply list-reset;
  }
`;

const List = ({ className, items, itemTemplate }: ListProps) => (
  <Fragment>
    <ul className={className}>
      {items.map((item: ListItemProps, key) => {
        const Component = item.items ? ItemSC : Item;

        return (
          <Component key={key} item={item} template={itemTemplate} />
        );
      })}
    </ul>

    <style jsx>{styles}</style>
  </Fragment>
);

export default List;
export {
  ListProps,
  ListItemProps,
  translateListItemLabel,
};
