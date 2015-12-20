(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'op/Op', './fromClass', './fromDeclaration', './fromExpression', './fromIdentifier', './fromPattern', './fromStatement', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Op_1 = require('op/Op');
    var fromClass_1 = require('./fromClass');
    var fromDeclaration_1 = require('./fromDeclaration');
    var fromExpression_1 = require('./fromExpression');
    var fromIdentifier_1 = require('./fromIdentifier');
    var fromPattern_1 = require('./fromPattern');
    var fromStatement_1 = require('./fromStatement');
    var util_1 = require('./util');
    function fromExpressionOrDeclaration(_) {
        return Op_1.orDefault(fromDeclaration_1.opFromDeclaration(_), () => fromExpression_1.default(_));
    }
    exports.fromExpressionOrDeclaration = fromExpressionOrDeclaration;
    function fromBlockStatementOrExpression(_) {
        return _.type === 'BlockStatement' ? fromStatement_1.fromBlockStatement(_) : fromExpression_1.default(_);
    }
    exports.fromBlockStatementOrExpression = fromBlockStatementOrExpression;
    function fromExpressionOrSuper(_) {
        return _.type === 'Super' ? fromClass_1.fromSuper(_) : fromExpression_1.default(_);
    }
    exports.fromExpressionOrSuper = fromExpressionOrSuper;
    function fromExpressionOrSpreadElement(_) {
        return _.type === 'SpreadElement' ? fromExpression_1.fromSpreadElement(_) : fromExpression_1.default(_);
    }
    exports.fromExpressionOrSpreadElement = fromExpressionOrSpreadElement;
    function fromIdentifierOrVariableDeclaration(_) {
        switch (_.type) {
            case 'Identifier':
                return fromIdentifier_1.default(_);
            case 'VariableDeclaration':
                return fromDeclaration_1.fromVariableDeclaration(_);
            default:
                throw util_1.badType(_, 'Identifier or VariableDeclaration');
        }
    }
    exports.fromIdentifierOrVariableDeclaration = fromIdentifierOrVariableDeclaration;
    function fromIdentifierOrMemberExpression(_) {
        switch (_.type) {
            case 'Identifier':
                return fromIdentifier_1.default(_);
            case 'MemberExpression':
                return fromExpression_1.fromMemberExpression(_);
            default:
                throw util_1.badType(_, 'Identifier or MemberExpression');
        }
    }
    exports.fromIdentifierOrMemberExpression = fromIdentifierOrMemberExpression;
    function fromPatternOrMemberExpression(_) {
        return _.type === 'MemberExpression' ? fromExpression_1.fromMemberExpression(_) : fromPattern_1.default(_);
    }
    exports.fromPatternOrMemberExpression = fromPatternOrMemberExpression;
    function fromExpressionOrVariableDeclaration(_) {
        return _.type === 'VariableDeclaration' ? fromDeclaration_1.fromVariableDeclaration(_) : fromExpression_1.default(_);
    }
    exports.fromExpressionOrVariableDeclaration = fromExpressionOrVariableDeclaration;
});
//# sourceMappingURL=fromOr.js.map
