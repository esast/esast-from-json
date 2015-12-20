import {Super} from 'esast/lib/Class'
import Declaration, {VariableDeclaration} from 'esast/lib/Declaration'
import Expression, {MemberExpression, SpreadElement} from 'esast/lib/Expression'
import Identifier from 'esast/lib/Identifier'
import Pattern from 'esast/lib/Pattern'
import {BlockStatement} from 'esast/lib/Statement'
import {orDefault} from 'op/Op'
import {fromSuper} from './fromClass'
import {fromVariableDeclaration, opFromDeclaration} from './fromDeclaration'
import fromExpression, {fromMemberExpression, fromSpreadElement} from './fromExpression'
import fromIdentifier from './fromIdentifier'
import fromPattern from './fromPattern'
import {fromBlockStatement} from './fromStatement'
import {badType} from './util'

export function fromExpressionOrDeclaration(_: any): Expression | Declaration {
	return orDefault<Expression | Declaration>(opFromDeclaration(_), () => fromExpression(_))
}

export function fromBlockStatementOrExpression(_: any): BlockStatement | Expression {
	return _.type === 'BlockStatement' ? fromBlockStatement(_) : fromExpression(_)
}

export function fromExpressionOrSuper(_: any): Expression | Super {
	return _.type === 'Super' ? fromSuper(_) : fromExpression(_)
}

export function fromExpressionOrSpreadElement(_: any): Expression | SpreadElement {
	return _.type === 'SpreadElement' ? fromSpreadElement(_) : fromExpression(_)
}

export function fromIdentifierOrVariableDeclaration(_: any): Identifier | VariableDeclaration {
	switch (_.type) {
		case 'Identifier':
			return fromIdentifier(_)
		case 'VariableDeclaration':
			return fromVariableDeclaration(_)
		default:
			throw badType(_, 'Identifier or VariableDeclaration')
	}
}

export function fromIdentifierOrMemberExpression(_: any): Identifier | MemberExpression {
	switch (_.type) {
		case 'Identifier':
			return fromIdentifier(_)
		case 'MemberExpression':
			return fromMemberExpression(_)
		default:
			throw badType(_, 'Identifier or MemberExpression')
	}
}

export function fromPatternOrMemberExpression(_: any): Pattern | MemberExpression {
	return _.type === 'MemberExpression' ? fromMemberExpression(_) : fromPattern(_)
}

export function fromExpressionOrVariableDeclaration(_: any): Expression | VariableDeclaration {
	return _.type === 'VariableDeclaration' ? fromVariableDeclaration(_) : fromExpression(_)
}
