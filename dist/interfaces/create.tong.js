"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
// Converts JSON strings to/from your types
class Convert {
    static toCreateTong(json) {
        return JSON.parse(json);
    }
    static createTongToJson(value) {
        return JSON.stringify(value);
    }
}
exports.Convert = Convert;
