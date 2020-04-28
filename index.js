var isBrowser = typeof window !== 'undefined' && typeof window.__ENV__ !== 'undefined';
var env = isBrowser ? window.__ENV__ : process.env;

module.exports = function () {
  return env;
};
