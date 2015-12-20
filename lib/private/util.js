(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Loc', 'op/Op'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Loc_1 = require('esast/lib/Loc');
    var Op_1 = require('op/Op');
    function loc(object, ast) {
        Op_1.opEach(object.loc, _ref => {
            let start = _ref.start;
            let end = _ref.end;

            ast.loc = new Loc_1.default(new Loc_1.Pos(start.line, start.column), new Loc_1.Pos(end.line, end.column));
        });
        return ast;
    }
    exports.loc = loc;
    function badType(_, expectedDesc) {
        return new Error(`Expected a ${ expectedDesc }, got: ${ _ }`);
    }
    exports.badType = badType;
    function badValue(_, property, type) {
        return new Error(`Expected value's ${ property } to be a ${ type }, but got: ${ _ }`);
    }
    exports.badValue = badValue;
});
//# sourceMappingURL=util.js.map
