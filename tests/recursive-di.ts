import { Injector } from '../src';
import 'reflect-metadata';
import { Inject } from '../src/decorators/inject.decorator';

class Foo {
    foo() {
        console.log('foo');
    }
}

class Bar {
    bar() {
        console.log('bar');
    }
}

class FooBar {
    constructor(
        private foo: Foo,
        private bar: Bar,
    ) {}

    fooBar() {
        console.log('fooBar');
    }
}

@Inject()
class FooBarBar {
    constructor(private fooBar: FooBar) {}

    fooBarBar() {
        console.log('fooBarBar');
    }
}

const fooBarBar = Injector.inject(FooBarBar);
fooBarBar.fooBarBar();
