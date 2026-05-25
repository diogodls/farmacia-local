import { Controller, Get, Param, Query } from '@nestjs/common';

import { PharmaciesService } from './pharmacies.service';
import { PharmacyQueryDto } from './dto/pharmacy-query.dto';

@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}

  @Get()
  findAll(@Query() query: PharmacyQueryDto) {
    return this.pharmaciesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmaciesService.findOne(id);
  }
}
