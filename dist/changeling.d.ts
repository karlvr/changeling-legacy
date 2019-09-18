import { KEY, PROPERTY, INDEXPROPERTY } from './types';
/** Interface for component props */
export interface Snapshot<T> {
    readonly onChange: (value: T) => void;
    readonly value: T;
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
    addChangeListener(listener: ChangeListener<T>): void;
    removeChangeListener(listener: ChangeListener<T>): void;
}
export declare function withFuncs<T>(value: () => T, onChange: (newValue: T) => void): Controller<T>;
export declare function withMutable<T extends object>(value: T): Controller<T>;
export declare type ChangeListener<T> = (value: T) => void;
export declare class ChangelingImpl<T> implements Controller<T> {
    private locator;
    private onChanges;
    private getters;
    private setters;
    private changeListeners;
    constructor(locator: () => Snapshot<T>);
    snapshot(): Snapshot<T>;
    snapshot(index: number): Snapshot<INDEXPROPERTY<T>>;
    snapshot<K extends KEY<T>>(name?: K): Snapshot<PROPERTY<T, K>>;
    getter<K extends KEY<T>>(name: K, func: (value: PROPERTY<T, K>) => PROPERTY<T, K>): void;
    setter<K extends KEY<T>>(name: K, func: (value: PROPERTY<T, K>) => PROPERTY<T, K>): void;
    addChangeListener(listener: ChangeListener<T>): void;
    removeChangeListener(listener: ChangeListener<T>): void;
    controller(index: number): Controller<INDEXPROPERTY<T>>;
    controller<K extends KEY<T>>(name: K): Controller<PROPERTY<T, K>>;
    controller<K extends KEY<T>>(name: K, index: number): Controller<INDEXPROPERTY<PROPERTY<T, K>>>;
    private readonly value;
    private onChange;
    private propOnChange;
}
