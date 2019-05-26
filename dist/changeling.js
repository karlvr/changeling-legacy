"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = require("immer");
function forComponentProps(component, valueProperty, onChangeProperty) {
    if (onChangeProperty === undefined || valueProperty === undefined) {
        return new ChangelingImpl(function () { return component.props; });
    }
    else {
        return new ChangelingImpl(function () { return ({
            onChange: function (newValue) { return component.props[onChangeProperty](newValue); },
            value: component.props[valueProperty],
        }); });
    }
}
exports.forComponentProps = forComponentProps;
function forComponentState(component, property) {
    if (property === undefined) {
        return new ChangelingImpl(function () { return ({
            onChange: function (newValue) { return component.setState(function () { return newValue; }); },
            value: component.state,
        }); });
    }
    else {
        return new ChangelingImpl(function () { return ({
            onChange: function (newValue) { return component.setState(immer_1.produce(function (draft) {
                draft[property] = newValue;
            })); },
            value: component.state[property],
        }); });
    }
}
exports.forComponentState = forComponentState;
function withFuncs(value, onChange) {
    return new ChangelingImpl(function () { return ({
        onChange: onChange,
        value: value(),
    }); });
}
exports.withFuncs = withFuncs;
var ChangelingImpl = /** @class */ (function () {
    function ChangelingImpl(locator) {
        this.onChanges = {};
        this.getters = {};
        this.setters = {};
        this.locator = locator;
    }
    ChangelingImpl.prototype.snapshot = function (name) {
        var _this = this;
        if (name !== undefined) {
            var onChange = this.propOnChange(name);
            var value = this.value !== undefined ? this.value[name] : undefined;
            var getter = this.getters[name];
            if (getter) {
                value = getter(value);
            }
            return {
                onChange: onChange,
                value: value,
            };
        }
        else {
            return {
                onChange: function (newValue) { return _this.onChange(newValue); },
                value: this.value,
            };
        }
    };
    ChangelingImpl.prototype.getter = function (name, func) {
        this.getters[name] = func;
    };
    ChangelingImpl.prototype.setter = function (name, func) {
        this.setters[name] = func;
        delete this.onChanges[name];
    };
    ChangelingImpl.prototype.controller = function (name) {
        var _this = this;
        return new ChangelingImpl(function () { return _this.snapshot(name); });
    };
    Object.defineProperty(ChangelingImpl.prototype, "value", {
        get: function () {
            return this.locator().value;
        },
        enumerable: true,
        configurable: true
    });
    ChangelingImpl.prototype.onChange = function (value) {
        return this.locator().onChange(value);
    };
    ChangelingImpl.prototype.propOnChange = function (name) {
        var _this = this;
        var PROPERTY = this.onChanges[name];
        if (PROPERTY) {
            return PROPERTY;
        }
        var func = function (subValue) {
            var _a;
            var value = _this.value;
            var newValue = value !== undefined ?
                immer_1.produce(value, function (draft) {
                    draft[name] = subValue;
                })
                : (_a = {},
                    _a[name] = subValue,
                    _a);
            _this.onChange(newValue);
        };
        var setter = this.setters[name];
        if (setter) {
            var existingNewFunc_1 = func;
            var newFunc = function (subValue) {
                var subValue2 = setter(subValue);
                existingNewFunc_1(subValue2);
            };
            func = newFunc;
        }
        this.onChanges[name] = func;
        return func;
    };
    return ChangelingImpl;
}());
