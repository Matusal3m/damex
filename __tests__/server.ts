import { Request, Response } from 'express';
import { Controller, Get, Middleware, Server } from '../src';

@Controller('')
@Middleware([])
class MyController {
    constructor() {}

    @Get('')
    async help(req: Request, res: Response) {
        res.send('<div>oiiii</div>');
    }
}

new Server().start(3333);
