import ObjectExpression, {ComputedName, Property, PropertyGet, PropertyMethod, PropertyName,
	PropertyPlain, PropertySet} from 'esast/lib/ObjectExpression'
import fromExpression from './fromExpression'
import {fromFunctionExpression} from './fromFunction'
import fromIdentifier from './fromIdentifier'
import {fromLiteralNumberOrString} from './fromLiteral'
import {badType, badValue, loc} from './util'

export default function fromObjectExpression(_: any): ObjectExpression {
	return loc(_, new ObjectExpression(_.properties.map(fromProperty)))
}

export function fromProperty(_: any): Property {
	return loc(_, (() => {
		const name = fromPropertyName(_.key, _.computed)
		const valueFunction = () => fromFunctionExpression(_.value)
		switch (_.kind) {
			case 'init':
				return _.method ?
					new PropertyMethod(name, valueFunction()) :
					new PropertyPlain(name, fromExpression(_.value))
			case 'get':
				return new PropertyGet(name, valueFunction())
			case 'set':
				return new PropertySet(name, valueFunction())
			default:
				throw badValue(_, 'sourceType', '"init" | "get" | "set"')

		}
	})())
}

export function fromPropertyName(_: any, computed: boolean): PropertyName {
	if (computed)
		return new ComputedName(fromExpression(_))
	else
		switch (_.type) {
			case 'Identifier':
				return fromIdentifier(_)
			case 'Literal':
				return fromLiteralNumberOrString(_)
			default:
				throw badType(_, 'Identifier | Literal')
		}
}
