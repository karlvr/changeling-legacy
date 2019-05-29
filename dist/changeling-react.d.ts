import * as React from 'react';
import { Snapshot, Controller } from './changeling';
import { Omit } from './utilities';
import { PROPERTYORTHIS, KEYORTHIS, INDEXPROPERTY, COMPATIBLEKEYS } from './types';
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
export declare function wrapComponent<R, P extends Snapshot<R>>(Component: React.ComponentType<Snapshot<R> & P>): <T, K extends COMPATIBLEKEYS<T, R>>(props: Pick<P, Exclude<keyof P, "onChange" | "value">> & {
    controller: Controller<T>;
    prop: K;
}) => JSX.Element;
interface BaseInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'convert'>, Snapshot<T> {
    convert: (value: string) => T;
    display: (value: T) => string;
}
interface BaseInputWrapperProps<T, K extends KEYORTHIS<T>, V> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'convert'>, ControllerProps<T, K> {
    convert: (value: string) => V;
    display: (value: V) => string;
}
declare class BaseInputWrapper<T, K extends KEYORTHIS<T>, V extends PROPERTYORTHIS<T, K>> extends React.Component<BaseInputWrapperProps<T, K, V>> {
    render(): JSX.Element;
}
interface CheckableInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'value'>, Snapshot<T> {
    checkedValue: T;
    uncheckedValue?: T;
}
interface LazyBaseInputProps<T> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'defaultValue' | 'onBlur' | 'convert' | 'display'>, Snapshot<T> {
    convert: (value: string) => T;
    display: (value: T) => string;
}
interface LazyBaseInputWrapperProps<T, K extends KEYORTHIS<T>, V> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'defaultValue' | 'onBlur' | 'convert' | 'display'>, ControllerProps<T, K> {
    convert: (value: string) => V;
    display: (value: V) => string;
}
declare class LazyBaseInputWrapper<T, K extends KEYORTHIS<T>, V extends PROPERTYORTHIS<T, K>> extends React.Component<LazyBaseInputWrapperProps<T, K, V>> {
    render(): JSX.Element;
}
interface BaseTextAreaProps<T> extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange' | 'convert'>, Snapshot<T> {
    convert: (value: string) => T;
    display: (value: T) => string;
}
interface BaseTextAreaWrapperProps<T, K extends KEYORTHIS<T>, V> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'convert'>, ControllerProps<T, K> {
    convert: (value: string) => V;
    display: (value: V) => string;
}
declare class BaseTextAreaWrapper<T, K extends KEYORTHIS<T>, V extends PROPERTYORTHIS<T, K>> extends React.Component<BaseTextAreaWrapperProps<T, K, V>> {
    render(): JSX.Element;
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
    Checkable: <T, K extends COMPATIBLEKEYS<T, {}>>(props: Pick<CheckableInputProps<{}>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "checked" | "onChange"> | "checkedValue" | "uncheckedValue"> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    Generic: typeof BaseInputWrapper;
    String: <T, K extends COMPATIBLEKEYS<T, string | undefined>>(props: Pick<Pick<BaseInputProps<string | undefined>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    Number: <T, K extends COMPATIBLEKEYS<T, number | undefined>>(props: Pick<Pick<BaseInputProps<number | undefined>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    LazyGeneric: typeof LazyBaseInputWrapper;
    LazyString: <T, K extends COMPATIBLEKEYS<T, string | undefined>>(props: Pick<Pick<LazyBaseInputProps<string | undefined>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    LazyNumber: <T, K extends COMPATIBLEKEYS<T, number | undefined>>(props: Pick<Pick<LazyBaseInputProps<number | undefined>, "onChange" | "value" | Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">>, Exclude<keyof React.InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onBlur">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    TextArea: <T, K extends COMPATIBLEKEYS<T, string | undefined>>(props: Pick<Pick<BaseTextAreaProps<string | undefined>, "onChange" | "value" | Exclude<keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">>, Exclude<keyof React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">> & {
        controller: Controller<T>;
        prop: K;
    }) => JSX.Element;
    TextAreaGeneric: typeof BaseTextAreaWrapper;
    Select: typeof SelectWrapper;
    Indexed: typeof Indexed;
};
export {};
