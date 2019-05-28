import * as React from 'react';
import { Snapshot, Controller } from './changeling';
import { Omit } from './utilities';
import { KEY, KEYABLE, ANDTHIS, PROPERTYORTHIS, KEYORTHIS, INDEXPROPERTY } from './types';
/**
 * Fake interface for React.InputHTMLAttributes<HTMLInputElement> that defines all of the properties that we exclude using Omit etc.
 * Because if we use React.InputHTMLAttributes<HTMLInputElement> TypeScript includes all of the known properties in the output declaration
 * file as it collapses the successive Omit types that we apply. This causes a problem when a consuming project uses an older version of React.
 *
 * So we use a script (`fix-types.js`) to look for the sentinel properties, and then to see which of the expected containing properties
 * are missing, and to reconstruct the appropriate type signature.
 *
 * If any exclusions are added in this class they must be added here.
 */
export declare function wrapComponent<R, P extends Snapshot<R>>(Component: React.ComponentType<Snapshot<R> & P>): <T, K extends NonNullable<{ [P_1 in keyof ANDTHIS<T>]: NonNullable<ANDTHIS<T>[P_1]> extends R ? P_1 : never; }[keyof T | "this"]>>(props: Pick<P, Exclude<keyof P, "onChange" | "value">> & {
    controller: Controller<T>;
    prop: K;
}) => JSX.Element;
interface WrapComponentConvertType<T, K extends KEY<T> | 'this', R> {
    controller: Controller<T>;
    prop: K;
    convert: (value: R) => PROPERTYORTHIS<T, K>;
    display?: (value: PROPERTYORTHIS<T, K> | undefined) => R;
}
/**
 * Convert a component that accepts values of type R to a component that accepts values of type S.
 * @param Component A component that accepts a Snapshot<R>
 * @param convert A function to convert from R to S
 * @param display A function to convert from S to R
 */
export declare function convertComponent<R, S, P extends Snapshot<R>>(Component: React.ComponentType<Snapshot<R> & P>, convert: (value: R) => S, display?: (value: S | undefined) => R): (props: Pick<P, Exclude<keyof P, "onChange" | "value">> & Snapshot<S>) => JSX.Element;
interface BaseInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>, Snapshot<T> {
    convert?: (value: string) => T;
}
interface CheckableInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'value'>, Snapshot<T> {
    checkedValue: T;
    uncheckedValue?: T;
}
interface LazyBaseInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'defaultValue' | 'onBlur' | 'convert' | 'display'>, Snapshot<T> {
    convert?: (value: string) => T | undefined;
    display?: (value: T | undefined) => string;
}
interface BaseTextAreaProps<T> extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>, Snapshot<T> {
    convert?: (value: string) => T;
}
export declare type OptionType<C> = string | number | OptionTypeObject<C>;
export interface OptionTypeObject<C> {
    /** The label for this option */
    label?: string;
    /** The text to show for this option */
    text?: string;
    /** The value of this option in your model */
    value: C | undefined;
}
interface ControllerProps<T, K extends KEYORTHIS<T>> {
    controller: Controller<T>;
    prop: K;
}
interface SelectWrapperProps<T, K extends KEYORTHIS<T>, O extends OptionType<PROPERTYORTHIS<T, K>>> extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value' | 'multiple'>, ControllerProps<T, K> {
    options?: O[];
}
declare class SelectWrapper<T, K extends KEYORTHIS<T>, O extends OptionType<PROPERTYORTHIS<T, K>>> extends React.Component<SelectWrapperProps<T, K, O>> {
    render(): JSX.Element;
}
export interface IndexedCursor {
    index: number;
    first: boolean;
    last: boolean;
}
export declare type IndexedOnPush<V> = (value: V) => void;
export declare type IndexedOnInsert<V> = (index: number, value: V) => void;
export declare type IndexedOnRemove<V> = (index: number) => void;
export interface IndexedActions<V> {
    onPush: IndexedOnPush<V>;
    onInsert: IndexedOnInsert<V>;
    onRemove: IndexedOnRemove<V>;
}
interface IndexedProps<T, K extends KEYORTHIS<T>> extends ControllerProps<T, K> {
    renderEach?: (controller: Controller<INDEXPROPERTY<PROPERTYORTHIS<T, K>>>, cursor: IndexedCursor, actions: IndexedActions<INDEXPROPERTY<PROPERTYORTHIS<T, K>>>) => JSX.Element;
    renderBefore?: (actions: IndexedActions<INDEXPROPERTY<PROPERTYORTHIS<T, K>>>) => JSX.Element;
    renderAfter?: (actions: IndexedActions<INDEXPROPERTY<PROPERTYORTHIS<T, K>>>) => JSX.Element;
}
declare class Indexed<T, K extends KEYORTHIS<T>> extends React.Component<IndexedProps<T, K>> {
    render(): JSX.Element;
}
export declare const Input: {
    Checkable: <T, K extends NonNullable<{ [P in keyof ANDTHIS<T>]: NonNullable<ANDTHIS<T>[P]> extends {} ? P : never; }["this" | keyof T]>>(props: Pick<CheckableInputProps<{}>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "checked" | "onChange"> | "checkedValue" | "uncheckedValue"> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    Generic: <T, K extends "this" | keyof KEYABLE<T>>(props: Pick<Pick<BaseInputProps<string>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">> & WrapComponentConvertType<T, K, string>) => JSX.Element;
    String: <T, K extends NonNullable<{ [P in keyof ANDTHIS<T>]: NonNullable<ANDTHIS<T>[P]> extends string ? P : never; }["this" | keyof T]>>(props: Pick<Pick<BaseInputProps<string>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    Number: <T, K extends NonNullable<{ [P in keyof ANDTHIS<T>]: NonNullable<ANDTHIS<T>[P]> extends number ? P : never; }["this" | keyof T]>>(props: Pick<Pick<Pick<BaseInputProps<string>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">> & Snapshot<number>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    LazyGeneric: <T, K extends "this" | keyof KEYABLE<T>>(props: Pick<Pick<LazyBaseInputProps<string>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">> & WrapComponentConvertType<T, K, string>) => JSX.Element;
    LazyString: <T, K extends NonNullable<{ [P in keyof ANDTHIS<T>]: NonNullable<ANDTHIS<T>[P]> extends string ? P : never; }["this" | keyof T]>>(props: Pick<Pick<LazyBaseInputProps<string>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    LazyNumber: <T, K extends NonNullable<{ [P in keyof ANDTHIS<T>]: NonNullable<ANDTHIS<T>[P]> extends number ? P : never; }["this" | keyof T]>>(props: Pick<Pick<Pick<LazyBaseInputProps<string>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">> & Snapshot<number>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    TextArea: <T, K extends NonNullable<{ [P in keyof ANDTHIS<T>]: NonNullable<ANDTHIS<T>[P]> extends string ? P : never; }["this" | keyof T]>>(props: Pick<Pick<BaseTextAreaProps<string>, "onChange" | "value" | Exclude<keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">>, Exclude<keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    TextAreaGeneric: <T, K extends "this" | keyof KEYABLE<T>>(props: Pick<Pick<BaseTextAreaProps<string>, "onChange" | "value" | Exclude<keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">>, Exclude<keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">> & WrapComponentConvertType<T, K, string>) => JSX.Element;
    Select: typeof SelectWrapper;
    Indexed: typeof Indexed;
};
export {};
