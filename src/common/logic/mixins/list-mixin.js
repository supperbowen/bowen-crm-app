import Messenger from '../../Messenger';
import * as _ from 'lodash';
import {
  keyFilter,
  ensure,
  hooks,
  omitAttr,
  hook,
  method,
  mkProp
} from '../utils';


export function initMixin(local, options) {
  mkProp(this, 'listUri', () => options.listUri);
  mkProp(this, 'listMethod', () => options.listMethod || 'post');
  mkProp(this, 'multiRemoveUri', () => options.multiRemoveUri);
  mkProp(this, 'enablePaging', () => options.enablePaging);
  mkProp(this, 'enableSearch', () => options.enableSearch);
  mkProp(this, 'pageSize', () => (options.pageSize || 10));
  mkProp(this, 'selectionMode', () => (options.selectionMode || 'multi'));
  mkProp(this, 'totalItems', () => this.searchOptions.totalItems);
  mkProp(this, 'pageNum', () => this.searchOptions.pageNum);
  mkProp(this, 'currentPage', () => this.searchOptions.currentPage);
}

export function selectNext() {
  var index = this.indexOfItem(local.currentItem) + 1;
  if (this.dataList[index]) {
    this.setCurrentItem(this.dataList[index]);
    return true;
  }
  return false;
}

export function selectPrevious() {
  var index = this.indexOfItem(local.currentItem) - 1;
  if (this.dataList[index]) {
    this.setCurrentItem(this.dataList[index]);
    return true;
  }
  return false;
}

export function dataKeyFilter(key) {
  var filter = {};
  key = _.isObject(key) ? key[this.primaryKey] : key;
  filter[this.primaryKey] = key;
  return filter;
}

export function removeItem(key) {
  key = _.isObject(key) ? key[this.primaryKey] : key;
  if (!key) {
    return {};
  }

  _.remove(this.dataList, this.dataKeyFilter(key));
  _.remove(this.selectedItems, this.dataKeyFilter(key));
}

export function indexOfItem(item, dataList) {
  dataList = dataList || this.dataList;
  var filter = {};
  filter[this.primaryKey] = item[this.primaryKey];
  return _.findIndex(dataList, filter);
}

export function findItem(item, dataList) {
  dataList = dataList || this.dataList;
  return _.find(dataList, this.keyFilter(item));
}

export function resetSearchOptions() {
  this.searchOptions = this.searchOptions || {};

  _.forEach(this.searchOptions, function (value, key) {
    if (this.searchOptions.hasOwnProperty(key)) {
      delete this.searchOptions[key];
    }
  });

  if (this.enablePaging) {
    _.extend(this.searchOptions, {
      pageNum: 1,
      pageSize: this.pageSize,
      totalItems: 0,
      advanced: {},
      advancedSearch: false
    });
  }
}

export function isSearchChanged(options) {
  if (!local.currentSearchOptions) {
    return false;
  }

  //过滤条件改了，有时候这个字段是name,有时候是title
  if (local.currentSearchOptions.title !== options.title) {
    return true;
  }
  //过滤条件改了，有时候这个字段是name,有时候是title
  if (local.currentSearchOptions.name !== options.name) {
    return true;
  }

  if (Boolean(this.currentSearchOptions.advancedSearch) !== Boolean(options.advancedSearch)) {
    return true;
  }

  if (options.advancedSearch && !_.isEqual(this.currentSearchOptions.advanced, options.advanced)) {
    return true;
  }
  return false;
}

export function getSearchParam() {
  var opitons = _.extend({}, this.searchOptions);

  omitAttr(options, 'totalItems');
  omitAttr(options, 'totalPages');

  if (this.isSearchChanged(opitons)) {
    this.pageNum = opitons.pageNum = 1;
  }

  this.currentSearchOptions = _.extend({}, options);

  if (options.advancedSearch) {
    omitAttr(opitons, 'title');
    _.extend(opitons, opitons.advanced);
    omitAttr(opitons, 'advanced');
  } else {
    omitAttr(opitons, 'advanced');
  }

  return opitons;
}

export async function loadData() {
  var options = {};

  if (this.enableSearch) {
    options = this.getSearchParam();
    if (!options.isDispalyTop) {
      omitAttr(options, 'isDispalyTop');
    }
    if (!options.isRecommend) {
      omitAttr(options, 'isRecommend');
    }
  }

  var uri = this.listUri;
  var searchOpion = {
    url: uri
  }

  searchOpion.method = this.listMethod;
  if (this.listMethod === 'get') {
    searchOpion.params = options;
  } else {
    searchOpion.data = options;
  }

  this.callHook(hooks.BEFORE_LIST_LOAD, searchOpion);

  let result = null;
  try {
    result = await this.http(searchOpion);
  } catch (ex) {
    this.throwException(ex, hooks.AFTER_LIST_LOADED, true);
    return null;
  }

  let data = result.data;
  if (res.isSuccess) {
    this.searchOptons.totalItems = 0;

    if (this.enablePaging && data) {
      this.dataList = data.list;
      this.totalItems = data.totalItems;
      this.pageNum = options.pageNum;
      this.selectedItems.length = 0;
    } else {
      this.totalItems = 0;
      this.currentPage = 1;
    }

    if (this.enablePaging) {
      this.dataList = data;
      this.totalItems = this.dataList.length;
    }

    this.callHook(hooks.AFTER_LIST_LOADED);
    this.currentItem = this.findItem(this.currentItem);
    this.setCurrentItem(this.currentItem);
    return this.dataList;
  } else {
    this.throwException(data, hooks.AFTER_LIST_LOADED);
  }
  return data;
}

export function removeItems(items) {
  items = items || this.selectedItems;
  var _itemIds = items.map((item) => item[this.primaryKey]);
  var options = {
    method: 'delete',
    url: this.multiRemoveUri,
    params: {
      ids: _itemIds
    }
  };

  this.callHook(hooks.BEFORE_MULTI_DELETE, options, items);
  this.http(options).then(function (res) {
    var data = res.data;
    if (data.isSuccess) {
      this.searchOptions.totalItems -= items.length;
      for (let index = items.length - 1; index >= 0; index--) {
        this.callHook(hooks.AFTER_DELETE, item);
      }

      this.callHook(hooks.AFTER_MULTI_DELETE, items);
      if (this.enablePaging && this.totalPages >= 1) {
        this.loadData();
      }
      return data.data;
    } else {
      this.throwException(data.data, hooks.AFTER_MULTI_DELETE);
    }
  }, function (exception) {
    this.throwException(exception, hooks.AFTER_MULTI_DELETE, true);
  });
}

export function addToRecycle(items) {
  items = items || this.selectedItems;
  var _itemIds = items.map((item) => item[this.primaryKey]);
  var options = {
    method: 'POST',
    url: globals.recycleUri,
    params: {
      ids: _itemIds
    }
  };

  this.callHook(hooks.BEFORE_RECYCLE, options, items);
  this.http(options).then(function (res) {
    var data = res.data;
    if (data.isSuccess) {
      this.totalItems -= items.length;
      for (let index = items.length - 1; index >= 0; index--) {
        this.callHook(hooks.AFTER_DELETE, item);
      }

      this.callHook(hooks.AFTER_RECYCLE, items);
      if (this.enablePaging && this.totalPages >= 1) {
        this.loadData();
      }
      return data.data;
    } else {
      this.throwException(data.data, hooks.AFTER_RECYCLE);
    }
  }, function (exception) {
    this.throwException(exception, hooks.AFTER_RECYCLE, true);
  })
}

export function selectItem(item) {
  if (this.selectionMode === 'single') {
    this.selectedItems[0] = item;
    this.setCurrentItem(item);
  } else {
    var index = this.indexOfItem(item, this.selectedItems);

    if (index >= 0) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
  }
}

//region hooks
export function afterDelete(item) {
  var index = this.indexOfItem(item);

  if (this.isCurrentItem(item)) {
    if (this.dataList.length > index + 1) {
      this.selectNext();
    } else if (this.dataList.length === index + 1) {
      this.selectPrevious();
    }
  }

  this.removeItem(item);
  if (this.dataList.length === 0 && this.pageNum > 1) {
    this.pageNum--;
  }
}
//endregion
