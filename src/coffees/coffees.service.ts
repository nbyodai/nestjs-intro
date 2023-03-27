import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './coffees.config';
import { PrismaService } from '../prisma-service.service';

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
    private prisma: PrismaService,
  ) {
    console.log(coffeesConfiguration.foo);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.prisma.coffee.findMany({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.prisma.coffee.findUnique({
      where: { id: +id },
      include: {
        flavors: true,
      },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.prisma.coffee.create({
      data: {
        ...createCoffeeDto,
        flavors: {
          connect: flavors.map(({ id }) => ({
            id,
          })),
        },
      },
    });
    return coffee;
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.findOne(id);
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    const flavors = await Promise.all(
      updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    return this.prisma.coffee.update({
      where: { id: coffee.id },
      data: {
        ...updateCoffeeDto,
        flavors: {
          connect: flavors.map(({ id }) => ({
            id,
          })),
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.coffee.delete({ where: { id: +id } });
  }

  // Handling Transactions
  // async recommendCoffee(coffee: Coffee) {
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     coffee.recommendations++;

  //     const recommendEvent = new Event();
  //     recommendEvent.name = 'recommend_coffee';
  //     recommendEvent.type = 'coffee';
  //     recommendEvent.payload = { coffeeId: coffee.id };

  //     await queryRunner.manager.save(coffee);
  //     await queryRunner.manager.save(recommendEvent);

  //     await queryRunner.commitTransaction();
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  private async preloadFlavorByName(name: string): Promise<{ id: number }> {
    const existingFlavor = await this.prisma.flavor.findUnique({
      where: { name },
      include: { coffees: true },
    });
    if (existingFlavor) {
      return { id: existingFlavor.id };
    }

    const newFlavor = await this.prisma.flavor.create({ data: { name } });
    return { id: newFlavor.id };
  }
}
