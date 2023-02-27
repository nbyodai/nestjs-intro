import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'cobiora',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true, // helps load modules automatically instead of specifying the entities array
      synchronize: true, // TypeORM entities syncs with database everytime the app is run, great for development but disable in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
