import reducer from './reducer';

const key = 'user';

const register = (reducerRegistry: any) => {
  reducerRegistry.register(key, reducer);
};

export default register;
export {
  key,
};
