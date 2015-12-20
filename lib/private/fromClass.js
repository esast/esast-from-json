(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Class', 'op/Op', './fromExpression', './fromFunction', './fromIdentifier', './fromObjectExpression', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Class_1 = require('esast/lib/Class');
    var Op_1 = require('op/Op');
    var fromExpression_1 = require('./fromExpression');
    var fromFunction_1 = require('./fromFunction');
    var fromIdentifier_1 = require('./fromIdentifier');
    var fromObjectExpression_1 = require('./fromObjectExpression');
    var util_1 = require('./util');
    function fromClassDeclaration(_) {
        return util_1.loc(_, new Class_1.ClassDeclaration(fromIdentifier_1.default(_.id), Op_1.opMap(_.superClass, fromExpression_1.default), fromClassBody(_.body)));
    }
    exports.fromClassDeclaration = fromClassDeclaration;
    function fromClassExpression(_) {
        return util_1.loc(_, new Class_1.ClassExpression(Op_1.opMap(_.id, fromIdentifier_1.default), Op_1.opMap(_.superClass, fromExpression_1.default), fromClassBody(_.body)));
    }
    exports.fromClassExpression = fromClassExpression;
    function fromClassBody(_) {
        return util_1.loc(_, new Class_1.ClassBody(_.body.map(fromMethodDefinition)));
    }
    exports.fromClassBody = fromClassBody;
    function fromMethodDefinition(_) {
        return util_1.loc(_, (() => {
            const func = fromFunction_1.fromFunctionExpression(_.value);
            if (_.kind === 'constructor') return new Class_1.MethodDefinitionConstructor(func);else {
                const name = fromObjectExpression_1.fromPropertyName(_.key, _.computed);
                const ctr = (() => {
                    switch (_.kind) {
                        case 'method':
                            return Class_1.MethodDefinitionPlain;
                        case 'get':
                            return Class_1.MethodDefinitionGet;
                        case 'set':
                            return Class_1.MethodDefinitionSet;
                        default:
                            throw util_1.badValue(_, 'kind', '"constructor" | "method" | "get" | "set"');
                    }
                })();
                return new ctr(name, func, { static: _.static });
            }
        })());
    }
    exports.fromMethodDefinition = fromMethodDefinition;
    function fromSuper(_) {
        return util_1.loc(_, new Class_1.Super());
    }
    exports.fromSuper = fromSuper;
});
//# sourceMappingURL=fromClass.js.map
