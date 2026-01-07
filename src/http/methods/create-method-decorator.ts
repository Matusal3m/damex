import { CONTROLLER_METHOD, CONTROLLER_PATH } from '../consts';

export function createHttpMethod(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
) {
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
