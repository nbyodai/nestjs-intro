import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LogginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.time('Request-response time');
    console.log('Hi from middleware!');

    req.userPermissions = ['doctor']; // we can bind permissions like this here! the Possibilities!!

    res.on('finish', () => console.timeEnd('Request-response time'));
    next();
  }
}
