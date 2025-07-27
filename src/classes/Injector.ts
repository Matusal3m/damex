import { Design } from '../types/enums/Design';

export class Injector {
    static inject(target: any): any {
        const params = Reflect.getMetadata(Design.ParamTypes, target);

        if (!params) {
            return new target();
        }

        const paramsInstances: Array<any> = [];

        for (let i = 0; params.length > i; i++) {
            const hasParams = !!Reflect.getMetadata(
                Design.ParamTypes,
                params[i],
            );

            if (!hasParams) {
                paramsInstances.push(new params[i]());
                continue;
            }

            paramsInstances.push(Injector.inject(params[i]));
        }

        return new target(...paramsInstances);
    }
}
