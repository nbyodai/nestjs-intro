import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './coffees.config';
import { CoffeesRepository } from './coffees.repository';

@Injectable()
export class CoffeesService {
  constructor(
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    @Inject(coffeesConfig.KEY)
    private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,
    private coffeeRepository: CoffeesRepository,
  ) {
    console.log(coffeesConfiguration.foo);
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.findAll({
      offset,
      limit,
    });
  }

  async findOne(id: string) {
    return this.coffeeRepository.findOne(id);
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeRepository.createCoffee(createCoffeeDto);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeRepository.updateCoffee(id, updateCoffeeDto);
  }

  async remove(id: string) {
    return this.coffeeRepository.deleteCoffee(id);
  }
}
