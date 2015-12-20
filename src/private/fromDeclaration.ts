import Declaration, {VariableDeclaration, VariableDeclarationConst, VariableDeclarationLet,
	VariableDeclarationVar, VariableDeclarator} from 'esast/lib/Declaration'
import Op, {opMap, orThrow} from 'op/Op'
import {fromClassDeclaration} from './fromClass'
import fromExpression from './fromExpression'
import {fromFunctionDeclaration} from './fromFunction'
import fromPattern from './fromPattern'
import {badType, badValue, loc} from './util'

export default function fromDeclaration(_: any): Declaration {
	return orThrow(opFromDeclaration(_), () => badType(_, 'Declaration'))
}

export function opFromDeclaration(_: any): Op<Declaration> {
	switch (_.type) {
		case 'ClassDeclaration':
			return fromClassDeclaration(_)
		case 'FunctionDeclaration':
			return fromFunctionDeclaration(_)
		case 'VariableDeclaration':
			return fromVariableDeclaration(_)
		default:
			return null
	}
}

export function fromVariableDeclaration(_: any): VariableDeclaration {
	const ctr = (() => {
		switch (_.kind) {
			case 'const':
				return VariableDeclarationConst
			case 'let':
				return VariableDeclarationLet
			case 'var':
				return VariableDeclarationVar
			default:
				throw badValue(_, 'kind', '"const" | "let" | "var"')
		}
	})()
	return loc(_, new ctr(_.declarations.map(fromVariableDeclarator)))
}

export function fromVariableDeclarator(_: any): VariableDeclarator {
	return loc(_, new VariableDeclarator(fromPattern(_.id), opMap(_.init, fromExpression)))
}
