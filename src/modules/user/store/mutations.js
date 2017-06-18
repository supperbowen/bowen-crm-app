import {
	appendLookupData,
	extend,
	firstOrDefault,
	indexOf
} from '../../../common/utils';

/**
 * 设置当前的用户
 * @param {*} state 状态
 * @param {*} user 当前用户
 */
export function setCurrentUser(state, user) {
	user = user || {};
	state.currentUser = user;
}

/**
 * 更新当前模块的字典数据，这个数据是要从服务器动态取得
 * 我们每次查询列表或者查询单个数据时都应该可以把相关的字典数据更新到
 * 当前的字典数据库中。 
 * @param {*} state 状态
 * @param {*} lookupData 字典数据
 */
export function setLookup(state, lookupData) {
	appendLookupData(state.lookupData, lookupData);
}

/**
 * 设置用户查询列表
 * @param {*} state 状态
 * @param {*} userList 用户列表
 */
export function setUserList(state, userList) {
	state.userList = userList;
}

/**
 * 更新对象，我们会在列表中更新指定的对象并且如果当前对象与指定对象的_id相等则同时更新当前对象.
 * @param {*} state 状态
 * @param {*} item 更新的对象
 */
export function updateItem(state, item) {
	extend(firstOrDefault(state.userList, (listItem) => listItem._id === item._id, {}), item);
	if (state.currentUser._id === item._id) {
		extend(state.currentUser, item);
	}
}

/**
 * 移除列表中的指定项，如果移除项为当前项，则重置当前项
 * @param {*} state 状态
 * @param {*} _id 被移除项的id
 */
export function removeItem(state, _id) {
	var index = indexOf(state.userList, {
		_id
	});
	if (index >= 0) {
		state.userList.splice(index, 1);
	}

	if (state.currentUser._id === _id) {
		setCurrentUser(state, state.userList[index] ? state.userList[index] : state.userList[index - 1]);
	}
}

/**
 * 设置分页信息
 * @param {*} state 状态
 * @param {*} pagination 分布信息
 */
export function setPagination(state, pagination) {
	state.pagination.filter = pagination.filter;
	state.pagination.pageSize = pagination.pageSize;
	state.pagination.pageNum = pagination.pageNum;
}