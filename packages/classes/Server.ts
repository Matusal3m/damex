import { ServerConfigsParams } from '@commum/types/enums/ServerConfigsParams';
import express, { type Application, type RequestHandler } from 'express';

export class Server {
    private readonly app: Application = express();

    constructor(readonly controllers: any[]) {
        this.setupControllers();
    }

    start(port?: number) {
        this.app.listen(port ?? 3000, () => {
            console.log(`Application running on port ${port ?? 3000} 🟢`);
        });
    }

    use(...handlers: RequestHandler[]) {
        this.app.use(handlers);
    }

    private setupControllers() {
        this.controllers.forEach((controller) => {
            const router = Reflect.getOwnMetadata(
                ServerConfigsParams.Router,
                controller
            );

            const globalMiddleware = Reflect.getOwnMetadata(
                ServerConfigsParams.GlobalMiddleware,
                controller
            );

            this.app.use(router, globalMiddleware ?? {});
        });
    }
}
