import { Injector } from '../classes';
import { AppRouter } from '../classes/AppRouter';
import { ControllerMethodsParams } from '../types/enums';
import { ServerConfigsParams } from '../types/enums/ServerConfigsParams';

export function Controller(path: string) {
    const router: any = AppRouter.router;

    return function (target: any) {
        const instance = Injector.inject(target);
        const prototype = Object.getPrototypeOf(instance);
        const [, ..._actionsNames] = Object.getOwnPropertyNames(prototype);

        _actionsNames.forEach((_actionName) => {
            const _method =
                Reflect.getOwnMetadata(
                    _actionName,
                    prototype,
                    ControllerMethodsParams.Method,
                ) ?? '';

            const _middlewares =
                Reflect.getOwnMetadata(
                    _actionName,
                    prototype,
                    ControllerMethodsParams.Middleware,
                ) ?? [];

            const _path =
                Reflect.getOwnMetadata(
                    _actionName,
                    prototype,
                    ControllerMethodsParams.Path,
                ) ?? '';

            router[_method](
                `${path}${_path}`,
                _middlewares,
                instance[_actionName],
            );
        });

        Reflect.defineMetadata(ServerConfigsParams.Router, router, target);
    };
}
