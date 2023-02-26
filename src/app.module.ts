import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffessService } from './coffess/coffess.service';

@Module({
  imports: [],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffessService],
})
export class AppModule {}
