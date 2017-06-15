import * as http from 'axios';
import * as _ from 'lodash';

import {
  mixin,
  ensure,
  hooks,
  isFunction,
  mkProp
} from './utils';


import * as itemMixin from './mixins/item-mixin';
import * as listMixin from './mixins/list-mixin';
import * as httpMixin from './mixins/http-mixin';
import * as exceptionMixin from './mixins/exception-mixin';

/**
 * 逻辑方法基类。
 * 该基类支持数据的增删改查，及相关的列表和树的操作。
 * 我们可以继承这个基类，并通过钩子方法对我们的操作进行个性化。
 * 具体支持的钩子我们可以进一步查阅 ./utils/hooks 的定义。
 */
export default class BaseLogic {
  constructor(options) {
    this.dataList = [];
    this.$http = http;
    this._ = _;

    let local = {
      currentItem: {},
      dataList: [],
      currentSearchOptions: {},
      searchOptions: {},
      selectedItems: []
    };
    const events = {};

    //初始化插件
    mkProp(this, 'currentItem', {
      get: () => local.currentItem,
      set: (value) => local.currentItem = value
    });
    mkProp(this, 'dataList', () => local.dataList);
    mkProp(this, 'selectedItems', () => local.selectedItems);
    mkProp(this, 'primaryKey', () => (options.primaryKey || globals.sysPrimaryKey));
    mkProp(this, 'searchOptions', () => local.searchOptions);
    mkProp(this, 'currentSearchOptions', () => local.currentSearchOptions);
    mkProp(this, 'uri', () => options.uri);
    mkProp(this, 'moduleId', () => options.moduleId);
    mkProp(this, 'events', () => events);

    //初始化混合器
    this.callMixinHook('initMixin', local, options);
  }

  /**
   * 调用混合器专有的钩子法
   * @param name 钩子名称
   */
  callMixinHook(name, ...args) {
    _.forEach(BaseLogic.mixins, (mixin) => {
      var hookMethod = ensure.ensureMethod(mixin[name]);
      hookMethod.bind(this);
      hookMethod(...args);
    });
  }

  /**
   * 调用混合器，包括钩子的混合器及其派生类的钩子方法。
   * @param name 钩子的名称
   */
  callHook(name, ...args) {
    var hookMethod = ensure.ensureMethod(this[name]);
    hookMethod.bind(this);
    hookMethod(...args);
    this.callMixinHook(name, ...args);
    this.emit(name, ...args);
  }

  emit(eventName, ...args) {
    var eventHandlers = this.events[eventName] || [];
    for (let handler of eventHandlers) {
      handler(...args);
    }
  }

  on(eventName, callback) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
    callback.bind(this);
  }

  _destroy() {
    this.callHook('destroy');

  }
}

/**
 * 判断是否为钩子方法
 * @param methodName
 * @returns {boolean}
 */
var isHookMethod = function (methodName) {
  var isHook = false;
  for (let hook in hooks) {
    if (hooks[hook] === methodName) {
      isHook = true;
      break;
    }
  }
  return isHook;
};

//混合器注入方法
BaseLogic.mixin = function (target) {
  var methods = [];
  //把混合器中所有除子钩子方法外的方法混入到我们的BaseLogic中。
  //所以混合器的this指针都会被指定到BaseLogic的对象中。
  for (let prop in target) {
    if (target.hasOwnProperty(prop) &&
      !isHookMethod(prop) &&
      isFunction(target[prop])
    ) {
      methods.push(target[prop]);
    }
  }
  BaseLogic.mixins.push(target);
  mixin(BaseLogic.prototype, methods);
};

//注入混合器
BaseLogic.mixin(itemMixin);
BaseLogic.mixin(listMixin);
BaseLogic.mixin(httpMixin);
BaseLogic.mixin(exceptionMixin);
