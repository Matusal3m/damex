import type { RequestHandler } from "express";
import {
  CONTROLLER_METHOD,
  CONTROLLER_PATH,
  CONTROLLER_CLASS_MIDDLEWARE,
  CONTROLLER_MIDDLEWARE,
} from "./consts";
import { AppRouter, ControllerActionReader, Server } from "./http-core";
import { DI } from "./di";

export function Controller(controllerPath?: string) {
  const router = AppRouter.get();

  return (target: any): any => {
    const instance = DI.new(target);
    const prototype = Object.getPrototypeOf(target);
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
      const classMiddleware =
        controllerActionReader.getControllerClassMiddleware();

      // @ts-ignore
      router[method](
        `${controllerPath}/${actionPath}`,
        ...middlewares,
        ...classMiddleware,
        instance[action],
      );

      Server.appendControllerMetadata(target, router);
    });
  };
}

export function Middleware(handlers: RequestHandler[]) {
  return function (target: any, propertyKey: any): any {
    Reflect.defineMetadata(
      propertyKey,
      handlers,
      target,
      CONTROLLER_MIDDLEWARE,
    );
  };
}

export function ClassMiddleware(handlers: RequestHandler[]) {
  return function (target: any): void {
    Reflect.defineMetadata(CONTROLLER_CLASS_MIDDLEWARE, handlers, target);
  };
}

function createHttpMethod(method: "get" | "post" | "put" | "delete" | "patch") {
  return function (path?: string) {
    return function (target: any, propertyKey: any): any {
      Reflect.defineMetadata(propertyKey, method, target, CONTROLLER_METHOD);
      Reflect.defineMetadata(propertyKey, path, target, CONTROLLER_PATH);
    };
  };
}

export const Get = createHttpMethod("get");
export const Post = createHttpMethod("post");
export const Put = createHttpMethod("put");
export const Patch = createHttpMethod("patch");
export const Delete = createHttpMethod("delete");
