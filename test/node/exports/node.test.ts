import assert from 'assert';
import { loadEnv } from 'portable-env/node';

describe('exports node .ts', () => {
  it('loadEnv', () => {
    assert.equal(typeof loadEnv, 'function');
  });
});
