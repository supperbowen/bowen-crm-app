export default function omitAttr(target, attr) {
	if(!attr || !target){
		return false;
	}
	target = target ||{};
	if(target.hasOwnProperty(attr)){
		delete target[attr];
		return true;
	}
	
	return false;
};