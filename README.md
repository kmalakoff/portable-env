# portable-env

Read environment variables through the same function in Node.js and browser
bundles. Node.js uses `process.env`; browsers use `window.__ENV__`.

```bash
npm install portable-env
```

```js
import env from 'portable-env';

console.log(env().NODE_ENV);
```

For a browser, define `window.__ENV__` before the application bundle loads:

```html
<script>
  window.__ENV__ = { API_URL: 'https://api.example.com' };
</script>
```

```js
import env from 'portable-env';

fetch(`${env().API_URL}/status`);
```

Call the named `load()` export to reread the environment after replacing
`window.__ENV__` or `process.env`.
