import { Injectable } from '@nestjs/common';

import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesRepository } from './coffees.repository';

@Injectable()
export class CoffeesService {
  constructor(private coffeeRepository: CoffeesRepository) {}

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
