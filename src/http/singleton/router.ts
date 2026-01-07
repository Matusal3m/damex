import express from 'express';

export class Router {
    private static routers: express.Router[] = [];

    public static new() {
        return express.Router();
    }

    public static append(router: express.Router) {
        this.routers.push(router);
    }
}
