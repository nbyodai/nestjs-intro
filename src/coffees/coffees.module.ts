import { Module } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CoffeesController } from './coffees.controller';

@Module({ controllers: [CoffeesController], providers: [CoffeesService] })
export class CoffeesModule {}
