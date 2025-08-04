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

```typescript
    @Inject
```

Used on classes that required DI. If the class Already has a decorator (as @Controller), the @Inject is not required.

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
    constructor(private userService: UserService) {}

    @Get()
    @Middleware([logger])
    async getAll(req: Request, res: Response) {
        const users = await this.userService.all();

        res.status(200).send(users);
    }

    @Get('/:id')
    @Middleware([anotherLogger])
    async getById(req: Request, res: Response) {
        const users = await this.userService.findById(req.params.id!);

        res.status(200).send(users);
    }
}
```
