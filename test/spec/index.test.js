const assert = require('assert');

const env = require('portable-env');

describe('portable-env', () => {
  describe('node', () => {
    it('gets environment', () => {
      env.load();
      assert.ok(env().NODE);
    });
  });

  describe('windows', () => {
    it('gets environment', () => {
      global.window = { __ENV__: { thing: 10 } };
      env.load();
      assert.equal(env().thing, 10);
      global.window = undefined;
    });
  });
});
