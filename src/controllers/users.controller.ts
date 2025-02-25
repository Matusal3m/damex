import { Controller, Get, Middleware } from '@commum/decorators';
import type { NextFunction, Request, RequestHandler, Response } from 'express';

const logger: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('logger middleware...');
};

@Controller('/users')
export class UsersController {
    @Get('/')
    @Middleware([logger])
    getAll(req: Request, res: Response) {
        res.status(200).send([
            { id: 1, user: 'admin' },
            { id: 2, user: 'default' },
        ]);
    }
}
