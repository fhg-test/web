import { Router } from 'express';
import * as proxyMiddleware from 'http-proxy-middleware';

const { API_URL } = process.env;

const routes = () => {
  const router = Router();

  router.use('/api', proxyMiddleware({
    target: API_URL,
  }));

  return router;
};

export default routes;
