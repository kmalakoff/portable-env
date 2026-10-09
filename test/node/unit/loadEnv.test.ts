import assert from 'assert';
import fs from 'fs';
import { safeRmSync } from 'fs-remove-compat';
import path from 'path';
import { env, requiredEnv } from 'portable-env';
import { loadEnv } from 'portable-env/node';
import url from 'url';

const dirname = path.dirname(typeof __filename === 'undefined' ? url.fileURLToPath(import.meta.url) : __filename);
const root = path.resolve(dirname, '..', '..', '..');
const scratch = path.join(root, '.tmp', `load-env-${process.pid}-${Date.now()}`);
const key = 'PORTABLE_ENV_TEST_FILE';
const otherKey = 'PORTABLE_ENV_TEST_OTHER';

describe('loadEnv', () => {
  let previous: string | undefined;
  let previousOther: string | undefined;
  let cwd: string;
  before(() => {
    if (!fs.existsSync(path.join(root, '.tmp'))) fs.mkdirSync(path.join(root, '.tmp'));
    fs.mkdirSync(scratch);
  });
  beforeEach(() => {
    previous = env()[key];
    previousOther = env()[otherKey];
    cwd = process.cwd();
  });
  afterEach(() => {
    process.chdir(cwd);
    if (previous === undefined) delete env()[key];
    else env()[key] = previous;
    if (previousOther === undefined) delete env()[otherKey];
    else env()[otherKey] = previousOther;
  });
  after(() => {
    safeRmSync(scratch);
  });

  it('loads an absolute test file, overrides values, and shares the env target', () => {
    const file = path.join(scratch, '.env.test');
    fs.writeFileSync(file, `${key}=from-file\n`, 'utf8');
    env({ [key]: 'inherited', [otherKey]: 'preserved' });
    const result = loadEnv(file);
    assert.ifError(result.error);
    assert.strictEqual(result.parsed?.[key], 'from-file');
    assert.strictEqual(requiredEnv(key), 'from-file');
    assert.strictEqual(env()[otherKey], 'preserved');
    fs.writeFileSync(file, `${key}=updated\n`, 'utf8');
    assert.ifError(loadEnv(file).error);
    assert.strictEqual(requiredEnv(key), 'updated');
  });
  it('loads the default and relative paths from the working directory', () => {
    fs.writeFileSync(path.join(scratch, '.env'), `${key}=default\n`, 'utf8');
    fs.writeFileSync(path.join(scratch, 'custom.env'), `${key}=relative\n`, 'utf8');
    process.chdir(scratch);
    assert.ifError(loadEnv().error);
    assert.strictEqual(requiredEnv(key), 'default');
    assert.ifError(loadEnv('custom.env').error);
    assert.strictEqual(requiredEnv(key), 'relative');
  });
  it('parses comments, quotes, CRLF, empty values and the first equals sign', () => {
    const file = path.join(scratch, 'syntax.env');
    fs.writeFileSync(file, `# comment\r\n\r\nnot an assignment\r\n=ignored\r\n ${key} = " a=b#c "\r\n${otherKey}='single quoted'\r\n`, 'utf8');
    const result = loadEnv(file);
    assert.ifError(result.error);
    assert.strictEqual(result.parsed?.[key], ' a=b#c ');
    assert.strictEqual(requiredEnv(otherKey), 'single quoted');
    fs.writeFileSync(file, `${key}=first\n${key}=\n`, 'utf8');
    assert.ifError(loadEnv(file).error);
    assert.strictEqual(env()[key], '');
    assert.throws(() => requiredEnv(key), /is required/);
  });
  it('returns ENOENT without changing inherited values for a missing explicit file', () => {
    env({ [key]: 'injected' });
    const result = loadEnv(path.join(scratch, 'missing.env'));
    assert.strictEqual((result.error as NodeJS.ErrnoException).code, 'ENOENT');
    assert.strictEqual(result.parsed, undefined);
    assert.strictEqual(requiredEnv(key), 'injected');
  });
  it('returns ENOENT for a missing default file', () => {
    const empty = path.join(scratch, 'empty');
    fs.mkdirSync(empty);
    process.chdir(empty);
    assert.strictEqual((loadEnv().error as NodeJS.ErrnoException).code, 'ENOENT');
  });
  it('returns non-missing read errors without mutating the environment', () => {
    const file = path.join(scratch, 'not-a-directory');
    fs.writeFileSync(file, '', 'utf8');
    env({ [key]: 'preserved' });
    const result = loadEnv(path.join(file, 'child.env'));
    assert.ok(result.error);
    assert.strictEqual(result.parsed, undefined);
    assert.strictEqual(requiredEnv(key), 'preserved');
  });
});
