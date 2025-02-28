import type { RequestHandler } from 'express';
export declare function GlobalMiddleware(handlers: RequestHandler[]): (target: any) => void;
