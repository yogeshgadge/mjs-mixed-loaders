# Interoperability between .mjs and .js

There are also npm scripts fro these to reproduce the problem.

## Does not work using `node -r @std/esm` 

```bash
node -r @std/esm ard/apple.mjs

```
## Does not work with `mocha -r` option

```bash
mocha -r @std/esm --recursive src/*.spec.mjs
```
## Works (using require) 

```
node index.js 
```



 