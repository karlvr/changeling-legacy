export declare type Subtract<T extends T1, T1 extends object> = Pick<T, Exclude<keyof T, keyof T1>>;
export declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
/** Returns the properties in T that are assignable to type R */
export declare type CompatibleKeys<T, R> = NonNullable<{
    [P in keyof T]: NonNullable<T[P]> extends R ? P : never;
}[keyof T]>;
export declare type FunctionKeys<T> = CompatibleKeys<T, Function>;
