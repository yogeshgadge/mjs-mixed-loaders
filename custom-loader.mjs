import url from 'url';
import path from 'path';


const JS_EXTENSIONS = new Set(['.js', '.mjs']);
console.log('resolver');
export default function resolve(specifier, parentModuleURL, defaultResolve ) {
  console.log('resolving '+specifier);
  if (/^\.{0,2}[/]/.test(specifier) !== true && !specifier.startsWith('file:')) {
    return defaultResolve(specifier, parentModuleURL);
  }
  const resolved = new url.URL(specifier, parentModuleURL);
  const ext = path.extname(resolved.pathname);
  if (!JS_EXTENSIONS.has(ext)) {
    throw new Error(
      `Cannot load file with non-JavaScript file extension ${ext}.`);
  }
  return {
    url: resolved.href,
    format: 'esm'
  };
}
