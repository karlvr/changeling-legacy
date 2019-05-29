import { CompatibleKeys } from "./utilities";
/**
 * Transform a type into one that can be used with keyof.
 * If a type is a union type with undefined or null it can't be keyed as they can't be keyed.
 */
export declare type KEYABLE<T> = T extends object ? T : never;
export declare type KEY<T> = keyof KEYABLE<T>;
export declare type PROPERTY<T, K extends KEY<T>> = KEYABLE<T>[K];
export declare type KEYORTHIS<T> = KEY<T> | 'this';
/** Like PROPERTY<T, K> but includes support for the magic `this` property that refers to the type T itself */
export declare type PROPERTYORTHIS<T, K extends KEY<T> | 'this'> = K extends 'this' ? T : PROPERTY<T, Exclude<K, 'this'>>;
/** Returns the component type of an indexed type, or never if the type isn't indexable */
export declare type INDEXPROPERTY<T> = T extends (infer R)[] ? R : never;
declare type COMPATIBLETHIS<T, R> = T extends R ? 'this' : never;
/** Returns the keys of T that are compatible with R, and 'this' if T itself is compatible with R */
export declare type COMPATIBLEKEYS<T, R> = CompatibleKeys<KEYABLE<T>, R> | COMPATIBLETHIS<T, R>;
export {};
