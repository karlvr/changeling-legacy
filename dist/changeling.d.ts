import { KEY, PROPERTY, INDEXPROPERTY } from './types';
import { FunctionKeys } from './utilities';
/** Interface for component props */
export interface Snapshot<T> {
    readonly onChange: (value: T) => void;
    readonly value: T;
}
/** Interface for component containing changeable props */
interface ChangeableComponentWithProps<T> {
    props: Snapshot<T>;
}
interface ChangeableComponentWithPropsGeneral<T> {
    props: T;
}
/** Interface for component with the changeable value in the state */
interface ChangeableComponentWithState<T> {
    setState: (func: (state: T) => any) => void;
    state: T;
}
export interface Controller<T> {
    controller(index: number): Controller<INDEXPROPERTY<T>>;
    controller<K extends KEY<T>>(name: K): Controller<PROPERTY<T, K>>;
    controller<K extends KEY<T>>(name: K, index: number): Controller<INDEXPROPERTY<PROPERTY<T, K>>>;
    snapshot(): Snapshot<T>;
    snapshot(index: number): Snapshot<INDEXPROPERTY<T>>;
    snapshot<K extends KEY<T>>(name: K): Snapshot<PROPERTY<T, K>>;
    snapshot<K extends KEY<T>>(name: K, index: number): Snapshot<INDEXPROPERTY<PROPERTY<T, K>>>;
    getter<K extends KEY<T>>(name: K, func: (value: PROPERTY<T, K>) => PROPERTY<T, K>): void;
    setter<K extends KEY<T>>(name: K, func: (value: PROPERTY<T, K>) => PROPERTY<T, K>): void;
}
/**
 * Create a Changeling for a React component's props containing a `value` and `onChange` prop like `Changeable`.
 * @param component A React component
 */
export declare function forComponentProps<T>(component: ChangeableComponentWithProps<T>): Controller<T>;
/**
 * Create a Changeling for a named property in a React component's state. You must provide the name of the
 * property containing the value and the property containing the change handling function.
 * @param component A React component
 * @param valueProperty The name of the property containing the `value`.
 * @param onChangeProperty The name of the property containing the `onChange` function.
 */
export declare function forComponentProps<T, K extends KEY<T>, L extends FunctionKeys<T>>(component: ChangeableComponentWithPropsGeneral<T>, valueProperty: K, onChangeProperty: L): Controller<PROPERTY<T, K>>;
/**
 * Create a Changeling for a React component's state.
 * @param component A React component
 */
export declare function forComponentState<T>(component: ChangeableComponentWithState<T>): Controller<T>;
/**
 * Create a Changeling for a named property in a React component's state.
 * @param component A React component
 * @param property A property name within the component's state
 */
export declare function forComponentState<T, K extends KEY<T>>(component: ChangeableComponentWithState<T>, property: K): Controller<PROPERTY<T, K>>;
export declare function withFuncs<T>(value: () => T, onChange: (newValue: T) => void): Controller<T>;
export declare function withMutable<T extends object>(value: T): Controller<T>;
export {};
