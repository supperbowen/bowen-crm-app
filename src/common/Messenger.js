export default class Messenger {
	constructor() {
		this.handlers = [];
	}

	register(hander) {
		this.handlers.push(hander);
	}

	unregister(hander) {
		var index = this.handlers.indexOf(hander);
		if (index !== -1) {
			hander.splice(index, 1);
		}
	}

	emit() {
		var args = arguments;
		for (let handler of this.handlers) {
			handler(...args);
		}
	}

	destroy() {
		this.handlers.length = 0;
	}
}