(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Loop', 'esast/lib/Statement', 'op/Op', './fromDeclaration', './fromExpression', './fromIdentifier', './fromOr', './fromPattern', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Loop_1 = require('esast/lib/Loop');
    var Statement_1 = require('esast/lib/Statement');
    var Op_1 = require('op/Op');
    var fromDeclaration_1 = require('./fromDeclaration');
    var fromExpression_1 = require('./fromExpression');
    var fromIdentifier_1 = require('./fromIdentifier');
    var fromOr_1 = require('./fromOr');
    var fromPattern_1 = require('./fromPattern');
    var util_1 = require('./util');
    function fromStatement(_) {
        switch (_.type) {
            case 'BlockStatement':
                return util_1.loc(_, fromBlockStatement(_));
            case 'BreakStatement':
                return util_1.loc(_, new Loop_1.BreakStatement(Op_1.opMap(_.label, fromIdentifier_1.default)));
            case 'ContinueStatement':
                return util_1.loc(_, new Loop_1.ContinueStatement(Op_1.opMap(_.label, fromIdentifier_1.default)));
            case 'DebuggerStatement':
                return util_1.loc(_, new Statement_1.DebuggerStatement());
            case 'DoWhileStatement':
                return util_1.loc(_, new Loop_1.DoWhileStatement(fromStatement(_.body), fromExpression_1.default(_.test)));
            case 'EmptyStatement':
                return util_1.loc(_, new Statement_1.EmptyStatement());
            case 'ExpressionStatement':
                return util_1.loc(_, new Statement_1.ExpressionStatement(fromExpression_1.default(_.expression)));
            case 'ForStatement':
                return util_1.loc(_, new Loop_1.ForStatement(Op_1.opMap(_.init, fromOr_1.fromExpressionOrVariableDeclaration), Op_1.opMap(_.test, fromExpression_1.default), Op_1.opMap(_.update, fromExpression_1.default), fromStatement(_.body)));
            case 'ForInStatement':
                return util_1.loc(_, new Loop_1.ForInStatement(fromOr_1.fromIdentifierOrVariableDeclaration(_.left), fromExpression_1.default(_.right), fromStatement(_.body)));
            case 'ForOfStatement':
                return util_1.loc(_, new Loop_1.ForOfStatement(fromOr_1.fromIdentifierOrVariableDeclaration(_.left), fromExpression_1.default(_.right), fromStatement(_.body)));
            case 'IfStatement':
                return util_1.loc(_, new Statement_1.IfStatement(fromExpression_1.default(_.test), fromStatement(_.consequent), Op_1.opMap(_.alternate, fromStatement)));
            case 'LabeledStatement':
                return util_1.loc(_, new Loop_1.LabeledStatement(fromIdentifier_1.default(_.label), fromStatement(_.body)));
            case 'ReturnStatement':
                return util_1.loc(_, new Statement_1.ReturnStatement(Op_1.opMap(_.argument, fromExpression_1.default)));
            case 'SwitchStatement':
                return util_1.loc(_, new Statement_1.SwitchStatement(fromExpression_1.default(_.discriminant), _.cases.map(fromSwitchCase)));
            case 'ThrowStatement':
                return util_1.loc(_, new Statement_1.ThrowStatement(fromExpression_1.default(_.argument)));
            case 'TryStatement':
                return util_1.loc(_, new Statement_1.TryStatement(fromBlockStatement(_.block), Op_1.opMap(_.handler, fromCatchClause), Op_1.opMap(_.finalizer, fromBlockStatement)));
            case 'WhileStatement':
                return util_1.loc(_, new Loop_1.WhileStatement(fromExpression_1.default(_.test), fromStatement(_.body)));
            default:
                return fromDeclaration_1.default(_);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromStatement;
    function fromBlockStatement(_) {
        return util_1.loc(_, new Statement_1.BlockStatement(_.body.map(fromStatement)));
    }
    exports.fromBlockStatement = fromBlockStatement;
    function fromCatchClause(_) {
        return util_1.loc(_, new Statement_1.CatchClause(fromPattern_1.default(_.param), fromBlockStatement(_.body)));
    }
    exports.fromCatchClause = fromCatchClause;
    function fromSwitchCase(_) {
        return util_1.loc(_, new Statement_1.SwitchCase(Op_1.opMap(_.test, fromExpression_1.default), _.consequent.map(fromStatement)));
    }
    exports.fromSwitchCase = fromSwitchCase;
});
//# sourceMappingURL=fromStatement.js.map
