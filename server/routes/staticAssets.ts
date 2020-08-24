import { Router } from 'express';
import * as path from 'path';

const STATIC_ASSETS_ROUTES: ReadonlyArray<string> = ['/service-worker.js'];

const routes = ({ dev }) => {
  const router = Router();
  const handler = (req, res) => {
    const filePath = path.join(
      __dirname,
      dev ? '../../.next/static' : '../../static',
      req.path,
    );

    res.sendFile(filePath);
  };

  STATIC_ASSETS_ROUTES.forEach((path) => {
    router.get(path, handler);
  });

  return router;
};

export default routes;
export { STATIC_ASSETS_ROUTES };
