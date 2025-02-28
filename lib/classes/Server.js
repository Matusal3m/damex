"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const enums_1 = require("../types/enums");
const express_1 = __importDefault(require("express"));
class Server {
    constructor(controllers) {
        this.controllers = controllers;
        this.app = (0, express_1.default)();
        this.setupControllers();
    }
    start(port = 3000) {
        this.app.listen(port, () => {
            console.log(`Application running on port ${port} 🟢`);
        });
    }
    use(...handlers) {
        this.app.use(handlers);
    }
    setupControllers() {
        this.app.use(express_1.default.json());
        this.controllers.forEach((controller) => {
            const router = Reflect.getOwnMetadata(enums_1.ServerConfigsParams.Router, controller);
            const globalMiddleware = Reflect.getOwnMetadata(enums_1.ServerConfigsParams.GlobalMiddleware, controller);
            if (globalMiddleware) {
                this.app.use(router, globalMiddleware);
                return;
            }
            this.app.use(router);
        });
    }
}
exports.Server = Server;
