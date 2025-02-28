import { type RequestHandler } from 'express';
export declare class Server {
    readonly controllers: any[];
    private readonly app;
    constructor(controllers: any[]);
    start(port?: number): void;
    use(...handlers: RequestHandler[]): void;
    private setupControllers;
}
