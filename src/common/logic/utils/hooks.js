var hooks = {
	INIT_MIXIN: 'initMixin',
	AFTER_CREATE: 'afterCreate',
	AFTER_RESET: 'afterReset',
	BEFORE_DELETE: 'beforeDelete',
	AFTER_DELETE: 'afterDelete',
	BEFORE_RECYCLE: 'beforeRecycle',
	AFTER_RECYCLE: 'afterRecycled',
	BEFORE_MULTI_DELETE: 'beforeMultiDelete',
	AFTER_MULTI_DELETE: 'afterMultiDeleted',
	BEFORE_LIST_LOAD: 'beforeListLoad',
	AFTER_LIST_LOADED: 'afterListLoaded',
	BEFORE_ITEM_LOAD: 'beforeItemLoad',
	AFTER_ITEM_LOADED: 'afterItemLoaded',
	BEFORE_SAVE: 'beforeSave',
	AFTER_SAVED: 'afterSaved',
	DESTROY: 'destroy',
	CURRENT_ITEM_CHANGED: 'currentItemChanged',
	EXCEPTION: 'onException',
	HTTP_EXCEPTION:'httpException'
};

export default  hooks;