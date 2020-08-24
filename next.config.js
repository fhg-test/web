const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
const { optional, withPlugins } = require('next-compose-plugins');
const path = require('path');

// transform webpack plugins to next-compose-plugins compatible
const toNextPlugin = (plugin, optKey) => (nextConfig = {}) => ({
  ...nextConfig,
  ...{
    // define in which phases this plugin should get applied.
    // you can also use multiple phases or negate them.
    // however, users can still overwrite them in their configuration if they really want to.
    phases: [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD],

    webpack(config, options) {
      if (!options.isServer) {
        config.plugins.push(new plugin(optKey ? nextConfig[optKey] : nextConfig));
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  },
});

// init plugins
const withTypescript = [
  optional(() => require('@zeit/next-typescript')),
  {},
  [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD],
];
const withCopy = [
  optional(() => toNextPlugin(require('copy-webpack-plugin'), 'copyOpts')),
  {
    copyOpts: [
      { from: './static/**/*', to: './' },
    ],
  },
  [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD],
];

// compose next plugins and config
const nextPlugins = [
  withTypescript,
  withCopy,
];
const nextConfig = {
  webpack (config) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },
};

module.exports = withPlugins(nextPlugins, nextConfig);
