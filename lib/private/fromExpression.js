(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Expression', 'op/Op', './fromClass', './fromFunction', './fromIdentifier', './fromLiteral', './fromObjectExpression', './fromOr', './fromTemplateLiteral', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Expression_1 = require('esast/lib/Expression');
    var Op_1 = require('op/Op');
    var fromClass_1 = require('./fromClass');
    var fromFunction_1 = require('./fromFunction');
    var fromIdentifier_1 = require('./fromIdentifier');
    var fromLiteral_1 = require('./fromLiteral');
    var fromObjectExpression_1 = require('./fromObjectExpression');
    var fromOr_1 = require('./fromOr');
    var fromTemplateLiteral_1 = require('./fromTemplateLiteral');
    var util_1 = require('./util');
    function fromExpression(_) {
        return Op_1.orThrow(opFromExpression(_), () => util_1.badType(_, 'Expression'));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromExpression;
    function opFromExpression(_) {
        switch (_.type) {
            case 'ArrayExpression':
                return util_1.loc(_, new Expression_1.ArrayExpression(_.elements.map(_ => Op_1.opMap(_, fromOr_1.fromExpressionOrSpreadElement))));
            case 'ArrowFunctionExpression':
                return fromFunction_1.fromArrowFunctionExpression(_);
            case 'AssignmentExpression':
                return util_1.loc(_, new Expression_1.AssignmentExpression(_.operator, fromOr_1.fromPatternOrMemberExpression(_.left), fromExpression(_.right)));
            case 'BinaryExpression':
                return util_1.loc(_, new Expression_1.BinaryExpression(_.operator, fromExpression(_.left), fromExpression(_.right)));
            case 'CallExpression':
                return util_1.loc(_, new Expression_1.CallExpression(fromOr_1.fromExpressionOrSuper(_.callee), _.arguments.map(fromOr_1.fromExpressionOrSpreadElement)));
            case 'ClassExpression':
                return fromClass_1.fromClassExpression(_);
            case 'ConditionalExpression':
                return util_1.loc(_, new Expression_1.ConditionalExpression(fromExpression(_.test), fromExpression(_.consequent), fromExpression(_.alternate)));
            case 'FunctionExpression':
                return fromFunction_1.fromFunctionExpression(_);
            case 'Identifier':
                return fromIdentifier_1.default(_);
            case 'Literal':
                return fromLiteral_1.default(_);
            case 'LogicalExpression':
                return util_1.loc(_, new Expression_1.LogicalExpression(_.operator, fromExpression(_.left), fromExpression(_.right)));
            case 'MemberExpression':
                return fromMemberExpression(_);
            case 'MetaProperty':
                return util_1.loc(_, new Expression_1.MetaProperty(fromIdentifier_1.default(_.meta), fromIdentifier_1.default(_.property)));
            case 'NewExpression':
                return util_1.loc(_, new Expression_1.NewExpression(fromExpression(_.callee), _.arguments.map(fromOr_1.fromExpressionOrSpreadElement)));
            case 'ObjectExpression':
                return fromObjectExpression_1.default(_);
            case 'SequenceExpression':
                return util_1.loc(_, new Expression_1.SequenceExpression(_.expressions.map(fromExpression)));
            case 'TaggedTemplateExpression':
                return fromTemplateLiteral_1.fromTaggedTemplateExpression(_);
            case 'TemplateLiteral':
                return fromTemplateLiteral_1.default(_);
            case 'ThisExpression':
                return util_1.loc(_, new Expression_1.ThisExpression());
            case 'UnaryExpression':
                return util_1.loc(_, new Expression_1.UnaryExpression(_.operator, fromExpression(_.argument)));
            case 'UpdateExpression':
                return util_1.loc(_, new Expression_1.UpdateExpression(_.operator, fromOr_1.fromIdentifierOrMemberExpression(_.argument), _.prefix));
            case 'YieldExpression':
                return util_1.loc(_, _.delegate ? new Expression_1.YieldDelegateExpression(fromExpression(_.argument)) : new Expression_1.YieldExpression(Op_1.opMap(_.argument, fromExpression)));
            default:
                return null;
        }
    }
    exports.opFromExpression = opFromExpression;
    function fromMemberExpression(_) {
        const object = fromOr_1.fromExpressionOrSuper(_.object);
        return util_1.loc(_, _.computed ? new Expression_1.MemberExpressionComputed(object, fromExpression(_.property)) : new Expression_1.MemberExpressionPlain(object, fromIdentifier_1.default(_.property)));
    }
    exports.fromMemberExpression = fromMemberExpression;
    function fromSpreadElement(_) {
        return util_1.loc(_, new Expression_1.SpreadElement(fromExpression(_.argument)));
    }
    exports.fromSpreadElement = fromSpreadElement;
});
//# sourceMappingURL=fromExpression.js.map
