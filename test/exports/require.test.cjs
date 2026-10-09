const assert = require('assert');
const { env, requiredEnv } = require('portable-env');

describe('exports .cjs', () => {
  it('env', () => {
    assert.equal(typeof env, 'function');
  });
  it('requiredEnv', () => {
    assert.equal(typeof requiredEnv, 'function');
  });
});
