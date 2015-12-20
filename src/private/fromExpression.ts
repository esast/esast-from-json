import Expression, {ArrayExpression, AssignmentExpression, BinaryExpression, CallExpression,
	ConditionalExpression, LogicalExpression, MemberExpression, MemberExpressionComputed,
	MemberExpressionPlain, MetaProperty, NewExpression, SequenceExpression, SpreadElement,
	ThisExpression, UnaryExpression, UpdateExpression, YieldExpression, YieldDelegateExpression
	} from 'esast/lib/Expression'
import Op, {opMap, orThrow} from 'op/Op'
import {fromClassExpression} from './fromClass'
import {fromArrowFunctionExpression, fromFunctionExpression} from './fromFunction'
import fromIdentifier from './fromIdentifier'
import fromLiteral from './fromLiteral'
import fromObjectExpression from './fromObjectExpression'
import {fromExpressionOrSpreadElement, fromExpressionOrSuper, fromIdentifierOrMemberExpression,
	fromPatternOrMemberExpression} from './fromOr'
import fromTemplateLiteral, {fromTaggedTemplateExpression} from './fromTemplateLiteral'
import {badType, loc} from './util'

export default function fromExpression(_: any): Expression {
	return orThrow(opFromExpression(_), () => badType(_, 'Expression'))
}

export function opFromExpression(_: any): Op<Expression> {
	switch (_.type) {
		case 'ArrayExpression':
			return loc(_, new ArrayExpression(
				_.elements.map((_: any) => opMap(_, fromExpressionOrSpreadElement))))
		case 'ArrowFunctionExpression':
			return fromArrowFunctionExpression(_)
		case 'AssignmentExpression':
			return loc(_, new AssignmentExpression(
				_.operator,
				fromPatternOrMemberExpression(_.left),
				fromExpression(_.right)))
		case 'BinaryExpression':
			return loc(_, new BinaryExpression(
				_.operator,
				fromExpression(_.left),
				fromExpression(_.right)))
		case 'CallExpression':
			return loc(_, new CallExpression(
				fromExpressionOrSuper(_.callee),
				_.arguments.map(fromExpressionOrSpreadElement)))
		case 'ClassExpression':
			return fromClassExpression(_)
		case 'ConditionalExpression':
			return loc(_, new ConditionalExpression(
				fromExpression(_.test),
				fromExpression(_.consequent),
				fromExpression(_.alternate)))
		case 'FunctionExpression':
			return fromFunctionExpression(_)
		case 'Identifier':
			return fromIdentifier(_)
		case 'Literal':
			return fromLiteral(_)
		case 'LogicalExpression':
			return loc(_, new LogicalExpression(
				_.operator,
				fromExpression(_.left),
				fromExpression(_.right)))
		case 'MemberExpression':
			return fromMemberExpression(_)
		case 'MetaProperty':
			return loc(_, new MetaProperty(fromIdentifier(_.meta), fromIdentifier(_.property)))
		case 'NewExpression':
			return loc(_, new NewExpression(
				fromExpression(_.callee),
				_.arguments.map(fromExpressionOrSpreadElement)))
		case 'ObjectExpression':
			return fromObjectExpression(_)
		case 'SequenceExpression':
			return loc(_, new SequenceExpression(_.expressions.map(fromExpression)))
		case 'TaggedTemplateExpression':
			return fromTaggedTemplateExpression(_)
		case 'TemplateLiteral':
			return fromTemplateLiteral(_)
		case 'ThisExpression':
			return loc(_, new ThisExpression())
		case 'UnaryExpression':
			return loc(_, new UnaryExpression(_.operator, fromExpression(_.argument)))
		case 'UpdateExpression':
			return loc(_, new UpdateExpression(
				_.operator,
				fromIdentifierOrMemberExpression(_.argument),
				_.prefix))
		case 'YieldExpression':
			return loc(_, _.delegate ?
				new YieldDelegateExpression(fromExpression(_.argument)) :
				new YieldExpression(opMap(_.argument, fromExpression)))
		default:
			return null
	}
}

export function fromMemberExpression(_: any): MemberExpression {
	const object = fromExpressionOrSuper(_.object)
	return loc(_, _.computed ?
		new MemberExpressionComputed(object, fromExpression(_.property)) :
		new MemberExpressionPlain(object, fromIdentifier(_.property)))
}

export function fromSpreadElement(_: any): SpreadElement {
	return loc(_, new SpreadElement(fromExpression(_.argument)))
}
