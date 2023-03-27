import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoffeesService } from 'src/coffees/coffees.service';
import { PrismaService } from 'src/prisma-service.service';
import coffeesConfig from './coffees.config';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';

@Module({
  imports: [ConfigModule.forFeature(coffeesConfig)],
  controllers: [CoffeesController],
  providers: [
    PrismaService,
    CoffeesService,
    {
      provide: COFFEE_BRANDS,
      useFactory: () => ['tim hortornado', 'starbuckeroo'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
