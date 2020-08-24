import { ListItemProps } from './Item';

const translateListItemLabel = (t: Function) => {
  return ({ label, noTranslate, items, ...restProps }: ListItemProps) => ({
    label: noTranslate ? label : t(label),
    items: items ? items.map(translateListItemLabel(t)) : undefined,
    ...restProps,
  });
};

const isItemActive = ({ active, activeHref, as, href, items }: ListItemProps) => {
  if (active) {
    return true;
  }

  if ((activeHref || as || href) === location.pathname) {
    return true;
  }

  if (Array.isArray(items) && items.some(isItemActive)) {
    return true;
  }

  return false;
};

export {
  translateListItemLabel,
  isItemActive,
};
