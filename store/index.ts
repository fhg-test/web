import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import { isServer } from '@app/utils';

import reducerRegistry from './reducerRegistry';
import registerUser from './user';

const key = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

// register every new reducers here
registerUser(reducerRegistry);

// compose middlewares
const configureStoreEnhancers = () => {
  const composeEnhancers = (!isServer() && (window as any)[key]) || compose;

  return composeEnhancers(applyMiddleware(reduxThunk));
};

// create store
const configureStore = (initialState?: any) => {
  const registeredReducers = reducerRegistry.getCombinedReducers(initialState);
  const reducers = combineReducers(registeredReducers);
  const enhancers = configureStoreEnhancers();

  const store = createStore(reducers, initialState, enhancers);

  reducerRegistry.setChangeListener(() => {
    store.replaceReducer(
      combineReducers(reducerRegistry.getCombinedReducers()),
    );
  });

  return store;
};

export default configureStore;
