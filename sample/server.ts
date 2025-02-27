import 'reflect-metadata';

import { Server } from '../';
import { UsersController } from './controllers';

const server = new Server([UsersController]);

server.start();
