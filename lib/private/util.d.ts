import Node from 'esast/lib/Node';
export declare function loc<A extends Node>(object: any, ast: A): A;
export declare function badType(_: any, expectedDesc: string): Error;
export declare function badValue(_: any, property: string, type: string): Error;
