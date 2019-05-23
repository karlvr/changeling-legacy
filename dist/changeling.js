"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = require("immer");
function forComponentProps(component) {
    return new ChangelingImpl(function () { return component.props; });
}
exports.forComponentProps = forComponentProps;
function forComponentState(component) {
    return new ChangelingImpl(function () { return ({
        onChange: function (newValue) { return component.setState(immer_1.produce(function (draft) {
            draft.value = newValue;
        })); },
        value: component.state.value,
    }); });
}
exports.forComponentState = forComponentState;
function forFuncs(value, onChange) {
    return new ChangelingImpl(function () { return ({
        onChange: onChange,
        value: value(),
    }); });
}
exports.forFuncs = forFuncs;
var ChangelingImpl = /** @class */ (function () {
    function ChangelingImpl(locator) {
        this.onChanges = {};
        this.locator = locator;
    }
    ChangelingImpl.prototype.prop = function (name) {
        return {
            onChange: this.subOnChange(name),
            value: this.value()[name],
        };
    };
    ChangelingImpl.prototype.value = function () {
        return this.locator().value;
    };
    ChangelingImpl.prototype.onChange = function () {
        return this.locator().onChange;
    };
    ChangelingImpl.prototype.subOnChange = function (name) {
        var _this = this;
        var result = this.onChanges[name];
        if (result) {
            return result;
        }
        var func = function (subValue) {
            var value = _this.value();
            var newValue = immer_1.produce(value, function (draft) {
                draft[name] = subValue;
            });
            var onChange = _this.onChange();
            onChange(newValue);
        };
        this.onChanges[name] = func;
        return func;
    };
    return ChangelingImpl;
}());
