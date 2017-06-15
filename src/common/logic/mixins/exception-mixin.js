import {
  hooks
} from '../utils';
import * as _ from 'lodash';

/**
 * 抛出异常
 * @param exception 异常说明
 * @param hook 触发异常的钩子
 * @param isHttpException 是否为系统异常
 */
export function throwException(exception, hook) {
  if (typeof console === 'function') {
    console.error(exception, hook);
  }
  var args = _.toArray(arguments);
  this.callHook(hooks.EXCEPTION, ...args);
}
