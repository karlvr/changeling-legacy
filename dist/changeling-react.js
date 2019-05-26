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
        var controller = props.controller, prop = props.prop, rest = __rest(props, ["controller", "prop"]);
        var c = controller.snapshot(prop);
        return (React.createElement(Component, __assign({ value: c.value, onChange: c.onChange }, rest)));
    };
}
exports.wrapComponent = wrapComponent;
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.props.controller.snapshot(_this.props.prop).onChange(_this.convertValue(evt.target.value));
        };
        _this.convertValue = function (value) {
            if (_this.props.convert) {
                return _this.props.convert(value);
            }
            else {
                return value;
            }
        };
        return _this;
    }
    Input.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, convert = _a.convert, rest = __rest(_a, ["controller", "prop", "convert"]);
        var value = controller.snapshot(prop).value;
        return (React.createElement("input", __assign({ value: value !== undefined && value !== null ? "" + value : '', onChange: this.onChange }, rest)));
    };
    return Input;
}(React.Component));
exports.Input = Input;
var LazyInput = /** @class */ (function (_super) {
    __extends(LazyInput, _super);
    function LazyInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBlur = function (evt) {
            var _a = _this.props, controller = _a.controller, prop = _a.prop;
            var snapshot = controller.snapshot(prop);
            var value = _this.convertValue(evt.target.value);
            if (value !== undefined) {
                snapshot.onChange(value);
            }
            else if (evt.target.value === '') {
                snapshot.onChange(undefined);
            }
            else {
                evt.target.value = _this.displayValue(snapshot.value);
                evt.target.select();
            }
        };
        _this.displayValue = function (value) {
            if (_this.props.display) {
                return _this.props.display(value);
            }
            if (value !== undefined && value !== null) {
                return "" + value;
            }
            else {
                return '';
            }
        };
        _this.convertValue = function (value) {
            if (_this.props.convert) {
                return _this.props.convert(value);
            }
            else {
                return value;
            }
        };
        return _this;
    }
    LazyInput.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, convert = _a.convert, display = _a.display, rest = __rest(_a, ["controller", "prop", "convert", "display"]);
        var value = controller.snapshot(prop).value;
        var displayValue = this.displayValue(value);
        return (React.createElement("input", __assign({ key: displayValue, defaultValue: displayValue, onBlur: this.onBlur }, rest)));
    };
    return LazyInput;
}(React.Component));
exports.LazyInput = LazyInput;
var CheckableInput = /** @class */ (function (_super) {
    __extends(CheckableInput, _super);
    function CheckableInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            if (evt.target.checked) {
                _this.props.controller.snapshot(_this.props.prop).onChange(_this.convertValue(evt.target.value));
            }
            else {
                _this.props.controller.snapshot(_this.props.prop).onChange(_this.convertValue(''));
            }
        };
        _this.convertValue = function (value) {
            if (_this.props.convert) {
                return _this.props.convert(value);
            }
            else {
                return value;
            }
        };
        return _this;
    }
    CheckableInput.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, value = _a.value, convert = _a.convert, rest = __rest(_a, ["controller", "prop", "value", "convert"]);
        var selectedValue = controller.snapshot(prop).value;
        return (React.createElement("input", __assign({ checked: value === selectedValue, onChange: this.onChange, value: value !== undefined && value !== null ? "" + value : '' }, rest)));
    };
    return CheckableInput;
}(React.Component));
exports.CheckableInput = CheckableInput;
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.props.controller.snapshot(_this.props.prop).onChange(_this.convertValue(evt.target.value));
        };
        _this.convertValue = function (value) {
            if (_this.props.convert) {
                return _this.props.convert(value);
            }
            else {
                return value;
            }
        };
        return _this;
    }
    TextArea.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, convert = _a.convert, rest = __rest(_a, ["controller", "prop", "convert"]);
        var value = controller.snapshot(prop).value;
        return (React.createElement("textarea", __assign({ value: value !== undefined && value !== null ? "" + value : '', onChange: this.onChange }, rest)));
    };
    return TextArea;
}(React.Component));
exports.TextArea = TextArea;
