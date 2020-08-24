import { User, RBAC } from '@fhg-test/core';

import { DefaultActionProps } from '@app/store/types';

import { SIGN_IN, SIGN_OUT, UPDATE_USER, UPDATE_USER_RBAC } from './types';

type PayloadProps = {
  readonly user?: User,
  readonly rbac?: RBAC,
};
type ActionProps = DefaultActionProps & {
  readonly payload?: PayloadProps,
};
type ReducerState = {
  readonly isSignedIn: boolean,
  readonly user?: User,
  readonly rbac?: RBAC,
};

const initialState: ReducerState = {
  isSignedIn: false,
};

const signIn = (state: ReducerState, _: PayloadProps): ReducerState => ({
  ...state,
  isSignedIn: true,
});
const signOut = (_: ReducerState, __: PayloadProps): ReducerState => {
  return { ...initialState };
};
const updateUser = (
  state: ReducerState,
  payload: PayloadProps,
): ReducerState => ({
  ...state,
  user: payload.user,
});
const updateUserRBAC = (
  state: ReducerState,
  payload: PayloadProps,
): ReducerState => ({
  ...state,
  rbac: payload.rbac,
});

const reducer = (state: ReducerState = initialState, action: DefaultActionProps): ReducerState => {
  if (!action || !action.type) {
    return state;
  }

  switch (action.type) {
    case SIGN_IN:
      return signIn(state, action.payload);

    case SIGN_OUT:
      return signOut(state, action.payload);

    case UPDATE_USER:
      return updateUser(state, action.payload);

    case UPDATE_USER_RBAC:
      return updateUserRBAC(state, action.payload);

    default:
      return state;
  }
};

export default reducer;
export {
  ActionProps,
  ReducerState,
};
