(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Program', 'op/Op', './fromDeclaration', './fromIdentifier', './fromLiteral', './fromOr', './fromStatement', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Program_1 = require('esast/lib/Program');
    var Op_1 = require('op/Op');
    var fromDeclaration_1 = require('./fromDeclaration');
    var fromIdentifier_1 = require('./fromIdentifier');
    var fromLiteral_1 = require('./fromLiteral');
    var fromOr_1 = require('./fromOr');
    var fromStatement_1 = require('./fromStatement');
    var util_1 = require('./util');
    function fromProgram(_) {
        switch (_.sourceType) {
            case 'script':
                return util_1.loc(_, new Program_1.Script(_.body.map(fromStatement_1.default)));
            case 'module':
            case undefined:
                return util_1.loc(_, new Program_1.Module(_.body.map(fromStatementOrModuleDeclaration)));
            default:
                throw util_1.badValue(_, 'sourceType', '"script" | "module"');
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromProgram;
    function opFromModuleDeclaration(_) {
        switch (_.type) {
            case 'ImportDeclaration':
                return util_1.loc(_, new Program_1.ImportDeclaration(_.specifiers.map(fromImportSpecifierAbstract), fromLiteral_1.fromLiteralString(_.source)));
            case 'ExportNamedDeclaration':
                return util_1.loc(_, new Program_1.ExportNamedDeclaration(Op_1.opMap(_.declaration, fromDeclaration_1.default), _.specifiers.map(fromExportSpecifier), Op_1.opMap(_.source, fromLiteral_1.fromLiteralString)));
            case 'ExportDefaultDeclaration':
                return util_1.loc(_, new Program_1.ExportDefaultDeclaration(fromOr_1.fromExpressionOrDeclaration(_.declaration)));
            case 'ExportAllDeclaration':
                return util_1.loc(_, new Program_1.ExportAllDeclaration(fromLiteral_1.fromLiteralString(_.source)));
            default:
                return null;
        }
    }
    exports.opFromModuleDeclaration = opFromModuleDeclaration;
    function fromStatementOrModuleDeclaration(_) {
        return Op_1.orDefault(opFromModuleDeclaration(_), () => fromStatement_1.default(_));
    }
    function fromImportSpecifierAbstract(_) {
        return Op_1.orThrow(opFromImportSpecifierAbstract(_), () => util_1.badType(_, 'ImportSpecifierAbstract'));
    }
    function opFromImportSpecifierAbstract(_) {
        switch (_.type) {
            case 'ImportSpecifier':
                return util_1.loc(_, new Program_1.ImportSpecifier(fromIdentifier_1.default(_.imported), fromIdentifier_1.default(_.local)));
            case 'ImportDefaultSpecifier':
                return util_1.loc(_, new Program_1.ImportDefaultSpecifier(fromIdentifier_1.default(_.local)));
            case 'ImportNamespaceSpecifier':
                return util_1.loc(_, new Program_1.ImportNamespaceSpecifier(fromIdentifier_1.default(_.local)));
            default:
                return null;
        }
    }
    exports.opFromImportSpecifierAbstract = opFromImportSpecifierAbstract;
    function fromExportSpecifier(_) {
        return util_1.loc(_, new Program_1.ExportSpecifier(fromIdentifier_1.default(_.exported), fromIdentifier_1.default(_.local)));
    }
    exports.fromExportSpecifier = fromExportSpecifier;
});
//# sourceMappingURL=fromProgram.js.map
