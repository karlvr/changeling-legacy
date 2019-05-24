/** Interface for component props */
export interface Changeable<T> {
    onChange: (value: T) => void;
    value: T;
}
/** Interface for component containing changeable props */
interface ChangeableComponent<T> {
    props: Changeable<T>;
}
export interface ChangeableState<T> {
    value: T;
}
/** Interface for component with the changeable value in the state */
interface ChangeableComponentWithState<T> {
    setState: (func: (state: ChangeableState<T>) => ChangeableState<T>) => void;
    state: ChangeableState<T>;
}
export interface Changeling<T> {
    prop<K extends keyof T>(name: K): Changeable<T[K]>;
}
export declare function forComponentProps<T>(component: ChangeableComponent<T>): Changeling<T>;
export declare function forComponentState<T>(component: ChangeableComponentWithState<T>): Changeling<T>;
export declare function forFuncs<T>(value: () => T, onChange: (newValue: T) => void): Changeling<T>;
export {};
