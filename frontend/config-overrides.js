const { addBabelPlugin, override, useEslintRc } = require('customize-cra');

module.exports = override(
  useEslintRc(),
  addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
);
