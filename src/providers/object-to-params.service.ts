// import { isJsObject } from '@angular/core/src/facade/lang';
import * as _ from 'lodash';
/**
 * Converts an object to a parametrised string.
 * @param object
 * @returns {string}
 */
export function objectToParams(object): string {
  if (object) {
    return '?' + Object.keys(object).map((key) => _.isObject(object[key]) ?
      subObjectToParams(encodeURIComponent(key), object[key]) :
      `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
    ).join('&').replace(/&+/g, "&");
  }
  return '';
}

/**
 * Converts a sub-object to a parametrised string.
 * @param object
 * @returns {string}
 */
function subObjectToParams(key, object): string {
  return Object.keys(object).map((childKey) => _.isObject(object[childKey]) ?
    subObjectToParams(`${key}[${encodeURIComponent(childKey)}]`, object[childKey]) :
    `${key}[${encodeURIComponent(childKey)}]=${encodeURIComponent(object[childKey])}`
  ).join('&');
}
