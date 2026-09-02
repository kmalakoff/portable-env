const isBrowser =
  typeof window !== "undefined" && typeof window.__ENV__ !== "undefined";

module.exports = function(key) {
  const env = isBrowser ? window.__ENV__ : process.env;
  return key ? env[key] : env;
};
