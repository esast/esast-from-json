import TemplateLiteral, {TaggedTemplateExpression, TemplateElement} from 'esast/lib/TemplateLiteral'
import fromExpression from './fromExpression'
import {loc} from './util'

export default function fromTemplateLiteral(_: any): TemplateLiteral {
	return loc(_, new TemplateLiteral(
		_.quasis.map((_: any) => loc(_, new TemplateElement(_.tail, _.value))),
		_.expressions.map(fromExpression)))
}

export function fromTaggedTemplateExpression(_: any): TaggedTemplateExpression {
	return loc(_, new TaggedTemplateExpression(
				fromExpression(_.tag),
				fromTemplateLiteral(_.quasi)))
}
