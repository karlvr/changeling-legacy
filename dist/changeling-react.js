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
var changeling_1 = require("./changeling");
function wrapComponent(Component) {
    return function (props) {
        var controller = props.controller, prop = props.prop, rest = __rest(props, ["controller", "prop"]);
        var c = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(Component, __assign({ value: c.value, onChange: c.onChange }, rest)));
    };
}
exports.wrapComponent = wrapComponent;
var BaseInput = /** @class */ (function (_super) {
    __extends(BaseInput, _super);
    function BaseInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.props.onChange(_this.convertValue(evt.target.value));
        };
        _this.convertValue = function (value) {
            return _this.props.convert(value);
        };
        return _this;
    }
    BaseInput.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, convert = _a.convert, display = _a.display, rest = __rest(_a, ["value", "onChange", "convert", "display"]);
        var displayValue = display(value);
        return (React.createElement("input", __assign({ value: displayValue, onChange: this.onChange }, rest)));
    };
    return BaseInput;
}(React.Component));
var BaseInputWrapper = /** @class */ (function (_super) {
    __extends(BaseInputWrapper, _super);
    function BaseInputWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseInputWrapper.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, rest = __rest(_a, ["controller", "prop"]);
        var snapshot = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(BaseInput, __assign({ value: snapshot.value, onChange: snapshot.onChange }, rest)));
    };
    return BaseInputWrapper;
}(React.Component));
var StringInput = /** @class */ (function (_super) {
    __extends(StringInput, _super);
    function StringInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringInput.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(BaseInput, __assign({ convert: function (value) { return value !== '' ? value : undefined; }, display: function (value) { return value !== undefined ? value : ''; } }, rest)));
    };
    return StringInput;
}(React.Component));
var StringInputWrapper = /** @class */ (function (_super) {
    __extends(StringInputWrapper, _super);
    function StringInputWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringInputWrapper.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, rest = __rest(_a, ["controller", "prop"]);
        var snapshot = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(StringInput, __assign({ value: snapshot.value, onChange: snapshot.onChange }, rest)));
    };
    return StringInputWrapper;
}(React.Component));
var NumberInput = /** @class */ (function (_super) {
    __extends(NumberInput, _super);
    function NumberInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberInput.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(BaseInput, __assign({ convert: function (value) {
                var result = parseInt(value, 10);
                if (!isNaN(result)) {
                    return result;
                }
                return undefined;
            }, display: function (value) {
                if (value !== undefined) {
                    return "" + value;
                }
                else {
                    return '';
                }
            } }, rest)));
    };
    return NumberInput;
}(React.Component));
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
var CheckableInputWrapper = /** @class */ (function (_super) {
    __extends(CheckableInputWrapper, _super);
    function CheckableInputWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckableInputWrapper.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, rest = __rest(_a, ["controller", "prop"]);
        var snapshot = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(CheckableInput, __assign({ value: snapshot.value, onChange: snapshot.onChange }, rest)));
    };
    return CheckableInputWrapper;
}(React.Component));
var MultiCheckableInput = /** @class */ (function (_super) {
    __extends(MultiCheckableInput, _super);
    function MultiCheckableInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            var index = _this.props.value.indexOf(_this.props.checkedValue);
            if (evt.target.checked) {
                if (index === -1) {
                    var newValue = _this.props.value.concat([_this.props.checkedValue]);
                    _this.props.onChange(newValue);
                }
            }
            else {
                if (index !== -1) {
                    var newValue = _this.props.value.slice();
                    newValue.splice(index, 1);
                    _this.props.onChange(newValue);
                }
            }
        };
        return _this;
    }
    MultiCheckableInput.prototype.render = function () {
        var _a = this.props, value = _a.value, checkedValue = _a.checkedValue, uncheckedValue = _a.uncheckedValue, onChange = _a.onChange, rest = __rest(_a, ["value", "checkedValue", "uncheckedValue", "onChange"]);
        var checked = value && value.indexOf(checkedValue) !== -1;
        return (React.createElement("input", __assign({ checked: checked, onChange: this.onChange, value: checkedValue !== undefined && checkedValue !== null ? "" + checkedValue : '' }, rest)));
    };
    return MultiCheckableInput;
}(React.Component));
var MultiCheckableInputWrapper = /** @class */ (function (_super) {
    __extends(MultiCheckableInputWrapper, _super);
    function MultiCheckableInputWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultiCheckableInputWrapper.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, rest = __rest(_a, ["controller", "prop"]);
        var snapshot = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(MultiCheckableInput, __assign({ value: snapshot.value, onChange: snapshot.onChange }, rest)));
    };
    return MultiCheckableInputWrapper;
}(React.Component));
var LazyBaseInput = /** @class */ (function (_super) {
    __extends(LazyBaseInput, _super);
    function LazyBaseInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onBlur = function (evt) {
            var _a = _this.props, onChange = _a.onChange, convert = _a.convert, display = _a.display;
            var value = convert(evt.target.value);
            if (value !== undefined) {
                onChange(value);
            }
            else if (evt.target.value === '') {
                /* The converted result was undefined, and the input was empty, so we change to undefined */
                onChange(undefined);
            }
            else {
                /* The converted result was undefined, but our input wasn't empty, so we assume an error and reset the value */
                evt.target.value = display(_this.props.value);
                evt.target.select();
            }
        };
        return _this;
    }
    LazyBaseInput.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, convert = _a.convert, display = _a.display, rest = __rest(_a, ["value", "onChange", "convert", "display"]);
        var displayValue = display(value);
        return (React.createElement("input", __assign({ key: displayValue, defaultValue: displayValue, onBlur: this.onBlur }, rest)));
    };
    return LazyBaseInput;
}(React.Component));
var LazyBaseInputWrapper = /** @class */ (function (_super) {
    __extends(LazyBaseInputWrapper, _super);
    function LazyBaseInputWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyBaseInputWrapper.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, rest = __rest(_a, ["controller", "prop"]);
        var snapshot = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(LazyBaseInput, __assign({ value: snapshot.value, onChange: snapshot.onChange }, rest)));
    };
    return LazyBaseInputWrapper;
}(React.Component));
var LazyStringInput = /** @class */ (function (_super) {
    __extends(LazyStringInput, _super);
    function LazyStringInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyStringInput.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(LazyBaseInput, __assign({ convert: function (value) { return value !== '' ? value : undefined; }, display: function (value) { return value !== undefined ? value : ''; } }, rest)));
    };
    return LazyStringInput;
}(React.Component));
var LazyNumberInput = /** @class */ (function (_super) {
    __extends(LazyNumberInput, _super);
    function LazyNumberInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LazyNumberInput.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(LazyBaseInput, __assign({ convert: function (value) {
                var result = parseInt(value, 10);
                if (!isNaN(result)) {
                    return result;
                }
                return undefined;
            }, display: function (value) {
                if (value !== undefined) {
                    return "" + value;
                }
                else {
                    return '';
                }
            } }, rest)));
    };
    return LazyNumberInput;
}(React.Component));
var BaseTextArea = /** @class */ (function (_super) {
    __extends(BaseTextArea, _super);
    function BaseTextArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            _this.props.onChange(_this.props.convert(evt.target.value));
        };
        return _this;
    }
    BaseTextArea.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, convert = _a.convert, display = _a.display, rest = __rest(_a, ["value", "onChange", "convert", "display"]);
        var displayValue = display(value);
        return (React.createElement("textarea", __assign({ value: displayValue, onChange: this.onChange }, rest)));
    };
    return BaseTextArea;
}(React.Component));
var BaseTextAreaWrapper = /** @class */ (function (_super) {
    __extends(BaseTextAreaWrapper, _super);
    function BaseTextAreaWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseTextAreaWrapper.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, rest = __rest(_a, ["controller", "prop"]);
        var snapshot = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(BaseTextArea, __assign({ value: snapshot.value, onChange: snapshot.onChange }, rest)));
    };
    return BaseTextAreaWrapper;
}(React.Component));
var StringTextArea = /** @class */ (function (_super) {
    __extends(StringTextArea, _super);
    function StringTextArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringTextArea.prototype.render = function () {
        var rest = __rest(this.props, []);
        return (React.createElement(BaseTextArea, __assign({ convert: function (value) { return value !== '' ? value : undefined; }, display: function (value) { return value !== undefined ? value : ''; } }, rest)));
    };
    return StringTextArea;
}(React.Component));
function isOptionTypeObject(o) {
    return !isPrimitiveOptionType(o);
}
function isPrimitiveOptionType(o) {
    return typeof o === 'string' || typeof o === 'number';
}
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChange = function (evt) {
            var selectedIndex = evt.target.selectedIndex;
            /* Convert the selected index to an option index (in our this.props.options), in case the select's options aren't what we expected */
            var selectedItem = selectedIndex !== -1 ? evt.target.options.item(selectedIndex) : null;
            var selectedOptionIndex = selectedItem ? parseInt(selectedItem.value, 10) : -1;
            var newValue = undefined;
            if (selectedOptionIndex !== -1 && _this.props.options) {
                var selectedOption = _this.props.options[selectedOptionIndex];
                if (isOptionTypeObject(selectedOption)) {
                    newValue = selectedOption.value;
                }
                else if (isPrimitiveOptionType(selectedOption)) {
                    newValue = selectedOption;
                }
                else {
                    console.error('Select has unexpected option type');
                }
            }
            _this.props.onChange(newValue);
        };
        return _this;
    }
    Select.prototype.render = function () {
        var _a = this.props, value = _a.value, onChange = _a.onChange, options = _a.options, rest = __rest(_a, ["value", "onChange", "options"]);
        /* We don't use option values, we just use their indexes, so we don't have to convert things to strings */
        var selectedIndex = options ? options.findIndex(function (o) { return isOptionTypeObject(o) ? o.value === value : isPrimitiveOptionType(o) ? o === value : false; }) : -1;
        return (React.createElement("select", __assign({ onChange: this.onChange, value: selectedIndex !== undefined ? selectedIndex : '' }, rest), (options || []).map(function (item, index) {
            if (isOptionTypeObject(item)) {
                return (React.createElement("option", { key: index, value: index, label: item.label }, item.text || item.value));
            }
            else if (isPrimitiveOptionType(item)) {
                return (React.createElement("option", { key: index, value: index }, item));
            }
        })));
    };
    return Select;
}(React.Component));
var SelectWrapper = /** @class */ (function (_super) {
    __extends(SelectWrapper, _super);
    function SelectWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /* Had to wrap this manually as the HOC loses the type on the options, as it has to bind the Changeable generic type before it know which prop, so it gives it {} */
    SelectWrapper.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, rest = __rest(_a, ["controller", "prop"]);
        var snapshot = prop !== 'this' ? controller.snapshot(prop) : controller.snapshot();
        return (React.createElement(Select, __assign({ value: snapshot.value, onChange: snapshot.onChange }, rest)));
    };
    return SelectWrapper;
}(React.Component));
var Indexed = /** @class */ (function (_super) {
    __extends(Indexed, _super);
    function Indexed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Indexed.prototype.render = function () {
        var _a = this.props, controller = _a.controller, prop = _a.prop, renderEach = _a.renderEach, renderBefore = _a.renderBefore, renderAfter = _a.renderAfter;
        var actualController = prop !== 'this' ? controller.controller(prop) : controller;
        var snapshot = actualController.snapshot();
        var arrayValue = snapshot.value;
        if (arrayValue === undefined) {
            arrayValue = [];
        }
        if (arrayValue.length === undefined) {
            arrayValue = [arrayValue];
        }
        var actions = {
            onPush: function (value) {
                snapshot.onChange(arrayValue.concat([value]));
            },
            onInsert: function (index, value) {
                var newArrayValue = arrayValue.slice();
                newArrayValue.splice(index, 0, value);
                snapshot.onChange(newArrayValue);
            },
            onRemove: function (index) {
                var newArrayValue = arrayValue.slice();
                newArrayValue.splice(index, 1);
                snapshot.onChange(newArrayValue);
            },
        };
        return (React.createElement(React.Fragment, null,
            renderBefore ? renderBefore(actions) : null,
            renderEach ? arrayValue.map(function (v, i) {
                var indexController = actualController.controller(i);
                var cursor = {
                    index: i,
                    first: i === 0,
                    last: i === arrayValue.length - 1,
                };
                return renderEach(indexController, cursor, actions);
            }) : null,
            renderAfter ? renderAfter(actions) : null));
    };
    return Indexed;
}(React.Component));
exports.Input = {
    Checkable: CheckableInputWrapper,
    MultiCheckable: MultiCheckableInputWrapper,
    Generic: BaseInputWrapper,
    String: wrapComponent(StringInput),
    Number: wrapComponent(NumberInput),
    LazyGeneric: LazyBaseInputWrapper,
    LazyString: wrapComponent(LazyStringInput),
    LazyNumber: wrapComponent(LazyNumberInput),
    TextArea: wrapComponent(StringTextArea),
    TextAreaGeneric: BaseTextAreaWrapper,
    Select: SelectWrapper,
    Indexed: Indexed,
};
/* Testing */
function test() {
    var value = {
        name: '',
        age: 0,
        works: false,
        options: [],
    };
    var c = changeling_1.withMutable(value);
    var jsx1 = (React.createElement(React.Fragment, null,
        React.createElement(exports.Input.String, { controller: c.controller('name'), prop: "this" }),
        React.createElement(exports.Input.Number, { controller: c.controller('age'), prop: "this" }),
        React.createElement(exports.Input.Generic, { controller: c, prop: "this", convert: function (v) { return JSON.parse(v); }, display: function (v) { return JSON.stringify(v); } }),
        React.createElement(exports.Input.LazyString, { controller: c.controller('name'), prop: "this" }),
        React.createElement(exports.Input.LazyGeneric, { controller: c.controller('age'), prop: "this", convert: function (value) { return parseInt(value); }, display: function (value) { return "" + value; } }),
        React.createElement(exports.Input.LazyString, { controller: c, prop: "name" }),
        React.createElement(exports.Input.LazyNumber, { controller: c, prop: "age" }),
        React.createElement(exports.Input.LazyGeneric, { controller: c, prop: "age", convert: function (value) { return parseInt(value); }, display: function (value) { return "" + value; } }),
        React.createElement(exports.Input.TextArea, { controller: c, prop: "name" }),
        React.createElement(exports.Input.Select, { controller: c, prop: "name", options: ['John', 'Frank'] }),
        React.createElement(exports.Input.Checkable, { controller: c, prop: "age", checkedValue: 42 }),
        React.createElement(exports.Input.MultiCheckable, { controller: c, prop: "options", checkedValue: "Cool" }),
        "Should break",
        React.createElement(exports.Input.Select, { controller: c, prop: "age", options: [{ key: 34, value: 34 }] })));
    var value2 = {};
    var c2 = changeling_1.withMutable(value2);
    var c2sub = c2.controller('sub');
    var jsx2 = (React.createElement(React.Fragment, null,
        React.createElement(exports.Input.String, { controller: c2.controller('name'), prop: "this" }),
        React.createElement(exports.Input.Number, { controller: c2.controller('age'), prop: "this" }),
        React.createElement(exports.Input.Generic, { controller: c2, prop: "this", convert: function (v) { return JSON.parse(v); }, display: function (v) { return JSON.stringify(v); } }),
        React.createElement(exports.Input.LazyString, { controller: c2.controller('name'), prop: "this" }),
        React.createElement(exports.Input.LazyGeneric, { controller: c2.controller('age'), prop: "this", convert: function (value) { return parseInt(value); }, display: function (value) { return "" + value; } }),
        React.createElement(exports.Input.LazyString, { controller: c2, prop: "name" }),
        React.createElement(exports.Input.LazyNumber, { controller: c2, prop: "age" }),
        React.createElement(exports.Input.LazyGeneric, { controller: c2, prop: "age", convert: function (value) { return parseInt(value); }, display: function (value) { return "" + value; } }),
        React.createElement(exports.Input.TextArea, { controller: c2, prop: "name" }),
        React.createElement(exports.Input.Select, { controller: c2, prop: "name", options: ['John', 'Frank'] }),
        React.createElement(exports.Input.String, { controller: c2sub, prop: "subname" }),
        React.createElement(StringInputWrapper, { controller: c2sub, prop: "subname" }),
        "Should break",
        React.createElement(exports.Input.Select, { controller: c2, prop: "age", options: [{ key: 34, value: 34 }] })));
}
