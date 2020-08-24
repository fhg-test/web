import { key } from '.';
import { ReducerState } from './reducer';

const getReducer = (state: any): ReducerState => state[key];

const isSignedIn = (state: any) => getReducer(state).isSignedIn;

const getUser = (state: any) => getReducer(state).user;
const getId = (state: any) => getUser(state) && getUser(state).id;
const getDisplayName = (state: any) => getUser(state) && getUser(state).displayName;

const getRBAC = (state: any) => getReducer(state).rbac || { permissions: [] };
const getPermissions = (state: any) => getRBAC(state).permissions;
const hasAccess = (state: any) => (access = []) => {
  if (access.length === 0) {
    return true;
  }

  const userPermissions = getPermissions(state);

  return userPermissions.includes(access.join(':'));
};

export default {
  isSignedIn,
  getUser, getId, getDisplayName, getPermissions, hasAccess, getRBAC,
};
export {
  isSignedIn,
  getUser, getId, getDisplayName, getPermissions, hasAccess, getRBAC,
};
