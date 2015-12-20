import Declaration from 'esast/lib/Declaration'
import Program, {ImportDeclaration, ImportSpecifierAbstract, ImportSpecifier,
	ImportDefaultSpecifier, ImportNamespaceSpecifier, ExportAllDeclaration,
	ExportDefaultDeclaration, ExportNamedDeclaration, ExportSpecifier, Module, ModuleDeclaration,
	Script} from 'esast/lib/Program'
import Statement from 'esast/lib/Statement'
import Op, {opMap, orDefault, orThrow} from 'op/Op'
import fromDeclaration from './fromDeclaration'
import fromIdentifier from './fromIdentifier'
import {fromLiteralString} from './fromLiteral'
import {fromExpressionOrDeclaration} from './fromOr'
import fromStatement from './fromStatement'
import {badType, badValue, loc} from './util'

export default function fromProgram(_: any): Program {
	switch (_.sourceType) {
		case 'script':
			return loc(_, new Script(_.body.map(fromStatement)))
		// If it's unspecified, default to Module.
		case 'module': case undefined:
			return loc(_, new Module(_.body.map(fromStatementOrModuleDeclaration)))
		default:
			throw badValue(_, 'sourceType', '"script" | "module"')
	}
}

export function opFromModuleDeclaration(_: any): ModuleDeclaration {
	switch (_.type) {
		case 'ImportDeclaration':
			return loc(_, new ImportDeclaration(
				_.specifiers.map(fromImportSpecifierAbstract),
				fromLiteralString(_.source)))
		case 'ExportNamedDeclaration':
			return loc(_, new ExportNamedDeclaration(
				opMap(_.declaration, fromDeclaration),
				_.specifiers.map(fromExportSpecifier),
				opMap(_.source, fromLiteralString)))
		case 'ExportDefaultDeclaration':
			return loc(_, new ExportDefaultDeclaration(fromExpressionOrDeclaration(_.declaration)))
		case 'ExportAllDeclaration':
			return loc(_, new ExportAllDeclaration(fromLiteralString(_.source)))
		default:
			return null
	}
}

function fromStatementOrModuleDeclaration(_: any)
	: Statement | Declaration | ModuleDeclaration {
	return orDefault<Statement | Declaration | ModuleDeclaration>(
		opFromModuleDeclaration(_),
		() => fromStatement(_))
}

function fromImportSpecifierAbstract(_: any): ImportSpecifierAbstract {
	return orThrow(opFromImportSpecifierAbstract(_), () => badType(_, 'ImportSpecifierAbstract'))
}

export function opFromImportSpecifierAbstract(_: any): Op<ImportSpecifierAbstract> {
	switch (_.type) {
		case 'ImportSpecifier':
			return loc(_, new ImportSpecifier(fromIdentifier(_.imported), fromIdentifier(_.local)))
		case 'ImportDefaultSpecifier':
			return loc(_, new ImportDefaultSpecifier(fromIdentifier(_.local)))
		case 'ImportNamespaceSpecifier':
			return loc(_, new ImportNamespaceSpecifier(fromIdentifier(_.local)))
		default:
			return null
	}
}

export function fromExportSpecifier(_: any): ExportSpecifier {
	return loc(_, new ExportSpecifier(fromIdentifier(_.exported), fromIdentifier(_.local)))
}
