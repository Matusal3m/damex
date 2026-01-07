import { RequestHandler } from 'express';
import { CONTROLLER_METHOD_MIDDLEWARE, CONTROLLER_MIDDLEWARE } from '../consts';

export function MethodMiddleware(handlers: RequestHandler[]) {
    return function (target: any, propertyKey: any): any {
        Reflect.defineMetadata(
            CONTROLLER_METHOD_MIDDLEWARE,
            handlers,
            target,
            propertyKey,
        );
    };
}

export function Middleware(handlers: RequestHandler[]) {
    return function (target: any): void {
        Reflect.defineMetadata(CONTROLLER_MIDDLEWARE, handlers, target);
    };
}
