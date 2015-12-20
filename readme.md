Convert a raw [estree](https://github.com/estree/estree) to an [esast](https://github.com/esast/esast) tree.

## Install

	npm install --save esast/esast-from-json
	# or:
	bower install --save esast/esast-from-json

## Use

	import {parse} from 'acorn'
	import Node from 'esast/lib/ast'
	import fromJson from 'esast-from-json/from-json'
	const src = '1 + 1'
	const ast: Node = fromJson(parse(src))
