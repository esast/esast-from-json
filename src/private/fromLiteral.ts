import Literal, {LiteralBoolean, LiteralNull, LiteralNumber, LiteralRegExp, LiteralString
	} from 'esast/lib/Literal'
import {badType, badValue, loc} from './util'

export default function fromLiteral(_: any): Literal {
	const {value} = _
	return loc(_, (() => {
		switch (typeof value) {
			case 'boolean':
				return new LiteralBoolean(value)
			case 'number':
				return new LiteralNumber(value)
			case 'object':
				return value === null ? new LiteralNull() : new LiteralRegExp(fromRegExp(value))
			case 'string':
				return new LiteralString(value)
			default:
				throw badValue(_, 'value', 'boolean | null | number | object | RegExp | string')
		}
	})())
}

function fromRegExp(_: any): RegExp {
	if (_ instanceof RegExp)
		return _
	else if ('pattern' in _ && 'flags' in _)
		return new RegExp(_.pattern, _.flags)
	else
		throw badType(_, 'RegExp or {pattern, flags}')
}

export function fromLiteralNumberOrString(_: any): LiteralNumber | LiteralString {
	const {value} = _
	return loc(_, ((): LiteralNumber | LiteralString => {
		switch (typeof value) {
			case 'number':
				return new LiteralNumber(value)
			case 'string':
				return new LiteralString(value)
			default:
				throw badValue(_, 'value', 'number | string')
		}
	})())
}

export function fromLiteralString(_: any): LiteralString {
	if (_.type !== 'Literal')
		throw badType(_, 'LiteralString')
	if (typeof _.value !== 'string')
		throw badValue(_, 'value', 'string')
	return loc(_, new LiteralString(_.value))
}
