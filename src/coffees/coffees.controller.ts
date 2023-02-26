import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'this action returns all coffees';
  }

  @Get(':id')
  findOne(@Param() params) {
    return `this action returns ${params.id} coffee`;
  }
}
