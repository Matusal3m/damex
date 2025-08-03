import { ServerConfigsParams } from '../types/enums/ServerConfigsParams';
import type { RequestHandler } from 'express';

export function GlobalMiddleware(handlers: RequestHandler[]) {
    return function (target: any): void {
        Reflect.defineMetadata(
            ServerConfigsParams.GlobalMiddleware,
            handlers,
            target,
        );
    };
}
