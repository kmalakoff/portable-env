"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return portableEnv;
    },
    load: function() {
        return load;
    }
});
var env = null;
function portableEnv() {
    return env;
}
function load() {
    var isBrowser = typeof window !== 'undefined' && typeof window.__ENV__ !== 'undefined';
    env = isBrowser ? window.__ENV__ : process.env;
}
load();
/* CJS INTEROP */ if (exports.__esModule && exports.default) { try { Object.defineProperty(exports.default, '__esModule', { value: true }); for (var key in exports) { exports.default[key] = exports[key]; } } catch (_) {}; module.exports = exports.default; }