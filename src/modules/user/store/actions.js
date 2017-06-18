import service from '../service/user.data.svc';


export async function login(context, options) {
	var result = await service.login(options.name, options.password);
	context.commit('setCurrentUser', result);
	return result;
}

export async function save(context, item) {
	var result = await service.save();
	context.commit('updateItem', result);
}

export function remove(context, id) {
	var result = await service.remove(id);
}

export function setCurrentItem(context, item) {
	context.commit('setCurrentUser', item);
}

export function getItem(context, id) {
	return await service.getItem(id);
}

export async function getList(context, filter) {
	let result = await service.getList(options.filter, options.pageSize, options.pageNum);
	context.commit('setUserList', result.dataList);
	context.commit('setLookup', result.lookups);
}