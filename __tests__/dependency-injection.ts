import { Injector } from '../src';
import 'reflect-metadata';
import { Inject } from '../src/decorators/inject.decorator';

class Foo {
    foo() {
        console.log('foo');
    }
}

@Inject()
class Bar {
    constructor(private foo: Foo) {}

    callFoo() {
        this.foo.foo();
    }
}

@Inject()
class FooBar {
    constructor(
        private foo: Foo,
        private bar: Bar,
    ) {}

    fooBar() {
        console.log('fooBar');
    }
}

describe('dependency injection', () => {
    test('inject Foo into Bar', () => {
        expect(Injector.inject(Bar).callFoo).toBeDefined();
    });

    test('inject Foo and Bar into FooBar', () => {
        const fooBar = Injector.inject(FooBar);
        expect(fooBar.fooBar).toBeDefined();
    });
});
