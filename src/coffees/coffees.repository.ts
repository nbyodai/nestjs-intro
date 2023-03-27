import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { offset: number; limit: number }) {
    const { offset, limit } = params;
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

  async createCoffee(createCoffeeDto: CreateCoffeeDto) {
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

  async updateCoffee(id: string, updateCoffeeDto: UpdateCoffeeDto) {
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

  async deleteCoffee(id) {
    return this.prisma.coffee.delete({ where: { id } });
  }

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
