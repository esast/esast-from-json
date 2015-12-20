import Loc, {Pos} from 'esast/lib/Loc'
import Node from 'esast/lib/Node'
import {opEach} from 'op/Op'

export function loc<A extends Node>(object: any, ast: A): A {
	opEach(object.loc, ({start, end}) => {
		ast.loc = new Loc(new Pos(start.line, start.column), new Pos(end.line, end.column))
	})
	return ast
}

export function badType(_: any, expectedDesc: string): Error {
	return new Error(`Expected a ${expectedDesc}, got: ${_}`)
}

export function badValue(_: any, property: string, type: string): Error {
	return new Error(`Expected value's ${property} to be a ${type}, but got: ${_}`)
}
