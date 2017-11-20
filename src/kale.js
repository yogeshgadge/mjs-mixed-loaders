import isObject from 'lodash-es/isObject'
// kale.js
export function kale() {
  if (isObject({})) {
    console.log('eating kale with some lodash');
    return 'eating kale with some lodash';
  }
}
export function kite() {}
