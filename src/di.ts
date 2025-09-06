import { Container } from './container';

export class DI {
    static new(target: any): any {
        const params = DI.getParams(target);

        if (!params) {
            return new target();
        }

        const generator = Container.hasTargetRegister(target)
            ? Container.getGenerator(target)
            : null;

        const instantiatedParams = params.map((param) =>
            DI.instantiateAndDIParam(param, generator),
        );

        return new target(...instantiatedParams);
    }

    private static instantiateAndDIParam(
        param: any,
        generator: Generator | null,
    ) {
        if (!param) return;

        const hasParams = DI.getParams(param);

        if (DI.isInterface(param) && generator) {
            const value = generator.next().value;
            return DI.new(value);
        }

        if (hasParams) {
            return DI.new(param);
        }

        return new param();
    }

    private static isInterface(param: any) {
        return param?.constructor.name === 'Function';
    }

    private static getParams(target: any): Array<any> {
        return Reflect.getMetadata('design:paramtypes', target);
    }
}
