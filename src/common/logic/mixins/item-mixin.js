import Messenger from '../../Messenger';
import * as _ from 'lodash';
import {keyFilter, ensure, hooks, omitAttr, hook, method, mkProp} from '../utils';
import globals from 'src/globals';


//region hooks
/**
 * 这个钩子是混合器专有的。
 * 初始化混合器
 * @param local 录前上下文中的protect变量，只能有各个混合器使用。
 * @param options
 */
export function initMixin(local, options) {
	mkProp(this, 'createUri', () => options.createUri);
	mkProp(this, 'updateUri', () => options.updateUri);
	mkProp(this, 'deleteUri', () => options.deleteUri);
	mkProp(this, 'loadUri', () => options.loadUri);
	mkProp(this, 'copyUri', () => options.copyUri);
}
//endregion

//region methods
export function setCurrentItem(item) {
	item = item || {};
	if (!item.$$new) {
		this.currentItem = item;
		item = _.find(this.dataList, keyFilter(item, this.primaryKey));
	}
	
	this.callHook(hooks.CURRENT_ITEM_CHANGED, item);
}

export function isItemEqual(item1, item2) {
	return ensure.ensureObject(item1)[this.primaryKey] === ensure.ensureObject(item2)[this.primaryKey];
}

/**
 * 指定项是否为当前选中的项
 * @param item 目标项
 * @param strict true的时候item必需与currentItem全等， false时只城需要主键相同便可
 * @returns {boolean}
 */
export function isCurrentItem(item, strict) {
	if (strict) {
		return this.currentItem === item;
	}
	
	item = item || {};
	
	return this.isItemEqual(item, this.currentItem);
}

/**
 * 取得当前选中的项，主要是用于列表显示当前选中的条目及详情页面的当前项的编辑操作。
 * @returns {*|{}} 当前选中的项
 */
export function getCurrentItem() {
	return this.currentItem;
}

/**
 * 重置当前对象
 * hook  afterReset
 */
export function resetCurrentItem() {
	var defaultVal = this.data() || {};
	_.extend(this.currentItem, defaultVal);
	this.callHook(hooks.AFTER_RESET, this.currentItem);
}

/**
 * 创建新的对象，初始化由
 * @returns {*}
 */
export function createNew() {
	var defaultVal = this.data() || {};
	defaultVal.$$new = true;
	this.callHook(hooks.AFTER_CREATE, defaultVal);
	return defaultVal;
}

/**
 * 保存新增
 * @param item 保存对象，如果没有则取currentItem
 * @param options 用户定义保存参数
 * @returns {Promise.<TResult>|*}
 */
export function saveCreate(item) {
	item = item || this.currentItem;
	var options = {
		url: this.createUri,
		data: item,
		method: 'post'
	};
	this.callHook(hooks.BEFORE_SAVE, options);
	
	omitAttr(item, '$$new');
	return this.http(options).then((res) => {
		if (res.isSuccess) {
			this.searchOptions.totalItems++;
			//当需要翻页时就重置查询条件，并回到第一页，因为新增的默认会是第一个。
			if (this.dataList.length >= this.searchOptions.pageSize) {
				this.searchOptions.filter = '';
				this.searchOptions.pageNum = 1;
			}
			//重新加载数据
			this.loadData();
			
			//操作成功，调用成功钩子
			this.callHook(hooks.AFTER_SAVED, res.data, true);
		} else {
			//操作失败，抛出异常
			this.callHook(hooks.EXCEPTION, item, res.data);
		}
		
		return res.data;
	}, (ex) => {
		this.throwException(ex, hooks.AFTER_SAVED, true);
	});
}

/**
 * 保存修改数据
 * @param item 保存对象，默认是currentItem
 */
export function updateItem(item) {
	item = item || this.currentItem;
	var options = {
		method: 'put',
		url: this.createUri,
		data: item
	};
	//调用保存前的钩子
	this.callHook(hooks.BEFORE_SAVE, item);
	
	this.http(options).then((res) => {
		if (res.isSuccess) {
			//调用保存成功后的钩子
			this.callHook(hooks.AFTER_SAVED, res.data);
		} else {
			//保存异常
			this.throwException(res.data, hooks.AFTER_SAVED);
		}
	}, (ex) => {
		//http异常
		this.throwException(ex, hooks.AFTER_SAVED, true);
	})
}

/**
 * 保存修改数据
 * @param item 保存对象，默认是currentItem
 */
export function updateItem(item) {
	item = item || this.currentItem;
	var options = {
		method: 'put',
		url: this.createUri,
		data: item
	};
	//调用保存前的钩子
	this.callHook(hooks.BEFORE_SAVE, item);
	
	this.http(options).then((res) => {
		if (res.isSuccess) {
			//调用保存成功后的钩子
			this.callHook(hooks.AFTER_SAVED, res.data);
		} else {
			//保存异常
			this.throwException(res.data, hooks.AFTER_SAVED);
		}
	}, (ex) => {
		//http异常
		this.throwException(ex, hooks.AFTER_SAVED, true);
	})
}

/**
 * 复制新增
 * @param item 复制的对象，默认不指定则为currentItem
 */
export function copyCreate(item) {
	item = item || this.currentItem;
}

//endregion