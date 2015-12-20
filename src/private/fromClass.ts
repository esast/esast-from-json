import {ClassBody, ClassDeclaration, ClassExpression, MethodDefinition, MethodDefinitionConstructor,
	MethodDefinitionGet, MethodDefinitionPlain, MethodDefinitionSet, Super} from 'esast/lib/Class'
import {opMap} from 'op/Op'
import fromExpression from './fromExpression'
import {fromFunctionExpression} from './fromFunction'
import fromIdentifier from './fromIdentifier'
import {fromPropertyName} from './fromObjectExpression'
import {badValue, loc} from './util'

export function fromClassDeclaration(_: any): ClassDeclaration {
	return loc(_, new ClassDeclaration(
		fromIdentifier(_.id),
		opMap(_.superClass, fromExpression),
		fromClassBody(_.body)))
}

export function fromClassExpression(_: any): ClassExpression {
	return loc(_, new ClassExpression(
		opMap(_.id, fromIdentifier),
		opMap(_.superClass, fromExpression),
		fromClassBody(_.body)))
}

export function fromClassBody(_: any): ClassBody {
	return loc(_, new ClassBody(_.body.map(fromMethodDefinition)))
}

export function fromMethodDefinition(_: any): MethodDefinition {
	return loc(_, ((): MethodDefinition => {
		const func = fromFunctionExpression(_.value)
		if (_.kind === 'constructor')
			return new MethodDefinitionConstructor(func)
		else {
			const name = fromPropertyName(_.key, _.computed)
			const ctr = (() => {
				switch (_.kind) {
					case 'method':
						return MethodDefinitionPlain
					case 'get':
						return MethodDefinitionGet
					case 'set':
						return MethodDefinitionSet
					default:
						throw badValue(_, 'kind', '"constructor" | "method" | "get" | "set"')
				}
			})()
			return new ctr(name, func, {static: _.static})
		}
	})())
}

export function fromSuper(_: any): Super {
	return loc(_, new Super())
}
