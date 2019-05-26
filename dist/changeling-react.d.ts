import * as React from 'react';
import { Snapshot, Controller } from './changeling';
import { Omit } from './utilities';
import { KEY, PROPERTY, KEYABLE } from './types';
export declare function wrapComponent<R, P extends Snapshot<R>>(Component: React.ComponentType<Snapshot<R> & P>): <T, K extends NonNullable<{ [P_1 in keyof KEYABLE<T>]: NonNullable<KEYABLE<T>[P_1]> extends R ? P_1 : never; }[keyof KEYABLE<T>]>>(props: Pick<P, Exclude<keyof P, "onChange" | "value">> & {
    controller: Controller<T>;
    prop: K;
}) => JSX.Element;
interface InputProps<T, K extends KEY<T>> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    controller: Controller<T>;
    convert?: (value: string) => PROPERTY<T, K>;
    prop: K;
}
export declare class Input<T, K extends KEY<T>> extends React.Component<InputProps<T, K>> {
    render(): JSX.Element;
    private onChange;
    private convertValue;
}
interface LazyInputProps<T, K extends KEY<T>> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onBlur'> {
    controller: Controller<T>;
    convert?: (value: string) => PROPERTY<T, K> | undefined;
    prop: K;
    display?: (value: PROPERTY<T, K>) => string;
}
export declare class LazyInput<T, K extends KEY<T>> extends React.Component<LazyInputProps<T, K>> {
    render(): JSX.Element;
    private onBlur;
    private displayValue;
    private convertValue;
}
interface CheckableInputProps<T, K extends KEY<T>> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange' | 'value'> {
    controller: Controller<T>;
    prop: K;
    value?: KEYABLE<T>[K];
}
export declare class CheckableInput<T, K extends KEY<T>> extends React.Component<CheckableInputProps<T, K>> {
    render(): JSX.Element;
    private onChange;
}
interface TextAreaProps<T, K extends KEY<T>> extends Omit<React.InputHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'> {
    controller: Controller<T>;
    convert?: (value: string) => PROPERTY<T, K>;
    prop: K;
}
export declare class TextArea<T, K extends KEY<T>> extends React.Component<TextAreaProps<T, K>> {
    render(): JSX.Element;
    private onChange;
    private convertValue;
}
export {};
