(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Pattern', 'op/Op', './fromIdentifier', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Pattern_1 = require('esast/lib/Pattern');
    var Op_1 = require('op/Op');
    var fromIdentifier_1 = require('./fromIdentifier');
    var util_1 = require('./util');
    function fromPattern(_) {
        return Op_1.orThrow(opFromPattern(_), () => util_1.badType(_, 'Pattern'));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromPattern;
    function opFromPattern(_) {
        switch (_.type) {
            case 'Identifier':
                return fromIdentifier_1.default(_);
            case 'ObjectPattern':
                return util_1.loc(_, new Pattern_1.ObjectPattern(_.properties.map(fromAssignmentProperty)));
            case 'ArrayPattern':
                return util_1.loc(_, new Pattern_1.ArrayPattern(_.elements.map(_ => Op_1.opMap(_, fromPattern))));
            case 'RestElement':
                return util_1.loc(_, new Pattern_1.RestElement(fromPattern(_.argument)));
            default:
                return null;
        }
    }
    exports.opFromPattern = opFromPattern;
    function fromAssignmentProperty(_) {
        if (!(_.kind === 'init' && !_.method)) throw new Error(`AssignmentProperty has unusual value: ${ JSON.stringify(_) }`);
        return util_1.loc(_, new Pattern_1.AssignmentProperty(fromIdentifier_1.default(_.key), fromPattern(_.value)));
    }
    exports.fromAssignmentProperty = fromAssignmentProperty;
});
//# sourceMappingURL=fromPattern.js.map
