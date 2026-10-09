import assert from 'assert';
import { env, requiredEnv } from 'portable-env';

describe('requiredEnv', () => {
  const key = 'PORTABLE_ENV_TEST_REQUIRED';
  let previous: string | undefined;
  beforeEach(() => {
    previous = env()[key];
  });
  afterEach(() => {
    if (previous === undefined) delete env()[key];
    else env()[key] = previous;
  });
  it('reads values set through env', () => {
    env({ [key]: '0' });
    assert.strictEqual(requiredEnv(key), '0');
  });
  it('names missing and empty values', () => {
    delete env()[key];
    assert.throws(() => requiredEnv(key), new RegExp(`Environment variable ${key} is required`));
    env({ [key]: '' });
    assert.throws(() => requiredEnv(key), new RegExp(`Environment variable ${key} is required`));
  });
  it('does not read inherited properties', () => {
    assert.throws(() => requiredEnv('toString'), /is required/);
  });
});
