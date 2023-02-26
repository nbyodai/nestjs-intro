import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `this action returns all coffees. limit: ${limit}, offset: ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this action returns ${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
    // action creates a coffee
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `this action updates ${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `this action removes ${id} coffee`;
  }
}
