import type { RequestHandler } from 'express';
import {
    CONTROLLER_METHOD,
    CONTROLLER_PATH,
    CONTROLLER_CLASS_MIDDLEWARE,
    CONTROLLER_MIDDLEWARE,
} from './consts';
import { AppRouter, ControllerActionReader, Server } from './http-core';
import { DI } from './di';
import { Container } from './container';

export function Controller(controllerPath?: string) {
    const router = AppRouter.get();

    return (target: any): any => {
        const instance = DI.new(target);
        const prototype = Object.getPrototypeOf(instance);
        const [, ...actionsNames] = Object.getOwnPropertyNames(prototype);

        actionsNames.forEach((action) => {
            const controllerActionReader = new ControllerActionReader(
                action,
                prototype,
                target,
            );

            const actionPath = controllerActionReader.getPath();
            const method = controllerActionReader.getMethod();
            const middlewares = controllerActionReader.getMiddlewares();
            const classMiddlewares =
                controllerActionReader.getControllerClassMiddlewares();

            const handlers = [middlewares, classMiddlewares]
                .flat(Infinity)
                .filter((h) => !!h);

            // @ts-ignore
            router[method](
                `${controllerPath}${actionPath}`,
                handlers,
                instance[action].bind(instance),
            );

            Server.appendControllerMetadata(target, router);
        });
    };
}

export function Implementations(implementations: any[]) {
    return (target: any) => {
        Container.register(target, implementations);
    };
}

export function Injectable() {
    return (_: any): any => {};
}

export function Middleware(handlers: RequestHandler[]) {
    return function (target: any, propertyKey: any): any {
        Reflect.defineMetadata(
            CONTROLLER_MIDDLEWARE,
            handlers,
            target,
            propertyKey,
        );
    };
}

export function ClassMiddleware(handlers: RequestHandler[]) {
    return function (target: any): void {
        Reflect.defineMetadata(CONTROLLER_CLASS_MIDDLEWARE, handlers, target);
    };
}

function createHttpMethod(method: 'get' | 'post' | 'put' | 'delete' | 'patch') {
    return function (path?: string) {
        return function (target: any, propertyKey: any): any {
            Reflect.defineMetadata(
                CONTROLLER_METHOD,
                method,
                target,
                propertyKey,
            );
            Reflect.defineMetadata(CONTROLLER_PATH, path, target, propertyKey);
        };
    };
}

export const Get = createHttpMethod('get');
export const Post = createHttpMethod('post');
export const Put = createHttpMethod('put');
export const Patch = createHttpMethod('patch');
export const Delete = createHttpMethod('delete');
