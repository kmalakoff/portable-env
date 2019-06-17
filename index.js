const isBrowser =
  typeof window !== "undefined" && typeof window.__ENV__ !== "undefined";

const env = isBrowser ? window.__ENV__ : process.env;

module.exports = function(key) {
  return key ? env[key] : env;
};
