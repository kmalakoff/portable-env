const isBrowser =
  typeof window !== "undefined" && typeof window.__ENV__ !== "undefined";

export default function env(key) {
  return isBrowser ? window.__ENV__[key] : process.env[key];
}
