(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Declaration', 'op/Op', './fromClass', './fromExpression', './fromFunction', './fromPattern', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Declaration_1 = require('esast/lib/Declaration');
    var Op_1 = require('op/Op');
    var fromClass_1 = require('./fromClass');
    var fromExpression_1 = require('./fromExpression');
    var fromFunction_1 = require('./fromFunction');
    var fromPattern_1 = require('./fromPattern');
    var util_1 = require('./util');
    function fromDeclaration(_) {
        return Op_1.orThrow(opFromDeclaration(_), () => util_1.badType(_, 'Declaration'));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromDeclaration;
    function opFromDeclaration(_) {
        switch (_.type) {
            case 'ClassDeclaration':
                return fromClass_1.fromClassDeclaration(_);
            case 'FunctionDeclaration':
                return fromFunction_1.fromFunctionDeclaration(_);
            case 'VariableDeclaration':
                return fromVariableDeclaration(_);
            default:
                return null;
        }
    }
    exports.opFromDeclaration = opFromDeclaration;
    function fromVariableDeclaration(_) {
        const ctr = (() => {
            switch (_.kind) {
                case 'const':
                    return Declaration_1.VariableDeclarationConst;
                case 'let':
                    return Declaration_1.VariableDeclarationLet;
                case 'var':
                    return Declaration_1.VariableDeclarationVar;
                default:
                    throw util_1.badValue(_, 'kind', '"const" | "let" | "var"');
            }
        })();
        return util_1.loc(_, new ctr(_.declarations.map(fromVariableDeclarator)));
    }
    exports.fromVariableDeclaration = fromVariableDeclaration;
    function fromVariableDeclarator(_) {
        return util_1.loc(_, new Declaration_1.VariableDeclarator(fromPattern_1.default(_.id), Op_1.opMap(_.init, fromExpression_1.default)));
    }
    exports.fromVariableDeclarator = fromVariableDeclarator;
});
//# sourceMappingURL=fromDeclaration.js.map
