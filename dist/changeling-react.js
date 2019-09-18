"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var changeling_1 = require("./changeling");
var immer_1 = require("immer");
function forComponentProps(component, valueProperty, onChangeProperty) {
    if (onChangeProperty === undefined || valueProperty === undefined) {
        return new changeling_1.ChangelingImpl(function () { return component.props; });
    }
    else {
        return new changeling_1.ChangelingImpl(function () { return ({
            onChange: function (newValue) { return component.props[onChangeProperty](newValue); },
            value: component.props[valueProperty],
        }); });
    }
}
exports.forComponentProps = forComponentProps;
function forComponentState(component, property) {
    if (property === undefined) {
        return new changeling_1.ChangelingImpl(function () { return ({
            onChange: function (newValue) { return component.setState(function () { return newValue; }); },
            value: component.state,
        }); });
    }
    else {
        return new changeling_1.ChangelingImpl(function () { return ({
            onChange: function (newValue) { return component.setState(immer_1.produce(function (draft) {
                draft[property] = newValue;
            })); },
            value: component.state[property],
        }); });
    }
}
exports.forComponentState = forComponentState;
