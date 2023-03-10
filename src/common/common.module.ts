import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key.guard';
import { LogginMiddleware } from './middleware/loggin.middleware';

@Module({
  imports: [ConfigModule],
  providers: [
    // { provide: APP_GUARD, useClass: ApiKeyGuard }
    // commented out because we are using the jwt for guarding
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogginMiddleware).forRoutes('*');
  }
}
