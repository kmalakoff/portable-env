import assert from 'assert';

describe('browser UMD global', () => {
  it('loads the classic script and exposes the public exports', async () => {
    const browser = window as Window & { portableEnv?: typeof import('portable-env') };
    const previous = browser.portableEnv;
    const readGlobal = () => browser.portableEnv;
    const script = document.createElement('script');
    script.src = new URL('../../dist/umd/portable-env.cjs', import.meta.url).href;
    try {
      delete browser.portableEnv;
      await new Promise<void>((resolve, reject) => {
        script.addEventListener('load', () => resolve(), { once: true });
        script.addEventListener('error', () => reject(new Error(`Failed to load ${script.src}`)), { once: true });
        document.head.append(script);
      });
      const exported = readGlobal();
      assert.strictEqual(typeof exported?.env, 'function');
      assert.strictEqual(typeof exported?.requiredEnv, 'function');
    } finally {
      script.remove();
      if (previous) browser.portableEnv = previous;
      else delete browser.portableEnv;
    }
  });
});
