(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/ObjectExpression', './fromExpression', './fromFunction', './fromIdentifier', './fromLiteral', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var ObjectExpression_1 = require('esast/lib/ObjectExpression');
    var fromExpression_1 = require('./fromExpression');
    var fromFunction_1 = require('./fromFunction');
    var fromIdentifier_1 = require('./fromIdentifier');
    var fromLiteral_1 = require('./fromLiteral');
    var util_1 = require('./util');
    function fromObjectExpression(_) {
        return util_1.loc(_, new ObjectExpression_1.default(_.properties.map(fromProperty)));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromObjectExpression;
    function fromProperty(_) {
        return util_1.loc(_, (() => {
            const name = fromPropertyName(_.key, _.computed);
            const valueFunction = () => fromFunction_1.fromFunctionExpression(_.value);
            switch (_.kind) {
                case 'init':
                    return _.method ? new ObjectExpression_1.PropertyMethod(name, valueFunction()) : new ObjectExpression_1.PropertyPlain(name, fromExpression_1.default(_.value));
                case 'get':
                    return new ObjectExpression_1.PropertyGet(name, valueFunction());
                case 'set':
                    return new ObjectExpression_1.PropertySet(name, valueFunction());
                default:
                    throw util_1.badValue(_, 'sourceType', '"init" | "get" | "set"');
            }
        })());
    }
    exports.fromProperty = fromProperty;
    function fromPropertyName(_, computed) {
        if (computed) return new ObjectExpression_1.ComputedName(fromExpression_1.default(_));else switch (_.type) {
            case 'Identifier':
                return fromIdentifier_1.default(_);
            case 'Literal':
                return fromLiteral_1.fromLiteralNumberOrString(_);
            default:
                throw util_1.badType(_, 'Identifier | Literal');
        }
    }
    exports.fromPropertyName = fromPropertyName;
});
//# sourceMappingURL=fromObjectExpression.js.map
