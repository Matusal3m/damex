## Decorators

### Used in Classes

```typescript
    @Controller
```

Receives a string indicating the route of the controller.

```typescript
    @GlobalMiddleware
```

Receives an array with all the middleware methods that will be applied to all the methods of the controller.

### Used in Methods

```typescript
    @Get - path: string
    @Post - path: string
    @Put - path: string
    @Patch - path: string
    @Delete - path: string
    @Middleware - Array with methods
```

#### Example

```typescript
@Controller('/users')
@GlobalMiddleware([auth])
export class UsersController {
    constructor() {}

    @Get()
    @Middleware([logger])
    getAll(req: Request, res: Response) {
        res.status(200).send([
            { id: 1, user: 'admin' },
            { id: 2, user: 'default' },
        ]);
    }

    @Get('/:id')
    @Middleware([anotherLogger])
    getById(req: Request, res: Response) {
        console.log('request accepted...');

        res.status(200).send([
            { id: 1, user: 'admin' },
            { id: 2, user: 'default' },
        ]);
    }
}
```

# Warning!
This package doesn't work with dependency injection for now. Because of this, and due to the way the routes are implemented, all services used inside controllers or other services must implement as static methods.
