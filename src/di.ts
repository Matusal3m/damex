export class DI {
    static new(target: any): any {
        const params = DI.getParams(target);

        if (!params) {
            return new target();
        }

        const instantiatedParams = params.map(DI.instantiateAndDIParam);

        return new target(...instantiatedParams);
    }

    private static instantiateAndDIParam(param: any) {
        if (!param) return;

        const hasParams = DI.getParams(param);

        if (hasParams) {
            return DI.new(param);
        }

        return new param();
    }

    private static getParams(target: any): Array<any> {
        return Reflect.getMetadata('design:paramtypes', target);
    }
}
