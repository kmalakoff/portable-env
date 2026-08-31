const assert = require('assert');
const portableEnv = require('portable-env');

describe('exports .cjs', () => {
  it('default', () => {
    assert.equal(typeof portableEnv, 'function');
  });
  it('load', () => {
    assert.equal(typeof portableEnv.load, 'function');
  });
});
