import assert from 'assert';
import { env, requiredEnv } from 'portable-env';

describe('exports .ts', () => {
  it('env', () => {
    assert.equal(typeof env, 'function');
  });
  it('requiredEnv', () => {
    assert.equal(typeof requiredEnv, 'function');
  });
});
