import type { RequestHandler } from 'express';
export declare function Middleware(handlers: RequestHandler[]): (target: any, propertyKey: string) => void;
