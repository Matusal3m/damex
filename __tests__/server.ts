import type { NextFunction, Request, Response } from 'express';
import { Controller, Get, GlobalMiddleware, Middleware, Server } from '../src';

function handle(_req: Request, _res: Response, next: NextFunction) {
    next();
}

@Controller('')
@GlobalMiddleware([handle])
export class MyController {
    constructor() {}

    @Get('')
    @Middleware([handle])
    async help(req: Request, res: Response) {
        res.send('<div>oiiii</div>');
    }
}

new Server().start(3333);
