import { Snapshot, Controller } from './changeling';
import { FunctionKeys } from './utilities';
import { KEY, PROPERTY } from './types';
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
export {};
