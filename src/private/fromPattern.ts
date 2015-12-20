import Pattern, {ArrayPattern, AssignmentProperty, ObjectPattern, RestElement
	}  from 'esast/lib/Pattern'
import {opMap, orThrow} from 'op/Op'
import fromIdentifier from './fromIdentifier'
import {badType, loc} from './util'

export default function fromPattern(_: any): Pattern {
	return orThrow(opFromPattern(_), () => badType(_, 'Pattern'))
}

export function opFromPattern(_: any): Pattern {
	switch (_.type) {
		case 'Identifier':
			return fromIdentifier(_)
		case 'ObjectPattern':
			return loc(_, new ObjectPattern(_.properties.map(fromAssignmentProperty)))
		case 'ArrayPattern':
			return loc(_, new ArrayPattern(_.elements.map((_: any) => opMap(_, fromPattern))))
		case 'RestElement':
			return loc(_, new RestElement(fromPattern(_.argument)))
		default:
			return null
	}
}

export function fromAssignmentProperty(_: any): AssignmentProperty {
	if (!(_.kind === 'init' && !_.method))
		throw new Error(`AssignmentProperty has unusual value: ${JSON.stringify(_)}`)
	return loc(_, new AssignmentProperty(fromIdentifier(_.key), fromPattern(_.value)))
}
