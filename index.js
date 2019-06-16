function isObject(value) {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
}

function isBrowser() {
  return typeof window !== "undefined" && isObject(window.__ENV__);
}

export default function env(key) {
  return isBrowser() ? window.__ENV__[key] : process.env[key];
}
