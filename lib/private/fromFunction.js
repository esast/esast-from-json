(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Function', 'op/Op', './fromIdentifier', './fromOr', './fromPattern', './fromStatement', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Function_1 = require('esast/lib/Function');
    var Op_1 = require('op/Op');
    var fromIdentifier_1 = require('./fromIdentifier');
    var fromOr_1 = require('./fromOr');
    var fromPattern_1 = require('./fromPattern');
    var fromStatement_1 = require('./fromStatement');
    var util_1 = require('./util');
    function fromArrowFunctionExpression(_) {
        return util_1.loc(_, new Function_1.ArrowFunctionExpression(_.params.map(fromPattern_1.default), fromOr_1.fromBlockStatementOrExpression(_.body)));
    }
    exports.fromArrowFunctionExpression = fromArrowFunctionExpression;
    function fromFunctionDeclaration(_) {
        return util_1.loc(_, new Function_1.FunctionDeclaration(fromIdentifier_1.default(_.id), _.params.map(fromPattern_1.default), fromStatement_1.fromBlockStatement(_.body), { generator: _.generator, async: _.async }));
    }
    exports.fromFunctionDeclaration = fromFunctionDeclaration;
    function fromFunctionExpression(_) {
        return util_1.loc(_, new Function_1.FunctionExpression(Op_1.opMap(_.id, fromIdentifier_1.default), _.params.map(fromPattern_1.default), fromStatement_1.fromBlockStatement(_.body), { generator: _.generator, async: _.async }));
    }
    exports.fromFunctionExpression = fromFunctionExpression;
});
//# sourceMappingURL=fromFunction.js.map
