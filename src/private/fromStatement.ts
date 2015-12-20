import {BreakStatement, ContinueStatement, DoWhileStatement, ForStatement, ForInStatement,
	ForOfStatement, LabeledStatement, WhileStatement} from 'esast/lib/Loop'
import Statement, {BlockStatement, CatchClause, DebuggerStatement, EmptyStatement,
	ExpressionStatement, IfStatement, SwitchCase, SwitchStatement, ReturnStatement, ThrowStatement,
	TryStatement} from 'esast/lib/Statement'
import {opMap} from 'op/Op'
import fromDeclaration from './fromDeclaration'
import fromExpression from './fromExpression'
import fromIdentifier from './fromIdentifier'
import {fromExpressionOrVariableDeclaration, fromIdentifierOrVariableDeclaration} from './fromOr'
import fromPattern from './fromPattern'
import {loc} from './util'

export default function fromStatement(_: any): Statement {
	switch (_.type) {
		case 'BlockStatement':
			return loc(_, fromBlockStatement(_))
		case 'BreakStatement':
			return loc(_, new BreakStatement(opMap(_.label, fromIdentifier)))
		case 'ContinueStatement':
			return loc(_, new ContinueStatement(opMap(_.label, fromIdentifier)))
		case 'DebuggerStatement':
			return loc(_, new DebuggerStatement())
		case 'DoWhileStatement':
			return loc(_, new DoWhileStatement(fromStatement(_.body), fromExpression(_.test)))
		case 'EmptyStatement':
			return loc(_, new EmptyStatement())
		case 'ExpressionStatement':
			return loc(_, new ExpressionStatement(fromExpression(_.expression)))
		case 'ForStatement':
			return loc(_, new ForStatement(
				opMap(_.init, fromExpressionOrVariableDeclaration),
				opMap(_.test, fromExpression),
				opMap(_.update, fromExpression),
				fromStatement(_.body)))
		case 'ForInStatement':
			return loc(_, new ForInStatement(
				fromIdentifierOrVariableDeclaration(_.left),
				fromExpression(_.right),
				fromStatement(_.body)))
		case 'ForOfStatement':
			return loc(_, new ForOfStatement(
				fromIdentifierOrVariableDeclaration(_.left),
				fromExpression(_.right),
				fromStatement(_.body)))
		case 'IfStatement':
			return loc(_, new IfStatement(
				fromExpression(_.test),
				fromStatement(_.consequent),
				opMap(_.alternate, fromStatement)))
		case 'LabeledStatement':
			return loc(_, new LabeledStatement(fromIdentifier(_.label), fromStatement(_.body)))
		case 'ReturnStatement':
			return loc(_, new ReturnStatement(opMap(_.argument, fromExpression)))
		case 'SwitchStatement':
			return loc(_, new SwitchStatement(
				fromExpression(_.discriminant),
				_.cases.map(fromSwitchCase)))
		case 'ThrowStatement':
			return loc(_, new ThrowStatement(fromExpression(_.argument)))
		case 'TryStatement':
			return loc(_, new TryStatement(
				fromBlockStatement(_.block),
				opMap(_.handler, fromCatchClause),
				opMap(_.finalizer, fromBlockStatement)))
		case 'WhileStatement':
			return loc(_, new WhileStatement(fromExpression(_.test), fromStatement(_.body)))
		default:
			return fromDeclaration(_)
	}
}

export function fromBlockStatement(_: any): BlockStatement {
	return loc(_, new BlockStatement(_.body.map(fromStatement)))
}

export function fromCatchClause(_: any): CatchClause {
	return loc(_, new CatchClause(fromPattern(_.param), fromBlockStatement(_.body)))
}

export function fromSwitchCase(_: any): SwitchCase {
	return loc(_, new SwitchCase(
		opMap(_.test, fromExpression),
		_.consequent.map(fromStatement)))
}
