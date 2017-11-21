import url from 'url';
import fs from 'fs';
import path from 'path';
import process from 'process';
import util from 'util';
const debuglog = util.debuglog('foo');

debuglog('here');

const builtins = new Set(
    Object.keys(process.binding('natives')).filter((str) =>
        /^(?!(?:internal|node|v8)\/)/.test(str))
);
const JS_EXTENSIONS = new Set(['.js', '.mjs']);


export function resolve(specifier, parentModuleURL , defaultResolve) {

    debugger;
    debuglog('here2');
    if (builtins.has(specifier)) {
        return {
            url: specifier,
            format: 'builtin'
        };
    }
    if (/^\.{0,2}[/]/.test(specifier) !== true && !specifier.startsWith('file:') && !specifier.startsWith('/')) {
        // For node_modules support:
        var defaultResolver = defaultResolve(specifier, parentModuleURL);
        defaultResolver.format = 'esm';
        return defaultResolver;
        // throw new Error(
        //     `imports must begin with '/', './', or '../'; '${specifier}' does not`);
    }

    var resolved = resolveByExtension(specifier, null, parentModuleURL);
    // const ext = path.extname(resolved.pathname);


    if (!resolved) {
        var newResolved = resolveByExtension(specifier, 'mjs', parentModuleURL);
        if (! newResolved) {
            newResolved = resolveByExtension(specifier, 'js', parentModuleURL);
        }
        resolved = newResolved;
    }
    if (!resolved) {
        throw new Error(`Unable to resolve ${specifier} by any extension`)
    }
    return {
        url: resolved.href,
        format: 'esm'
    };
}

function resolveByExtension(specifier, extension, parentModuleURL) {
    var newResolved = extension ? new url.URL(specifier+'.'+extension, parentModuleURL) : new url.URL(specifier, parentModuleURL);
    if (newResolved.protocol === 'file:') {
        const realPath = newResolved.href.replace(/^file:\/\/\//, '');
        if (fs.existsSync(realPath)) {
           return newResolved;
        }
    }
    return null;
}