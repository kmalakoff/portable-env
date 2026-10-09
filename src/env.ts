import type { Environment } from './types.ts';

declare global {
  interface Window {
    __ENV__?: Environment;
  }
}

export default function env(values?: Environment): Environment {
  let target: Environment;
  if (typeof window === 'undefined') target = process.env;
  else {
    if (!window.__ENV__) window.__ENV__ = {};
    target = window.__ENV__;
  }
  if (values) {
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i++) {
      if (typeof values[keys[i]] !== 'string') throw new TypeError(`Environment variable ${keys[i]} must be a string`);
    }
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      // Browser objects must store __proto__ as data, not invoke the inherited setter.
      if (key === '__proto__') Object.defineProperty(target, key, { value: values[key], writable: true, enumerable: true, configurable: true });
      else target[key] = values[key];
    }
  }
  return target;
}
