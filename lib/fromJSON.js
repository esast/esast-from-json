(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'op/Op', './private/fromClass', './private/fromDeclaration', './private/fromExpression', './private/fromPattern', './private/fromProgram', './private/fromStatement'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Op_1 = require('op/Op');
    var fromClass_1 = require('./private/fromClass');
    var fromDeclaration_1 = require('./private/fromDeclaration');
    var fromExpression_1 = require('./private/fromExpression');
    var fromPattern_1 = require('./private/fromPattern');
    var fromProgram_1 = require('./private/fromProgram');
    var fromStatement_1 = require('./private/fromStatement');
    function fromJson(_) {
        switch (_.type) {
            case 'Program':
                return fromProgram_1.default(_);
            case 'VariableDeclarator':
                return fromDeclaration_1.fromVariableDeclarator(_);
            case 'SwitchCase':
                return fromStatement_1.fromSwitchCase(_);
            case 'AssignmentProperty':
                return fromPattern_1.fromAssignmentProperty(_);
            case 'MethodDefinition':
                return fromClass_1.fromMethodDefinition(_);
            case 'ClassBody':
                return fromClass_1.fromClassBody(_);
            case 'ExportSpecifier':
                return fromProgram_1.fromExportSpecifier(_);
            case 'SpreadElement':
                return fromExpression_1.fromSpreadElement(_);
            case 'Super':
                return fromClass_1.fromSuper(_);
            default:
                let ast = fromPattern_1.opFromPattern(_);
                if (Op_1.nonNull(ast)) return ast;
                ast = fromProgram_1.opFromImportSpecifierAbstract(_);
                if (Op_1.nonNull(ast)) return ast;
                ast = fromProgram_1.opFromModuleDeclaration(_);
                if (Op_1.nonNull(ast)) return ast;
                ast = fromExpression_1.opFromExpression(_);
                if (Op_1.nonNull(ast)) return ast;
                return fromStatement_1.default(_);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromJson;
});
//# sourceMappingURL=fromJSON.js.map
