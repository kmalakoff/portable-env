import assert from 'assert';
import { env, requiredEnv } from 'portable-env';

describe('exports .mjs', () => {
  it('env', () => {
    assert.equal(typeof env, 'function');
  });
  it('requiredEnv', () => {
    assert.equal(typeof requiredEnv, 'function');
  });
});
