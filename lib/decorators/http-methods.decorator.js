"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Patch = exports.Put = exports.Post = exports.Get = void 0;
const enums_1 = require("../types/enums");
function createHttpMethod(method) {
    return function (path) {
        return function (target, propertyKey) {
            Reflect.defineMetadata(propertyKey, method, target, enums_1.ControllerMethodsParams.Method);
            Reflect.defineMetadata(propertyKey, path, target, enums_1.ControllerMethodsParams.Path);
        };
    };
}
exports.Get = createHttpMethod(enums_1.HttpMethods.Get);
exports.Post = createHttpMethod(enums_1.HttpMethods.Post);
exports.Put = createHttpMethod(enums_1.HttpMethods.Put);
exports.Patch = createHttpMethod(enums_1.HttpMethods.Patch);
exports.Delete = createHttpMethod(enums_1.HttpMethods.Delete);
