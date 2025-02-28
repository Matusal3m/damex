"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleware = GlobalMiddleware;
const ServerConfigsParams_1 = require("../types/enums/ServerConfigsParams");
function GlobalMiddleware(handlers) {
    return function (target) {
        Reflect.defineMetadata(ServerConfigsParams_1.ServerConfigsParams.GlobalMiddleware, handlers, target);
    };
}
