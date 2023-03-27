import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { PrismaService } from '../prisma-service.service';
import coffeesConfig from './coffees.config';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        {
          provide: getRepositoryToken(Coffee),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: {},
        },
        { provide: COFFEE_BRANDS, useValue: [] },
        { provide: coffeesConfig.KEY, useValue: {} },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
