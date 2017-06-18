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
		var arguments = arguments;
		for (let handler of this.handlers) {
			handler(...arguments);
		}
	}

	destroy() {
		this.handlers.length = 0;
	}
}