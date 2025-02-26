import 'reflect-metadata';

import { Server } from '../src/classes';
import { UsersController } from './controllers';

const server = new Server([UsersController]);

server.start();
