import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoffeesService } from '../coffees/coffees.service';
import { PrismaModule } from '../database/prisma.module';
import coffeesConfig from './coffees.config';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesRepository } from './coffees.repository';

@Module({
  imports: [ConfigModule.forFeature(coffeesConfig), PrismaModule],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeesRepository,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['tim hortornado', 'starbuckeroo'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
