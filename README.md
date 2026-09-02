# portable-env

Portable environment variables in the browser and server

For a browser, put the environment variables on window.**ENV**. For Node, uses process.env.

```
var assert = require('assert');
var env = require('portable-env');

assert.ok(env().NODE);
```
