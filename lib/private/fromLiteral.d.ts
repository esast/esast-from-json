import Literal, { LiteralNumber, LiteralString } from 'esast/lib/Literal';
export default function fromLiteral(_: any): Literal;
export declare function fromLiteralNumberOrString(_: any): LiteralNumber | LiteralString;
export declare function fromLiteralString(_: any): LiteralString;
