"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
function wrapComponent(Component) {
    return function (props) {
        var changeling = props.changeling, name = props.name, rest = __rest(props, ["changeling", "name"]);
        var changeable = changeling.prop(name);
        return (React.createElement(Component, __assign({ value: changeable.value, onChange: changeable.onChange }, rest)));
    };
}
exports.wrapComponent = wrapComponent;
var ChangelingInput = /** @class */ (function (_super) {
    __extends(ChangelingInput, _super);
    function ChangelingInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.props.changeling.prop(_this.props.changelingProperty).onChange(_this.convertValue(evt.target.value));
        };
        _this.convertValue = function (value) {
            return value;
        };
        return _this;
    }
    ChangelingInput.prototype.render = function () {
        var _a = this.props, changeling = _a.changeling, changelingProperty = _a.changelingProperty, rest = __rest(_a, ["changeling", "changelingProperty"]);
        var value = changeling.prop(changelingProperty).value;
        return (React.createElement("input", __assign({ value: "" + value || '', onChange: this.onChange }, rest)));
    };
    return ChangelingInput;
}(React.Component));
exports.ChangelingInput = ChangelingInput;
// interface TTT {
// 	blah: string
// }
// let cc: TTT = {
// 	blah: 'what',
// }
// const c = forFuncs(
// 	() => cc, 
// 	(newValue: TTT) => {
// 		cc = newValue
// 		return
// 	}
// )
// (
// 	<ChangelingInput changeling={} changelingProperty="" />
// )
