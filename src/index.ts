let env = null;

declare global {
  interface Window {
    __ENV__: NodeJS.ProcessEnv;
  }
}

export default (): NodeJS.ProcessEnv => env;
export function load(): NodeJS.ProcessEnv {
  const isBrowser = typeof window !== 'undefined' && typeof window.__ENV__ !== 'undefined';
  env = isBrowser ? window.__ENV__ : process.env;
  return env;
}
load();
