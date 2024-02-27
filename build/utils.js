"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARSE = void 0;
const PARSE = (data) => {
    const jsonString = data.join("").replace(/\s*(\{|\}|\[|\]|,|:)\s*/g, '$1');
    const jsonObject = JSON.parse(jsonString);
    return jsonObject;
};
exports.PARSE = PARSE;
