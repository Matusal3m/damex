import { Injector } from '../src';
import 'reflect-metadata';
import { Inject } from '../src/decorators/injectable.decorator';

class Foo {
    sayHi(name: string) {
        console.log(`Hi, ${name}!`);
    }

    sayCustomGreeting(greeting: string, name: string) {
        console.log(`${greeting}, ${name}!`);
    }
}

class Bar {
    askIfWannaHangOut(name: string) {
        console.log(`${name}, Do you wanna hang out?`);
    }
}

@Inject()
class FooBar {
    private NAMES = ['Lúcio', 'Alberto', 'Fausto', 'Campasiano', 'Benedito'];

    constructor(
        private foo: Foo,
        private bar: Bar,
    ) {}

    askWithRandomName(): void {
        const name = this.getRandomName();
        this.foo.sayCustomGreeting('Hello', name);
        this.bar.askIfWannaHangOut(name);
    }

    private getRandomName(): string {
        const randomIndex = Math.floor(Math.random() * this.NAMES.length);
        return this.NAMES[randomIndex];
    }
}

const foobar = Injector.inject(FooBar);
foobar.askWithRandomName();
