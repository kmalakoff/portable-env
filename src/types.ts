export interface Environment {
  [key: string]: string | undefined;
}

export interface LoadEnvResult {
  parsed?: Record<string, string>;
  error?: Error;
}
