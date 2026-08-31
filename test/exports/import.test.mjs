import assert from 'assert';
import portableEnv, { load } from 'portable-env';

describe('exports .mjs', () => {
  it('default', () => {
    assert.equal(typeof portableEnv, 'function');
  });
  it('load', () => {
    assert.equal(typeof load, 'function');
  });
});
