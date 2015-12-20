import Expression, { MemberExpression, SpreadElement } from 'esast/lib/Expression';
import Op from 'op/Op';
export default function fromExpression(_: any): Expression;
export declare function opFromExpression(_: any): Op<Expression>;
export declare function fromMemberExpression(_: any): MemberExpression;
export declare function fromSpreadElement(_: any): SpreadElement;
