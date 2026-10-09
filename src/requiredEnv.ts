import env from './env.ts';

export default function requiredEnv(key: string): string {
  const values = env();
  const value = Object.getOwnPropertyDescriptor(values, key) ? values[key] : undefined;
  if (typeof value !== 'string' || !value) throw new Error(`Environment variable ${key} is required`);
  return value;
}
