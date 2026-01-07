import { Router } from '../singleton/router';
import { ControllerReflection } from './controller-reflection';

type Decorator = (target: any) => any;

export const sanitazePath = (path: string): string => {
    path = path.replaceAll(/(\/)+/g, '/');
    if (!path.startsWith('/')) path = `/${path}`;
    return path;
};

export function Controller(controllerPath?: string): Decorator {
    const router = Router.new();

    return target => {
        const instance = {}; // DI.new(target);
        const prototype = Object.getPrototypeOf(instance);
        const actionsNames = Object.getOwnPropertyNames(prototype).filter(
            action => action !== 'constructor',
        );

        const controllerReflection = new ControllerReflection(
            prototype,
            target,
        );

        const classMiddlewares =
            controllerReflection.getControllerMiddlewares();

        router.use(classMiddlewares);

        for (const action of actionsNames) {
            const httpMethod = controllerReflection.getHttpMethod(action);

            if (!httpMethod) return;

            const actionPath = controllerReflection.getPath(action);
            const middlewares =
                controllerReflection.getActionMiddlewares(action);

            router[httpMethod](
                `${controllerPath}${actionPath}`,
                middlewares,
                instance[action].bind(instance),
            );
        }
    };
}
