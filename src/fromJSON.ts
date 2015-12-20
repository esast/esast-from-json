import Node from 'esast/lib/Node'
import Op, {nonNull} from 'op/Op'
import {fromClassBody, fromMethodDefinition, fromSuper} from './private/fromClass'
import {fromVariableDeclarator} from './private/fromDeclaration'
import {fromSpreadElement, opFromExpression} from './private/fromExpression'
import {fromAssignmentProperty, opFromPattern} from './private/fromPattern'
import fromProgram, {fromExportSpecifier, opFromImportSpecifierAbstract, opFromModuleDeclaration
	} from './private/fromProgram'
import fromStatement, {fromSwitchCase} from './private/fromStatement'

/** Converts a plain object to a [[Node]]. */
export default function fromJson(_: any): Node {
	switch (_.type) {
		case 'Program':
			return fromProgram(_)
		case 'VariableDeclarator':
			return fromVariableDeclarator(_)
		case 'SwitchCase':
			return fromSwitchCase(_)
		case 'AssignmentProperty':
			return fromAssignmentProperty(_)
		case 'MethodDefinition':
			return fromMethodDefinition(_)
		case 'ClassBody':
			return fromClassBody(_)
		case 'ExportSpecifier':
			return fromExportSpecifier(_)
		case 'SpreadElement':
			return fromSpreadElement(_)
		case 'Super':
			return fromSuper(_)
		default:
			let ast: Op<Node> = opFromPattern(_)
			if (nonNull(ast))
				return ast
			ast = opFromImportSpecifierAbstract(_)
			if (nonNull(ast))
				return ast
			ast = opFromModuleDeclaration(_)
			if (nonNull(ast))
				return ast
			ast = opFromExpression(_)
			if (nonNull(ast))
				return ast
			return fromStatement(_)
	}
}
