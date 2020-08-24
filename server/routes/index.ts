import { Router } from 'express';
import * as next from 'next';

import proxy from './proxy';
import wildCard from './wildcard';

const assetPrefix = process.env.ASSET_PREFIX;

type RoutesProps = {
  readonly app: next.Server;
  readonly dev: boolean;
};

const routes = (props: RoutesProps) => {
  const router = Router();

  router.use(proxy());
  if (assetPrefix) {
    props.app.setAssetPrefix(assetPrefix);
  } else {
    router.use(require('./staticAssets').default(props));
  }
  router.use(wildCard(props));

  return router;
};

export default routes;
export { RoutesProps };
