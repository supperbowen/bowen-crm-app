import isFunction from './is-function';
export default function mkProp(target, prop, config) {
	var _config = {};
	if(isFunction(config)){
		_config.get = config;
	}else{
		_config = config;
	}
	
	_config.enumerable = _config.enumerable || true;
	_config.configurable = _config.configurable || true;
	
	Object.defineProperty(target,prop, _config);
}