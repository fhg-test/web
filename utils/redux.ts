import * as rest from '@fhg-test/rest';
import Logger from '@boringcodes/utils/logger';

import createStore from '@app/store';
import userActions from '@app/store/user/actions';

import { isServer } from '.';
import { getCtxCookie } from './cookie';

const key = '__NEXT_REDUX_STORE__';

const getOrCreateStore = (initialState?: any) => {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer()) {
    return createStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[key]) {
    // tslint:disable-next-line no-object-mutation
    window[key] = createStore(initialState);
  }

  return window[key];
};

const assureUser = async ({ reduxStore, ctx }) => {
  if (isServer()) {
    try {
      const cookie = getCtxCookie(ctx);
      const [user, rbac] = await Promise.all([
        rest.user.get({}, cookie),
        rest.user.rbac.get({}, cookie),
      ]);

      reduxStore.dispatch(userActions.updateUser(user));
      reduxStore.dispatch(userActions.updateUserRBAC(rbac));
      reduxStore.dispatch(userActions.signIn());
    } catch (err) {
      Logger.error(err);
    }
  }
};

export { getOrCreateStore, assureUser };
