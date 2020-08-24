const isServer = () =>
  Object.prototype.toString.call(global.process) === '[object process]';

export { isServer };
