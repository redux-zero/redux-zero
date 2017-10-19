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
                listeners.splice(listeners.indexOf(f));
            };
        },
        getState: function () {
            return state;
        }
    };
}

export default createStore$1;
//# sourceMappingURL=redux-zero.mjs.map
