import {
    CONTROLLER_METHOD,
    CONTROLLER_METHOD_MIDDLEWARE,
    CONTROLLER_MIDDLEWARE,
    CONTROLLER_PATH,
} from './consts';

export class ControllerReflection {
    constructor(
        private readonly targetPrototype: any,
        private readonly controllerTarget: any,
    ) {}

    public getHttpMethod(actionName: string): string | null {
        const method = Reflect.getMetadata(
            CONTROLLER_METHOD,
            this.targetPrototype,
            actionName,
        );

        return method || null;
    }

    public getActionMiddlewares(actionName: string): Array<any> {
        const middlewares = Reflect.getMetadata(
            CONTROLLER_METHOD_MIDDLEWARE,
            this.targetPrototype,
            actionName,
        );

        return middlewares || [];
    }

    public getPath(actionName: string): string | null {
        const path = Reflect.getMetadata(
            CONTROLLER_PATH,
            this.targetPrototype,
            actionName,
        );

        return this.normalizePath(path || '');
    }

    public getControllerMiddlewares(): Array<any> {
        const middlewares = Reflect.getMetadata(
            CONTROLLER_MIDDLEWARE,
            this.controllerTarget,
        );

        return middlewares || [];
    }
}
