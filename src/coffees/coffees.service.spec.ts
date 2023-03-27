import { Context } from '@hapi/joi';
import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '../database/prisma.service';
import { MockContext, createMockContext } from '../../test/context';

import { CoffeesService } from './coffees.service';
import { CoffeesRepository } from './coffees.repository';

describe('CoffeesService', () => {
  let service: CoffeesService;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoffeesService, { provide: CoffeesRepository, useValue: {} }],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        const coffeeId = '1';
        const expectedCoffee = {};

        const coffee = await service.findOne(coffeeId);
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the NotFound Exception', async () => {
        console.log('hello test');
      });
    });
  });
});
