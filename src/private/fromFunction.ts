import {ArrowFunctionExpression, FunctionDeclaration, FunctionExpression} from 'esast/lib/Function'
import {opMap} from 'op/Op'
import fromIdentifier from './fromIdentifier'
import {fromBlockStatementOrExpression} from './fromOr'
import fromPattern from './fromPattern'
import {fromBlockStatement} from './fromStatement'
import {loc} from './util'

export function fromArrowFunctionExpression(_: any): ArrowFunctionExpression {
	return loc(_, new ArrowFunctionExpression(
		_.params.map(fromPattern),
		fromBlockStatementOrExpression(_.body)))
}

export function fromFunctionDeclaration(_: any): FunctionDeclaration {
	return loc(_, new FunctionDeclaration(
		fromIdentifier(_.id),
		_.params.map(fromPattern),
		fromBlockStatement(_.body),
		{generator: _.generator, async: _.async}))
}

export function fromFunctionExpression(_: any): FunctionExpression {
	return loc(_, new FunctionExpression(
		opMap(_.id, fromIdentifier),
		_.params.map(fromPattern),
		fromBlockStatement(_.body),
		{generator: _.generator, async: _.async}))
}
