export class Container {
    private static implementationsMap = new Map();

    static register(target: any, implementation: any) {
        this.implementationsMap.set(target, implementation);
    }

    static get(target: any) {
        return this.implementationsMap.get(target);
    }

    static *getGenerator(target: any) {
        const implementations = this.get(target);

        for (const implementation of implementations) {
            yield implementation;
        }
    }

    static hasTargetRegister(target: any) {
        return this.implementationsMap.has(target);
    }
}
