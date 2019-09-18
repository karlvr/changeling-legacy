"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = require("immer");
function withFuncs(value, onChange) {
    return new ChangelingImpl(function () { return ({
        onChange: onChange,
        value: value(),
    }); });
}
exports.withFuncs = withFuncs;
function withMutable(value) {
    return new ChangelingImpl(function () { return ({
        onChange: function (newValue) {
            for (var i in value) {
                if (value.hasOwnProperty(i)) {
                    delete value[i];
                }
            }
            for (var i in newValue) {
                if (newValue.hasOwnProperty(i)) {
                    value[i] = newValue[i];
                }
            }
        },
        value: value,
    }); });
}
exports.withMutable = withMutable;
var ChangelingImpl = /** @class */ (function () {
    function ChangelingImpl(locator) {
        this.onChanges = {};
        this.getters = {};
        this.setters = {};
        this.changeListeners = [];
        this.locator = locator;
    }
    ChangelingImpl.prototype.snapshot = function (nameOrIndex, index) {
        var _this = this;
        if (typeof nameOrIndex === 'number') {
            var onChange = function (newValue) {
                var parentNewValue = immer_1.produce(_this.value, function (draft) {
                    draft[nameOrIndex] = newValue;
                });
                _this.onChange(parentNewValue);
            };
            var value = this.value !== undefined ? this.value[nameOrIndex] : undefined;
            return {
                onChange: onChange,
                value: value,
            };
        }
        else if (nameOrIndex !== undefined && index !== undefined) {
            return this.controller(nameOrIndex).snapshot(index);
        }
        else if (nameOrIndex !== undefined) {
            var onChange = this.propOnChange(nameOrIndex);
            var value = this.value !== undefined ? this.value[nameOrIndex] : undefined;
            var getter = this.getters[nameOrIndex];
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
    ChangelingImpl.prototype.addChangeListener = function (listener) {
        this.changeListeners.push(listener);
    };
    ChangelingImpl.prototype.removeChangeListener = function (listener) {
        var index = this.changeListeners.indexOf(listener);
        if (index !== -1) {
            this.changeListeners.splice(index, 1);
        }
    };
    ChangelingImpl.prototype.controller = function (nameOrIndex, index) {
        var _this = this;
        if (typeof nameOrIndex === 'number') {
            return new ChangelingImpl(function () { return _this.snapshot(nameOrIndex); });
        }
        else if (index !== undefined) {
            return this.controller(nameOrIndex).controller(index);
        }
        else {
            return new ChangelingImpl(function () { return _this.snapshot(nameOrIndex); });
        }
    };
    Object.defineProperty(ChangelingImpl.prototype, "value", {
        get: function () {
            return this.locator().value;
        },
        enumerable: true,
        configurable: true
    });
    ChangelingImpl.prototype.onChange = function (value) {
        this.locator().onChange(value);
        for (var _i = 0, _a = this.changeListeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(value);
        }
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
exports.ChangelingImpl = ChangelingImpl;
