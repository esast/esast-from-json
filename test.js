'use strict'

const parse = require('espree').parse
const assert = require('chai').assert
const readFileSync = require('fs').readFileSync
require('source-map-support').install()
const fromJson = require('./lib/fromJSON').default

const src = readFileSync('./node_modules/typescript/lib/tsc.js')
const tree = parse(src, {loc: true})
const esast = fromJson(tree)
removeCrap(tree)
const d = diff(tree, esast)
console.log(d === null ? 'Passed!' : d)

function removeCrap(_) {
	if (isObject(_)) {
		switch (_.type) {
			case 'FunctionDeclaration': case 'FunctionExpression':
				assert.equal(_.expression, false)
				delete _.expression
				break
			case 'ForInStatement':
				assert.equal(_.each, false)
				delete _.each
				break
			case 'Literal':
				delete _.raw
				delete _.regex
				break
			default:
		}

		for (const key in _)
			removeCrap(_[key])
	}
}

function diff(a, b) {
	if (!isObject(a) || !isObject(b))
		return a === b ? null : [a, b]
	else {
		const df = {}
		for (const key in a) {
			const d = diff(a[key], b[key])
			if (d !== null)
				df[key] = d
		}
		if (Object.keys(df).length === 0)
			return null
		else {
			df['_diffed'] = [a, b]
			return df
		}
	}
}

function isObject(_) {
	return typeof _ === 'object' && _ !== null
}
