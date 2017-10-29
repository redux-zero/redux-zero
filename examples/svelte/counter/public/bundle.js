(function () {
'use strict';

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function createElement(name) {
	return document.createElement(name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component.options = options;

	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._root = options._root || component;
	component._yield = options._yield;
	component._bind = options._bind;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);
	dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
	this._fragment.p(changed, this._state);
	dispatchObservers(this, this._observers.post, changed, this._state, oldState);
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	this._fragment.u();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

function shallowEqual(a, b) {
  for (const i in a) if (a[i] !== b[i]) return false
  for (const i in b) if (!(i in a)) return false
  return true
}

function bindActions(actions, store) {
  let bound = {};
  for (let name in actions) {
    bound[name] = (...args) => {
      let ret = actions[name](store.getState(), ...args);
      if (ret != null) store.setState(ret);
    };
  }
  return bound
}

// TODO - clean up console.log
function getActions(store, actions) {
  return bindActions(
    typeof actions === "function" ? actions(store) : actions,
    store
  )
}

function differs$1(a, b) {
  if (a && typeof a === "object") {
    return !shallowEqual(a, b)
  }
  return a !== b
}

function getDiff(newData, oldData) {
  console.log("getDiff(newData, oldData)", newData, oldData);
  const diff = {};
  let changed = false;
  for (let key in newData) {
    if (differs$1(oldData[key], newData[key])) {
      changed = true;
      diff[key] = newData[key];
    }
  }
  return { diff, changed }
}

function connect(component, store, mapToProps) {
  update();
  component.on("destroy", store.subscribe(update));
  function update() {
    const { diff, changed } = getDiff(
      mapToProps(store.getState()),
      component.get()
    );
    if (changed) {
      component.set(diff);
      console.log("connect - diff", diff);
    }
  }
}

'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function createStore$1(state) {
    if (state === void 0) { state = {}; }
    var listeners = [];
    return {
        setState: function (update) {
            state =
                typeof update === "function"
                    ? __assign({}, state, update(state)) : __assign({}, state, update);
            listeners.forEach(function (f) { return f(state); });
        },
        subscribe: function (f) {
            listeners.push(f);
            return function () {
                listeners.splice(listeners.indexOf(f), 1);
            };
        },
        getState: function () {
            return state;
        }
    };
}

var reduxZero = createStore$1;

const initialState = { count: 1 };
const store = reduxZero(initialState);

const actions = store => ({
    increment: state => ({ count: state.count + 1 }),
    decrement: state => ({ count: state.count - 1 })
});

/* src\components\Hello.html generated by Svelte v1.41.1 */
const mapToProps = ({ count }) => ({ count });
const { decrement, increment } = getActions(store, actions);

var methods = {
    decrement,
    increment,
};

function oncreate() {
    connect(this, store, mapToProps);
}

function encapsulateStyles(node) {
	setAttribute(node, "svelte-1430144578", "");
}

function add_css() {
	var style = createElement("style");
	style.id = 'svelte-1430144578-style';
	style.textContent = "[svelte-1430144578].button,[svelte-1430144578] .button{font-size:20px}[svelte-1430144578].header,[svelte-1430144578] .header{margin-top:20px}";
	appendNode(style, document.head);
}

function create_main_fragment$1(state, component) {
	var div, div_1, text, text_1, text_2, text_4, div_2, h1, text_5, text_6, div_3, button, text_8, button_1, text_12, hr;

	function click_handler(event) {
		component.decrement(event);
	}

	function click_handler_1(event) {
		component.increment(event);
	}

	return {
		c: function create() {
			div = createElement("div");
			div_1 = createElement("div");
			text = createText("Hello ");
			text_1 = createText(state.name);
			text_2 = createText("!");
			text_4 = createText("\n");
			div_2 = createElement("div");
			h1 = createElement("h1");
			text_5 = createText(state.count);
			text_6 = createText("\n    ");
			div_3 = createElement("div");
			button = createElement("button");
			button.textContent = "-";
			text_8 = createText("\n      ");
			button_1 = createElement("button");
			button_1.textContent = "+";
			text_12 = createText("\n");
			hr = createElement("hr");
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(div);
			div.className = "header";
			div_1.className = "greeting";
			encapsulateStyles(div_2);
			button.className = "button";
			addListener(button, "click", click_handler);
			button_1.className = "button";
			addListener(button_1, "click", click_handler_1);
			encapsulateStyles(hr);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(div_1, div);
			appendNode(text, div_1);
			appendNode(text_1, div_1);
			appendNode(text_2, div_1);
			insertNode(text_4, target, anchor);
			insertNode(div_2, target, anchor);
			appendNode(h1, div_2);
			appendNode(text_5, h1);
			appendNode(text_6, div_2);
			appendNode(div_3, div_2);
			appendNode(button, div_3);
			appendNode(text_8, div_3);
			appendNode(button_1, div_3);
			insertNode(text_12, target, anchor);
			insertNode(hr, target, anchor);
		},

		p: function update(changed, state) {
			if (changed.name) {
				text_1.data = state.name;
			}

			if (changed.count) {
				text_5.data = state.count;
			}
		},

		u: function unmount() {
			detachNode(div);
			detachNode(text_4);
			detachNode(div_2);
			detachNode(text_12);
			detachNode(hr);
		},

		d: function destroy$$1() {
			removeListener(button, "click", click_handler);
			removeListener(button_1, "click", click_handler_1);
		}
	};
}

function Hello$1(options) {
	init(this, options);
	this._state = options.data || {};

	if (!document.getElementById("svelte-1430144578-style")) add_css();

	var _oncreate = oncreate.bind(this);

	if (!options._root) {
		this._oncreate = [_oncreate];
	} else {
	 	this._root._oncreate.push(_oncreate);
	 }

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		callAll(this._oncreate);
	}
}

assign(Hello$1.prototype, methods, proto);

/* src\App.html generated by Svelte v1.41.1 */
function data() {
	return { name: "World" };
}

function create_main_fragment(state, component) {
	var div, text, input, input_updating = false, text_1, text_2;

	function input_input_handler() {
		input_updating = true;
		component.set({ name: input.value });
		input_updating = false;
	}

	var hellocomponent = new Hello$1({
		_root: component._root,
		data: { name: state.name }
	});

	var hellocomponent_1 = new Hello$1({
		_root: component._root,
		data: { name: "Kiho" }
	});

	return {
		c: function create() {
			div = createElement("div");
			text = createText("Name: ");
			input = createElement("input");
			text_1 = createText("\r\n\t");
			hellocomponent._fragment.c();
			text_2 = createText("\r\n\t");
			hellocomponent_1._fragment.c();
			this.h();
		},

		h: function hydrate() {
			input.type = "text";
			addListener(input, "input", input_input_handler);
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(text, div);
			appendNode(input, div);

			input.value = state.name;

			appendNode(text_1, div);
			hellocomponent._mount(div, null);
			appendNode(text_2, div);
			hellocomponent_1._mount(div, null);
		},

		p: function update(changed, state) {
			if (!input_updating) {
				input.value = state.name;
			}

			var hellocomponent_changes = {};
			if (changed.name) hellocomponent_changes.name = state.name;
			hellocomponent._set( hellocomponent_changes );
		},

		u: function unmount() {
			detachNode(div);
		},

		d: function destroy$$1() {
			removeListener(input, "input", input_input_handler);
			hellocomponent.destroy(false);
			hellocomponent_1.destroy(false);
		}
	};
}

function App(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		this._fragment.c();
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(App.prototype, proto);

const app = new App({
    target: document.querySelector('#app'),
});

}());
