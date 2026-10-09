import assert from 'assert';
import { loadEnv } from 'portable-env/node';

describe('exports node .mjs', () => {
  it('loadEnv', () => {
    assert.equal(typeof loadEnv, 'function');
  });
});
