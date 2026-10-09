const assert = require('assert');

let api;
if (typeof window !== 'undefined') api = window.portableEnv;
else {
  const major = Number(process.versions.node.split('.')[0]);
  const minor = Number(process.versions.node.split('.')[1]);
  const supportsExports = major > 13 || (major === 13 && minor >= 2) || (major === 12 && minor >= 16);
  api = supportsExports ? require('portable-env/umd') : require('portable-env/dist/umd/portable-env.cjs');
}

describe('exports umd', () => {
  it('env', () => {
    assert.equal(typeof api.env, 'function');
  });
  it('requiredEnv', () => {
    assert.equal(typeof api.requiredEnv, 'function');
  });
});
