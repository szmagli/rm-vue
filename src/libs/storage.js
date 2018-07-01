class State {
	constructor(data, name) {
		this.name = name;
		this._state = data;
		this.observe = [];
	}

	_callObserves(event, observe) {
		for (let oid in observe) {
			if (observe[oid].event == event)
				observe[oid].func();
		}
	}

	_storeLocalStorage() {
		window.localStorage.setItem('states_'+this.name, JSON.stringify(this._state));
	}

	watch(event, func) {
		this.observe.push({
			event: event,
			func: func
		});
	}

	fetch() {
		let ls = false;
		try{
			ls = window.localStorage.getItem('states_'+this.name);
			ls = JSON.parse(ls);
		} catch(e) {
			console.log(new Error(e));
		}

		if(ls)
			return ls;
		
		return this._state;
	}

	commit(newState) {
		this._state = newState;
		this._callObserves('created', this.observe);
		this._storeLocalStorage();
	}
}

class Storage {
	constructor(cfg) {
		this.mutations = {};
		this._prepareStates(cfg.state);
		this._prepareMutations(cfg.mutations);
	}

	_prepareStates(states) {
		for (let i in states) {
			this[i] = new State(states[i], i);
		}
	}

	_prepareMutations(mutations) {
		for (let i in mutations) {
			this.mutations[i] = mutations[i];
		}
	}

	mutate(action, args) {
		this.mutations[action]({ test: 2, state: this }, args);
	}
}

let StorageEngine = {};

StorageEngine.install = function (Vue, options) {
	Vue.prototype.$storage = new Storage(options);
};

export default StorageEngine;