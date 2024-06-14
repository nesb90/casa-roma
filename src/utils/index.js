function isRequired (dependency) {
  throw new SyntaxError(`${dependency} is required.`);
};

module.exports = {
  isRequired,
  ...require('./handler.utils'),
  ...require('./constants')
};
