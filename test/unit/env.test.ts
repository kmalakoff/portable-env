import assert from 'assert';
import { env } from 'portable-env';

describe('env', () => {
  const key = 'PORTABLE_ENV_TEST_VALUE';
  let previous: string | undefined;
  beforeEach(() => {
    previous = env()[key];
  });
  afterEach(() => {
    if (previous === undefined) delete env()[key];
    else env()[key] = previous;
  });
  it('returns the host environment', () => {
    assert.strictEqual(env(), typeof window === 'undefined' ? process.env : window.__ENV__);
  });
  it('sets and overwrites values without replacing the object or unrelated values', () => {
    const target = env();
    const existing = Object.keys(target)
      .filter((name) => name !== key)
      .map((name): [string, string | undefined] => [name, target[name]]);
    assert.strictEqual(env({ [key]: 'first' }), target);
    assert.strictEqual(env({ [key]: 'second' }), target);
    assert.strictEqual(env()[key], 'second');
    existing.forEach(([name, value]) => assert.strictEqual(target[name], value));
  });
  it('copies only own values', () => {
    const values = Object.create({ [key]: 'inherited' });
    delete env()[key];
    env(values);
    assert.strictEqual(env()[key], undefined);
  });
  it('rejects non-string values before making changes', () => {
    env({ [key]: 'before' });
    assert.throws(() => env({ [key]: 'after', INVALID: undefined }), /must be a string/);
    assert.strictEqual(env()[key], 'before');
  });
  if (typeof window !== 'undefined') {
    it('initializes a missing browser environment and follows its replacement', () => {
      const original = window.__ENV__;
      try {
        delete window.__ENV__;
        assert.deepEqual(env(), {});
        env({ [key]: 'first' });
        window.__ENV__ = { [key]: 'replacement' };
        assert.strictEqual(env(), window.__ENV__);
        assert.strictEqual(env()[key], 'replacement');
      } finally {
        window.__ENV__ = original;
      }
    });
    it('sets __proto__ as data without changing the browser object prototype', () => {
      const original = window.__ENV__;
      try {
        window.__ENV__ = {};
        env(JSON.parse('{"__proto__":"value"}'));
        assert.strictEqual(Object.getOwnPropertyDescriptor(env(), '__proto__')?.value, 'value');
        assert.strictEqual(Object.getPrototypeOf(env()), Object.prototype);
      } finally {
        window.__ENV__ = original;
      }
    });
  } else {
    it('follows a replaced Node environment', () => {
      const original = process.env;
      try {
        process.env = { [key]: 'replacement' };
        assert.strictEqual(env(), process.env);
        assert.strictEqual(env()[key], 'replacement');
      } finally {
        process.env = original;
      }
    });
  }
});
