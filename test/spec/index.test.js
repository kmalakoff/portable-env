var assert = require('assert');

var env = require('../..');

describe('portable-env', function () {
  describe('node', function () {
    it('gets environment', function () {
      env.load();
      assert.ok(env().NODE);
    });
  });

  describe('windows', function () {
    it('gets environment', function () {
      global.window = { __ENV__: { thing: 10 } };
      env.load();
      assert.equal(env().thing, 10);
      delete global.window;
    });
  });
});
