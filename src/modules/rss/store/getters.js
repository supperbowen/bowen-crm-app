import {
	firstOrDefault
} from '../../../common/utils';

/**
 * 用户角色对象列表
 */
export function roleNames(state) {
	var rolesData = state.lookupData.roles || [];
	return rolesData.filter(role => state.currentUser.roles.indexOf(role._id)) || [];
}
/**
 * 当前用户的创建者
 */
export function createUser(state) {
	var users = state.lookupData.users | [];
	return firstOrDefault(users, user => user._id === state.currentUser.createBy);
}
/**
 * 当前用户的更新人
 */
export function updateUser(state) {
	var users = state.lookupData.users | [];
	return firstOrDefault(users, user => user._id === state.currentUser.updateBy);
}