import * as React from 'react';
import { Changeable, Changeling } from './changeling';
export declare function wrapComponent<R, P extends Changeable<R>>(Component: React.ComponentType<Changeable<R> & P>): <T, K extends { [P_1 in keyof T]: T[P_1] extends R ? P_1 : never; }[keyof T]>(props: Pick<P, Exclude<keyof P, "onChange" | "value">> & {
    changeling: Changeling<T>;
    name: K;
}) => JSX.Element;
