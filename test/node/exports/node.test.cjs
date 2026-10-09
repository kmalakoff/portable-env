const assert = require('assert');
const { loadEnv } = require('portable-env/node');

describe('exports node .cjs', () => {
  it('loadEnv', () => {
    assert.equal(typeof loadEnv, 'function');
  });
});
