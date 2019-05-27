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
        var c = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(Component, __assign({ value: c.value, onChange: c.onChange }, rest)));
    };
}
exports.wrapComponent = wrapComponent;
function wrapComponentConvert(Component) {
    return function (props) {
        var controller = props.controller, prop = props.prop, convert = props.convert, display = props.display, rest = __rest(props, ["controller", "prop", "convert", "display"]);
        var c = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(Component, __assign({ value: display ? display(c.value) : c.value, onChange: function (value) { c.onChange(convert(value)); } }, rest)));
    };
}
/**
 * Convert a component that accepts values of type R to a component that accepts values of type S.
 * @param Component A component that accepts a Snapshot<R>
 * @param convert A function to convert from R to S
 * @param display A function to convert from S to R
 */
function convertComponent(Component, convert, display) {
    return function (props) {
        var value = props.value, onChange = props.onChange, rest = __rest(props, ["value", "onChange"]);
        return (React.createElement(Component, __assign({ value: display ? display(value) : value, onChange: function (value) { onChange(convert(value)); } }, rest)));
    };
}
exports.convertComponent = convertComponent;
var BaseInput = /** @class */ (function (_super) {
    __extends(BaseInput, _super);
    function BaseInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.props.onChange(_this.convertValue(evt.target.value));
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
    BaseInput.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, convert = _a.convert, rest = __rest(_a, ["value", "onChange", "convert"]);
        return (React.createElement("input", __assign({ value: value !== undefined && value !== null ? "" + value : '', onChange: this.onChange }, rest)));
    };
    return BaseInput;
}(React.Component));
var StringInput = /** @class */ (function (_super) {
    __extends(StringInput, _super);
    function StringInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringInput.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(BaseInput, __assign({}, rest)));
    };
    return StringInput;
}(React.Component));
var NumberInput = convertComponent(StringInput, function (value) { return parseInt(value); }, function (value) { return value !== undefined ? "" + value : ''; });
var CheckableInput = /** @class */ (function (_super) {
    __extends(CheckableInput, _super);
    function CheckableInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            if (evt.target.checked) {
                _this.props.onChange(_this.props.checkedValue);
            }
            else {
                _this.props.onChange(_this.props.uncheckedValue);
            }
        };
        return _this;
    }
    CheckableInput.prototype.render = function () {
        var _a = this.props, value = _a.value, checkedValue = _a.checkedValue, uncheckedValue = _a.uncheckedValue, onChange = _a.onChange, rest = __rest(_a, ["value", "checkedValue", "uncheckedValue", "onChange"]);
        return (React.createElement("input", __assign({ checked: value === checkedValue, onChange: this.onChange, value: checkedValue !== undefined && checkedValue !== null ? "" + checkedValue : '' }, rest)));
    };
    return CheckableInput;
}(React.Component));
var LazyBaseInput = /** @class */ (function (_super) {
    __extends(LazyBaseInput, _super);
    function LazyBaseInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBlur = function (evt) {
            var onChange = _this.props.onChange;
            var value = _this.convertValue(evt.target.value);
            if (value !== undefined) {
                onChange(value);
            }
            else if (evt.target.value === '') {
                onChange(undefined);
            }
            else {
                evt.target.value = _this.displayValue(_this.props.value);
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
    LazyBaseInput.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, rest = __rest(_a, ["value", "onChange"]);
        var displayValue = this.displayValue(value);
        return (React.createElement("input", __assign({ key: displayValue, defaultValue: displayValue, onBlur: this.onBlur }, rest)));
    };
    return LazyBaseInput;
}(React.Component));
var LazyStringInput = /** @class */ (function (_super) {
    __extends(LazyStringInput, _super);
    function LazyStringInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyStringInput.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(LazyBaseInput, __assign({}, rest)));
    };
    return LazyStringInput;
}(React.Component));
var LazyNumberInput = convertComponent(LazyStringInput, function (value) { return parseInt(value); }, function (value) { return value !== undefined ? "" + value : ''; });
var BaseTextArea = /** @class */ (function (_super) {
    __extends(BaseTextArea, _super);
    function BaseTextArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.props.onChange(_this.convertValue(evt.target.value));
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
    BaseTextArea.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, convert = _a.convert, rest = __rest(_a, ["value", "onChange", "convert"]);
        return (React.createElement("textarea", __assign({ value: value !== undefined && value !== null ? "" + value : '', onChange: this.onChange }, rest)));
    };
    return BaseTextArea;
}(React.Component));
var StringTextArea = /** @class */ (function (_super) {
    __extends(StringTextArea, _super);
    function StringTextArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringTextArea.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(BaseTextArea, __assign({}, rest)));
    };
    return StringTextArea;
}(React.Component));
exports.Input = {
    Checkable: wrapComponent(CheckableInput),
    Generic: wrapComponentConvert(StringInput),
    String: wrapComponent(StringInput),
    Number: wrapComponent(NumberInput),
    LazyGeneric: wrapComponentConvert(LazyStringInput),
    LazyString: wrapComponent(LazyStringInput),
    LazyNumber: wrapComponent(LazyNumberInput),
    TextArea: wrapComponent(StringTextArea),
    TextAreaGeneric: wrapComponentConvert(StringTextArea),
};
