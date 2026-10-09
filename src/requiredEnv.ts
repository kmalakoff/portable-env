import env from './env.ts';

const ownsProperty = Object.prototype.hasOwnProperty;

export default function requiredEnv(key: string): string {
  const values = env();
  const value = ownsProperty.call(values, key) ? values[key] : undefined;
  if (typeof value !== 'string' || !value) throw new Error(`Environment variable ${key} is required`);
  return value;
}
