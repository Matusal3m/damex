import { ServerConfigsParams } from '../types/enums';
import express, {
    type Express,
    type Application,
    type RequestHandler,
} from 'express';

type HttpClient = express.Application;

export class Server {
    private readonly app: HttpClient;

    constructor(app: HttpClient) {
        this.app = app;
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

    private setupControllers(app: HttpClient) {
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
