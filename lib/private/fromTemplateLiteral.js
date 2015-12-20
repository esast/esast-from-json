(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/TemplateLiteral', './fromExpression', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var TemplateLiteral_1 = require('esast/lib/TemplateLiteral');
    var fromExpression_1 = require('./fromExpression');
    var util_1 = require('./util');
    function fromTemplateLiteral(_) {
        return util_1.loc(_, new TemplateLiteral_1.default(_.quasis.map(_ => util_1.loc(_, new TemplateLiteral_1.TemplateElement(_.tail, _.value))), _.expressions.map(fromExpression_1.default)));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromTemplateLiteral;
    function fromTaggedTemplateExpression(_) {
        return util_1.loc(_, new TemplateLiteral_1.TaggedTemplateExpression(fromExpression_1.default(_.tag), fromTemplateLiteral(_.quasi)));
    }
    exports.fromTaggedTemplateExpression = fromTaggedTemplateExpression;
});
//# sourceMappingURL=fromTemplateLiteral.js.map
