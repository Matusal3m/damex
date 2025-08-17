export class DI {
  static new(target: any): any {
    const params = DI.getParams(target);

    if (!params) {
      return Reflect.construct(target, []);
    }

    const instantiatedParams = params.map(DI.instantiateAndDIParam);

    return Reflect.construct(target, instantiatedParams);
  }

  private static instantiateAndDIParam(param: any) {
    if (!param) return;

    const hasParams = DI.getParams(param);

    if (hasParams) {
      return DI.new(param);
    }

    return Reflect.construct(param, []);
  }

  private static getParams(target: any): Array<any> {
    return Reflect.getMetadata("design:paramtypes", target);
  }
}
