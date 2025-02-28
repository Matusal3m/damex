"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = Controller;
const AppRouter_1 = require("../classes/AppRouter");
const enums_1 = require("../types/enums");
const ServerConfigsParams_1 = require("../types/enums/ServerConfigsParams");
function Controller(path) {
    const router = AppRouter_1.AppRouter.router;
    return function (target) {
        const { prototype } = Object.getOwnPropertyDescriptors(target);
        const [, ..._actionsNames] = Object.getOwnPropertyNames(prototype.value);
        _actionsNames.forEach((_actionName) => {
            var _a, _b, _c;
            const _method = (_a = Reflect.getOwnMetadata(_actionName, prototype.value, enums_1.ControllerMethodsParams.Method)) !== null && _a !== void 0 ? _a : '';
            const _middlewares = (_b = Reflect.getOwnMetadata(_actionName, prototype.value, enums_1.ControllerMethodsParams.Middleware)) !== null && _b !== void 0 ? _b : [];
            const _path = (_c = Reflect.getOwnMetadata(_actionName, prototype.value, enums_1.ControllerMethodsParams.Path)) !== null && _c !== void 0 ? _c : '';
            router[_method](`${path}${_path}`, _middlewares, prototype.value[_actionName]);
        });
        Reflect.defineMetadata(ServerConfigsParams_1.ServerConfigsParams.Router, router, target);
    };
}
