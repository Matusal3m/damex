"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = Middleware;
const enums_1 = require("../types/enums");
function Middleware(handlers) {
    return function (target, propertyKey) {
        Reflect.defineMetadata(propertyKey, handlers, target, enums_1.ControllerMethodsParams.Middleware);
    };
}
