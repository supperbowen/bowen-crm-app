var utils = {
	/**
	 * 是否为对象类型（包含数组）
	 * @param {*} obj 目标对象
	 */
	isObject(obj) {
		return typeof obj === 'object';
	},
	isNull(obj) {
		return obj === null;
	},

	/**
	 * 是否已定义
	 * @param {*} obj 目标对象
	 */
	isDefined(obj) {
		return typeof obj !== 'undefined';
	},
	/**
	 * 是否未定义
	 * @param {*} obj 目标对象
	 */
	isUndefined(obj) {
		return typeof obj === 'undefined';
	},
	/**
	 * 是否为数据组类型
	 * @param {*} obj 目标对象
	 */
	isArray(obj) {
		return utils.isDefined(obj) && obj instanceof Array;
	},
	isFunction(obj) {
		return typeof obj === 'function';
	},
	/**
	 * 是否为数字类型
	 * @param {*} obj 目标对象
	 */
	isNumber(obj) {
		return typeof obj === 'number';
	},
	/**
	 * 深度拷贝对象
	 * @param {*} obj 拷贝对象
	 */
	copy(obj) {
		let newObj;
		if (utils.isObject(obj)) {
			newObj = {};
			utils.each(obj, (prop) => {
				newObj = utils.isObject(prop) ? utils.copy(prop) : prop;
			});
		} else {
			newObj = obj;
		}
		return newObj;
	},
	/**
	 * 比对两个对象是否为完全相等
	 * @param {*} source 源对象
	 * @param {*} target 目标对象
	 */
	equal(source, target) {
		if (source === target) {
			return true;
		}
		if (!utils.isObject(source) || !utils.isObject(target)) { //如果不是对象则返回两者间的直接比较结果。		
			return source === target;
		} else if (utils.isNull(source) || utils.isNull(target)) { //如果有其一是null则返回两者的直接比较结果。
			return source === target;
		}

		//前置值，默认为相等，如果有找到不等的属性则返回不等的结果。
		let isEqual = true;
		utils.each(source, function(propVal, prop) {
			isEqual = utils.equals(propVal, target[prop]);
			return !isEqual; //如果不等则返回true从而跳出循环
		});

		if (!isEqual) {
			return false;
		}

		utils.each(target, function(propVal, prop) {
			isEqual = utils.equals(propVal, source[prop]);
			return !isEqual; //如果不等则返回true从而跳出循环
		});
		return isEqual;
	},
	contains(item, target) {
		//前置值，默认为相等，如果有找到不等的属性则返回不等的结果。
		let isEqual = true;
		utils.each(target, function(propVal, prop) {
			isEqual = utils.equals(propVal, item[prop]);
			return !isEqual; //如果不等则返回true从而跳出循环
		});
		return isEqual;
	},
	filter(list, iterator) {
		list = list || [];
		if (utils.isFunction(iterator)) {
			return list.filter(iterator);
		} else if (utils.isObject(iterator)) {
			return list.filter(item => utils.contains(item, iterator));
		}
	},
	find(list, iterator) {
		var matchs = utils.filter(list, iterator);
		return matchs[0];
	},
	/**
	 * 查询列表项并返回其下标，如果传入的是对象则自动取其_id
	 * @param {*} list 列表
	 * @param {*} item 检查项,或者检查项的_id
	 */
	indexOf(list, iterator) {
		list = list || [];
		if (utils.isFunction(iterator)) {
			return list.indexOf(iterator);
		} else if (utils.isObject(iterator)) {
			return list.indexOf(item => utils.contains(item, iterator));
		}
	},
	/**
	 * 扩展对象，会把新对象的属性深度拷贝到老对象，而且会把新对象中没有的属性进行删除。
	 * 执行后这两个对象值会完全一致，但内存栈地址不一样。
	 * @param {*} oldItem 被扩展的对象
	 * @param {*} newItem 扩展的新对象
	 */
	extend(oldItem, newItem) {
		//把新的属性更新到老对象
		utils.each(newItem, function(newProp, propKey) {
			var oldProp = oldItem[propKey];
			//如果属性为对象则进行尝试的递归替换
			if (utils.isObject(newProp) && utils.isObject(oldProp)) {
				utils.extend(oldItem[propKey], newItem[propKey]);
			} else {
				//如果新两者其一不是对象，则把旧对象深拷贝到旧对象。
				oldItem[propKey] = utils.copy(newItem[propKey]);
			}
		});

		//把新属性中不存在属性移除。
		utils.each(oldItem, (oldProp, propKey) => {
			if (!newItem.hasOwnProperty(propKey)) {
				delete oldItem[propKey];
			}
		});
	},
	/**
	 * 循环方法，可以一致性地执行数据与对象的遍历。
	 * @param {*} list 循环对象
	 * @param {*} callback 回调函数
	 */
	each(list, callback) {
		list = list || [];
		if (utils.isArray(list)) {
			//使用倒序时可以进行安全删除！！
			for (let index = list.length - 1; index >= 0; index--) {
				let result = callback(list[index], index);
				if (result) {
					break;
				}
			}
		} else if (utils.isObject) {
			let keys = Object.keys(list);
			for (let key of keys) {
				let result = callback(list[key], key);
				if (result) {
					break;
				}
			}
		}
	},
	/**
	 * 通过指字的过滤条件取得列表中符合条件的第一个或者默认对象（默认为空对象）
	 * @param {*} list 列表
	 * @param {*} filter 过滤条件
	 * @param {*} defaultItem 默认项，不设置则为空对象
	 */
	firstOrDefault(list, filter, defaultItem = {}) {
		list = list || [];
		var items = list.filter(filter) || [];
		return items[0] || defaultItem;
	},
	/**
	 * 检查列表当中是否存在与给定检查项相同_id的列表项。
	 * @param {*} list 列表
	 * @param {*} item 检查项,或者检查项的_id
	 */
	hasItem(list, item) {
		var _id = typeof item === 'string' ? item : item._id;
		list = list || [];
		return list.indexOf({
			_id
		});
	},
	/**
	 * 把指定项更新到列表当中。
	 * @param {*} list 操作的列表对象
	 * @param {*} newItem 操作的更新项
	 * @param {*} isAppend 是否在不存在的情况下把更新项追加到列表当中。
	 */
	replaceItem(list, newItem, isAppend) {
		var index = utils.hasItem(list, newItem);
		if (index >= 0) {
			utils.extend(list[index], newItem);
		} else if (isAppend) {
			list.push(newItem);
		}
	},
	/**
	 * 判断数组或对象是否为空，如果传入的不是数组或对象则始终会返回true
	 * @param {*} item 数组或对象
	 */
	isEmpty(item) {
		if (utils.isArray(item)) {
			return !item || !item.length;
		} else if (utils.isObject(item)) {
			return !Object.keys(item).length;
		} else {
			return true;
		}
	},

	/**
	 * 把新的字典数据追加到现有的字典数据中。
	 * 追加的过程中如果已经存在则会执行更新，否则直接追加，但不会删除现有的数据。
	 * @param {*} lookupData 现有的字典数据
	 * @param {*} source 新的字典数据
	 */
	appendLookupData(lookupData, source) {
		utils.each(source, (newData, lookupKey) => {
			//如果存在则更新，只更新不会对原有的进行删除。
			if (lookupData[lookupKey] && lookupData[lookupKey].length) {
				let oldData = lookupData[lookupKey];
				utils.each(newData, (newItem) => utils.replaceItem(oldData, newItem, true));
			} else {
				//不存在则直接添加上去.
				lookupData[lookupKey] = newData;
			}
		});
	}

};

export default utils;