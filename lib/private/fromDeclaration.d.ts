import Declaration, { VariableDeclaration, VariableDeclarator } from 'esast/lib/Declaration';
import Op from 'op/Op';
export default function fromDeclaration(_: any): Declaration;
export declare function opFromDeclaration(_: any): Op<Declaration>;
export declare function fromVariableDeclaration(_: any): VariableDeclaration;
export declare function fromVariableDeclarator(_: any): VariableDeclarator;
