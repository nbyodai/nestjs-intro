import { Module } from '@nestjs/common';
import { CoffessService } from 'src/coffess/coffess.service';
import { CoffeesController } from './coffees.controller';

@Module({ controllers: [CoffeesController], providers: [CoffessService] })
export class CoffeesModule {}
