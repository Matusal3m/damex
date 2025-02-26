import { Controller, Get, Middleware } from '../../src/decorators';
import {
    type NextFunction,
    type Request,
    type RequestHandler,
    type Response,
} from 'express';

const logger: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('logger middleware...');
    next();
};

@Controller('/users')
export class UsersController {
    constructor() {}

    @Get()
    @Middleware([logger])
    getAll(req: Request, res: Response) {
        console.log('request accepted...');

        res.status(200).send([
            { id: 1, user: 'admin' },
            { id: 2, user: 'default' },
        ]);
    }
}
