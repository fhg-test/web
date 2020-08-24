import { User, RBAC } from '@fhg-test/core';

import { SIGN_IN, SIGN_OUT, UPDATE_USER, UPDATE_USER_RBAC } from './types';

const signIn = () => {
  return (dispatch: Function) => {
    dispatch({
      type: SIGN_IN,
    });
  };
};

const signOut = () => {
  return (dispatch: Function) => {
    dispatch({
      type: SIGN_OUT,
    });
  };
};

const updateUser = (user: User) => {
  return (dispatch: Function) => {
    dispatch({
      type: UPDATE_USER,
      payload: {
        user,
      },
    });
  };
};

const updateUserRBAC = (rbac: RBAC) => {
  return (dispatch: Function) => {
    dispatch({
      type: UPDATE_USER_RBAC,
      payload: {
        rbac,
      },
    });
  };
};

export default {
  signIn,
  signOut,
  updateUser,
  updateUserRBAC,
};
export {
  signIn,
  signOut,
  updateUser,
  updateUserRBAC,
};
