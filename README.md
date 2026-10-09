# portable-env

Read environment variables through the same function in Node.js and browser
bundles. Node.js uses `process.env`; browsers use `window.__ENV__`.

```bash
npm install portable-env
```

```js
import { env, requiredEnv } from 'portable-env';

env({ API_URL: 'https://api.example.com' });
console.log(requiredEnv('API_URL'));
```

`env()` returns the current environment object. `env(values)` copies string values
into it, overwriting matching keys and preserving unrelated keys, then returns
that same object. `requiredEnv(name)` throws if the value is missing or empty.
Neither function reads files.

For a browser, you can supply values before the application bundle loads:

```html
<script>
  window.__ENV__ = { API_URL: 'https://api.example.com' };
</script>
```

```js
import { requiredEnv } from 'portable-env';

fetch(`${requiredEnv('API_URL')}/status`);
```

If `window.__ENV__` is absent, `env()` creates it on first use. Only expose public
configuration to browsers, never server credentials.

## Loading a file in Node.js

Create a `.env` file containing `API_URL=https://api.example.com`, then:

```js
import { requiredEnv } from 'portable-env';
import { loadEnv } from 'portable-env/node';

const { error } = loadEnv();
if (error) throw error;
console.log(requiredEnv('API_URL'));
```

`loadEnv(path = '.env')` reads one UTF-8 file synchronously. Relative paths resolve
from the current working directory; absolute paths are accepted. File values
override existing values. Success returns `{ parsed }`; failure returns `{ error }`
with the original filesystem error code. Importing the package never loads a file.

Tests select their package's `.env.test` explicitly. When credentials may already
come from the shell or CI, allow only a missing file:

```js
import { loadEnv } from 'portable-env/node';

const { error } = loadEnv('/absolute/path/to/package/.env.test');
if (error && error.code !== 'ENOENT') throw error;
```

Load configuration before importing application modules that read it. For ESM,
use a setup entry point that loads the file and then dynamically imports the app;
static imports execute before the setup body.

The format supports `KEY=value`, blank lines, full-line `#` comments, surrounding
single or double quotes, and LF or CRLF line endings. The first `=` separates the
key and value; later assignments to the same key win. Lines without an assignment
or with an empty key are ignored. Inline comments, multiline values, escape
expansion, `export` prefixes and variable interpolation are not supported.
This is not a full dotenv parser.

The root API works in browsers and Node.js 0.8 or newer. File loading is Node-only.
CommonJS uses named properties, for example `require('portable-env').env` and
`require('portable-env/node').loadEnv`.
