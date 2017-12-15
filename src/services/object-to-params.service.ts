import { isJsObject } from '@angular/core/src/facade/lang';

/**
 * Converts an object to a parametrised string.
 * @param object
 * @returns {string}
 */
export function objectToParams(object): string {
  if (object) {
    return '?' + Object.keys(object).map((key) => isJsObject(object[key]) ?
      subObjectToParams(encodeURIComponent(key), object[key]) :
      `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
    ).join('&');
  }
  return '';
}

/**
 * Converts a sub-object to a parametrised string.
 * @param object
 * @returns {string}
 */
function subObjectToParams(key, object): string {
  return Object.keys(object).map((childKey) => isJsObject(object[childKey]) ?
    subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]) :
    `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`
  ).join('&');
}
