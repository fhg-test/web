import { isServer } from '.';

const getCtxCookie = (ctx) => {
  if (isServer()) {
    return ctx.req.headers && ctx.req.headers.cookie;
  }

  return null;
};

export { getCtxCookie };
