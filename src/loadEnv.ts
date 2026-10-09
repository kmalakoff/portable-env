import fs from 'fs';
import env from './env.ts';
import type { LoadEnvResult } from './types.ts';

export default function loadEnv(filePath = '.env'): LoadEnvResult {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const parsed: Record<string, string> = Object.create(null);
    const lines = content.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line[0] === '#') continue;
      const separator = line.indexOf('=');
      if (separator === -1) continue;
      const key = line.slice(0, separator).trim();
      if (!key) continue;
      let value = line.slice(separator + 1).trim();
      if (value.length >= 2 && ((value[0] === '"' && value[value.length - 1] === '"') || (value[0] === "'" && value[value.length - 1] === "'"))) value = value.slice(1, -1);
      parsed[key] = value;
    }
    env(parsed);
    return { parsed };
  } catch (error) {
    return { error: error instanceof Error ? error : new Error(String(error)) };
  }
}
