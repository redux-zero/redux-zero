"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var select_1 = require("../utils/select");
var shallowEqual_1 = require("../utils/shallowEqual");
function connect(mapToProps) {
    if (typeof mapToProps !== "function")
        mapToProps = select_1.default(mapToProps);
    return function (Child) { return /** @class */ (function (_super) {
        __extends(Wrapper, _super);
        function Wrapper() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = _this.getProps();
            _this.update = function () {
                var mapped = _this.getProps();
                if (!shallowEqual_1.default(mapped, _this.state)) {
                    _this.setState(mapped);
                }
            };
            return _this;
        }
        Wrapper.prototype.getProps = function () {
            var state = this.context.store && this.context.store.getState() || {};
            return mapToProps(state);
        };
        Wrapper.prototype.componentWillMount = function () {
            this.context.store.subscribe(this.update);
        };
        Wrapper.prototype.componentWillUnmount = function () {
            this.context.store.unsubscribe(this.update);
        };
        Wrapper.prototype.render = function (props, state, context) {
            return React.createElement(Child, __assign({ store: context.store }, props, state));
        };
        return Wrapper;
    }(React.Component)); };
}
exports.default = connect;
//# sourceMappingURL=connect.js.map