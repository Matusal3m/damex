import { ControllerMethodsParams } from '../types/enums';
import type { RequestHandler } from 'express';

export function Middleware(handlers: RequestHandler[]) {
    return function (target: any, propertyKey: any): any {
        Reflect.defineMetadata(
            propertyKey,
            handlers,
            target,
            ControllerMethodsParams.Middleware,
        );
    };
}
