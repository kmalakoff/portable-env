let env = null;

export default function portableEnv() {
  return env;
}

export function load() {
  const isBrowser = typeof window !== 'undefined' && typeof window.__ENV__ !== 'undefined';
  env = isBrowser ? window.__ENV__ : process.env;
}
load();
