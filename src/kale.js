import isObject from 'lodash-es/isObject'
// kale.js
export default function kale() {
  if (isObject({})) {
    console.log('eating kale with some lodash');
    return 'eating kale with some lodash';
  }
}

