(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Identifier', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Identifier_1 = require('esast/lib/Identifier');
    var util_1 = require('./util');
    function fromIdentifier(_) {
        if (typeof _.name !== 'string') throw util_1.badValue(_, 'name', 'string');
        return util_1.loc(_, new Identifier_1.default(_.name));
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromIdentifier;
});
//# sourceMappingURL=fromIdentifier.js.map
