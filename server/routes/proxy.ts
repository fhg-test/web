import { Router } from 'express';
import * as proxyMiddleware from 'http-proxy-middleware';

const { API_URL } = process.env;

const config = {
  '/api': {
    target: API_URL,
    pathRewrite: { '^/api': '/' },
  },
};

const routes = () => {
  const router = Router();

  Object.keys(config).forEach((context: any) => {
    router.use(proxyMiddleware(context, config[context]));
  });

  return router;
};

export default routes;
