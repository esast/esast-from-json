(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports);if (v !== undefined) module.exports = v;
    } else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'esast/lib/Literal', './util'], factory);
    }
})(function (require, exports) {
    "use strict";

    var Literal_1 = require('esast/lib/Literal');
    var util_1 = require('./util');
    function fromLiteral(_) {
        const value = _.value;

        return util_1.loc(_, (() => {
            switch (typeof value) {
                case 'boolean':
                    return new Literal_1.LiteralBoolean(value);
                case 'number':
                    return new Literal_1.LiteralNumber(value);
                case 'object':
                    return value === null ? new Literal_1.LiteralNull() : new Literal_1.LiteralRegExp(fromRegExp(value));
                case 'string':
                    return new Literal_1.LiteralString(value);
                default:
                    throw util_1.badValue(_, 'value', 'boolean | null | number | object | RegExp | string');
            }
        })());
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = fromLiteral;
    function fromRegExp(_) {
        if (_ instanceof RegExp) return _;else if ('pattern' in _ && 'flags' in _) return new RegExp(_.pattern, _.flags);else throw util_1.badType(_, 'RegExp or {pattern, flags}');
    }
    function fromLiteralNumberOrString(_) {
        const value = _.value;

        return util_1.loc(_, (() => {
            switch (typeof value) {
                case 'number':
                    return new Literal_1.LiteralNumber(value);
                case 'string':
                    return new Literal_1.LiteralString(value);
                default:
                    throw util_1.badValue(_, 'value', 'number | string');
            }
        })());
    }
    exports.fromLiteralNumberOrString = fromLiteralNumberOrString;
    function fromLiteralString(_) {
        if (_.type !== 'Literal') throw util_1.badType(_, 'LiteralString');
        if (typeof _.value !== 'string') throw util_1.badValue(_, 'value', 'string');
        return util_1.loc(_, new Literal_1.LiteralString(_.value));
    }
    exports.fromLiteralString = fromLiteralString;
});
//# sourceMappingURL=fromLiteral.js.map
