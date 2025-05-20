import assert from 'assert';

// @ts-ignore
import env, { load } from 'portable-env';

describe('portable-env', () => {
  describe('node', () => {
    it('gets environment', () => {
      load();
      assert.ok(env().NODE);
    });
  });

  describe('windows', () => {
    it('gets environment', () => {
      (global.window as unknown) = { __ENV__: { thing: '10' } };
      load();
      assert.equal(env().thing, '10');
      global.window = undefined;
    });
  });
});
