import { ServerConfigsParams } from '../types/enums';
import express, { type Application, type RequestHandler } from 'express';

export class Server {
    private readonly app: Application;

    constructor() {
        this.app = express();
        this.setupControllers(this.app);
    }

    start(port: number = 3000) {
        this.app.listen(port, () => {
            console.log(`Application running on port ${port} 🟢`);
        });
    }

    use(...handlers: RequestHandler[]) {
        this.app.use(handlers);
    }

    private setupControllers(app: Application) {
        const controllers = Reflect.getMetadata(
            ServerConfigsParams.Controllers,
            Server,
        );

        app.use(express.json());

        controllers.forEach((controller: any) => {
            const router = Reflect.getMetadata(
                ServerConfigsParams.Router,
                controller,
            );
            app.use(router);
        });
    }
}
