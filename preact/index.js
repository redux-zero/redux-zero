'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var preact = require('preact');

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

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function shallowEqual(a, b) {
    for (var i in a)
        if (a[i] !== b[i])
            return false;
    for (var i in b)
        if (!(i in a))
            return false;
    return true;
}

function bindActions(actions, store) {
    var bound = {};
    var _loop_1 = function (name_1) {
        bound[name_1] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var ret = actions[name_1].apply(actions, [store.getState()].concat(args));
            if (ret != null)
                store.setState(ret);
        };
    };
    for (var name_1 in actions) {
        _loop_1(name_1);
    }
    return bound;
}

var Connect = /** @class */ (function (_super) {
    __extends(Connect, _super);
    function Connect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = _this.getProps();
        _this.actions = _this.getActions();
        _this.update = function () {
            var mapped = _this.getProps();
            if (!shallowEqual(mapped, _this.state)) {
                _this.setState(mapped);
            }
        };
        return _this;
    }
    Connect.prototype.componentWillMount = function () {
        this.unsubscribe = this.context.store.subscribe(this.update);
    };
    Connect.prototype.componentWillUnmount = function () {
        this.unsubscribe(this.update);
    };
    Connect.prototype.getProps = function () {
        var mapToProps = this.props.mapToProps;
        var state = (this.context.store && this.context.store.getState()) || {};
        return mapToProps ? mapToProps(state, this.props) : state;
    };
    Connect.prototype.getActions = function () {
        var actions = this.props.actions;
        return bindActions(typeof actions === "function" ? actions(this.context.store) : actions, this.context.store);
    };
    Connect.prototype.render = function (_a, state, _b) {
        var children = _a.children;
        var store = _b.store;
        return children(__assign({ store: store }, state, this.actions));
    };
    return Connect;
}(preact.Component));

var Provider = /** @class */ (function (_super) {
    __extends(Provider, _super);
    function Provider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Provider.prototype.getChildContext = function () {
        return { store: this.props.store };
    };
    Provider.prototype.render = function () {
        return this.props.children[0];
    };
    return Provider;
}(preact.Component));

exports.Provider = Provider;
exports.Connect = Connect;
//# sourceMappingURL=index.js.map
