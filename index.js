var env = null;

module.exports = function portableEnv() {
  return env;
};

module.exports.load = function load() {
  var isBrowser = typeof window !== 'undefined' && typeof window.__ENV__ !== 'undefined';
  env = isBrowser ? window.__ENV__ : process.env;
};
module.exports.load();
