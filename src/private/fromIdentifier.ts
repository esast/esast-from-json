import Identifier from 'esast/lib/Identifier'
import {badValue, loc} from './util'

export default function fromIdentifier(_: any): Identifier {
	if (typeof _.name !== 'string')
		throw badValue(_, 'name', 'string')
	return loc(_, new Identifier(_.name))
}
