import 'reflect-metadata';

import { Server } from '@commum/classes';
import { UsersController } from './controllers';

const server = new Server([UsersController]);

server.start();
