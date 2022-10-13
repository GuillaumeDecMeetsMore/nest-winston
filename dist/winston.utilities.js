"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilities = void 0;
const winston_1 = require("winston");
const util_1 = require("util");
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const clc = {
    bold: (text) => `\x1B[1m${text}\x1B[0m`,
    green: (text) => `\x1B[32m${text}\x1B[39m`,
    yellow: (text) => `\x1B[33m${text}\x1B[39m`,
    red: (text) => `\x1B[31m${text}\x1B[39m`,
    magentaBright: (text) => `\x1B[95m${text}\x1B[39m`,
    cyanBright: (text) => `\x1B[96m${text}\x1B[39m`,
};
const nestLikeColorScheme = {
    info: clc.green,
    error: clc.red,
    warn: clc.yellow,
    debug: clc.magentaBright,
    verbose: clc.cyanBright,
};
const nestLikeConsoleFormat = (appName = 'NestWinston', options = {
    colors: !process.env.NO_COLOR,
    prettyPrint: false,
}) => winston_1.format.printf((_a) => {
    var { context, level, timestamp, message, ms } = _a, meta = __rest(_a, ["context", "level", "timestamp", "message", "ms"]);
    if ('undefined' !== typeof timestamp) {
        try {
            if (timestamp === new Date(timestamp).toISOString()) {
                timestamp = new Date(timestamp).toLocaleString();
            }
        }
        catch (error) {
        }
    }
    const color = options.colors && nestLikeColorScheme[level] || ((text) => text);
    const yellow = options.colors ? clc.yellow : ((text) => text);
    const stringifiedMeta = (0, fast_safe_stringify_1.default)(meta);
    const formattedMeta = options.prettyPrint
        ? (0, util_1.inspect)(JSON.parse(stringifiedMeta), { colors: options.colors, depth: null })
        : stringifiedMeta;
    return (`${color(`[${appName}]`)} ` +
        `${yellow(level.charAt(0).toUpperCase() + level.slice(1))}\t` +
        ('undefined' !== typeof timestamp ? `${timestamp} ` : '') +
        ('undefined' !== typeof context
            ? `${yellow('[' + context + ']')} `
            : '') +
        `${color(message)} - ` +
        `${formattedMeta}` +
        ('undefined' !== typeof ms ? ` ${yellow(ms)}` : ''));
});
exports.utilities = {
    format: {
        nestLike: nestLikeConsoleFormat,
    },
};