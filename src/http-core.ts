import express, { Router, type RequestHandler } from "express";
import {
  CONTROLLER_CLASS_MIDDLEWARE,
  CONTROLLER_METHOD,
  CONTROLLER_MIDDLEWARE,
  CONTROLLER_PATH,
  SERVER_CONTROLLERS,
  SERVER_ROUTER,
} from "./consts";

type HttpClient = express.Application;

export class AppRouter {
  private static instance = Router();

  static get() {
    return AppRouter.instance;
  }
}

export class Server {
  private readonly app: HttpClient;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.setupControllers(this.app);
  }

  start(port: number = 3000) {
    this.app.listen(port, () => {
      console.log(`Application running on port ${port} 🟢`);
    });
  }

  use(...handlers: RequestHandler[]) {
    this.app.use(handlers);
  }

  private setupControllers(app: HttpClient) {
    const controllers = this.getControllers();

    controllers.forEach((controller: any) =>
      this.appendControllerRouterToApp(controller, app),
    );
  }

  private appendControllerRouterToApp(controller: any, app: any) {
    const router = this.getControllerRouter(controller);
    app.use(router);
  }

  private getControllers(): Array<any> {
    return Reflect.getMetadata(SERVER_CONTROLLERS, Server);
  }

  private getControllerRouter(controller: any) {
    return Reflect.getMetadata(SERVER_ROUTER, controller);
  }

  static appendControllerMetadata(newController: any, controllerRouter: any) {
    const prevControllers = this.getPrevControllers();

    Reflect.defineMetadata(
      SERVER_CONTROLLERS,
      [...prevControllers, newController],
      Server,
    );

    Reflect.defineMetadata(SERVER_ROUTER, controllerRouter, newController);
  }

  private static getPrevControllers() {
    return Reflect.getMetadata(SERVER_CONTROLLERS, Server) || [];
  }
}

export class ControllerActionReader {
  constructor(
    private actionName: string,
    private targetPrototype: any,
    private controllerTarget: any,
  ) {}

  getMethod() {
    return (
      (Reflect.getMetadata(
        this.actionName,
        this.targetPrototype,
        CONTROLLER_METHOD,
      ) as string) ?? ""
    );
  }

  getMiddlewares() {
    return (
      (Reflect.getMetadata(
        this.actionName,
        this.targetPrototype,
        CONTROLLER_MIDDLEWARE,
      ) as Array<any>) ?? []
    );
  }

  getPath() {
    const path =
      Reflect.getOwnMetadata(
        this.actionName,
        this.targetPrototype,
        CONTROLLER_PATH,
      ) ?? "";

    return this.normalizePath(path);
  }

  private normalizePath(path: string) {
    if (!path.startsWith("/")) return `/${path}`;
    return path;
  }

  getControllerClassMiddleware() {
    return Reflect.getMetadata(
      CONTROLLER_CLASS_MIDDLEWARE,
      this.controllerTarget,
    );
  }
}
