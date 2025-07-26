import { Injector } from '../src';
import 'reflect-metadata';
import { Inject } from '../src/decorators/injectable.decorator';

class Foo {
    sayHi(name: string) {
        console.log(`Hi, ${name}`);
    }
}

@Inject()
class Bar {
    constructor(private foo: Foo) {}

    askIfWannaHangOut(name: string) {
        this.foo.sayHi(name);
        console.log(`${name}, Do you wanna hang out?`);
    }
}

const bar = Injector.inject(Bar);
bar.askIfWannaHangOut('Matusalém');
