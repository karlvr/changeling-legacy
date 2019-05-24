import * as React from 'react';
import { Changeable, Changeling } from './changeling';
export declare function wrapComponent<R, P extends Changeable<R>>(Component: React.ComponentType<Changeable<R> & P>): <T, K extends { [P_1 in keyof T]: T[P_1] extends R ? P_1 : never; }[keyof T]>(props: Pick<P, Exclude<keyof P, "onChange" | "value">> & {
    changeling: Changeling<T>;
    name: K;
}) => JSX.Element;
declare type ElementAttributes = React.InputHTMLAttributes<HTMLInputElement>;
interface ChangelingInputProps<T, K extends keyof T> extends ElementAttributes {
    changeling: Changeling<T>;
    changelingProperty: K;
}
export declare class ChangelingInput<T, K extends keyof T> extends React.Component<ChangelingInputProps<T, K>> {
    render(): JSX.Element;
    private onChange;
    private convertValue;
}
export {};
