import { Controller, Get } from '@nestjs/common';

import { CidsService } from './cids.service';

@Controller('cids')
export class CidsController {
  constructor(private readonly cidsService: CidsService) {}

  @Get()
  findAll() {
    return this.cidsService.findAll();
  }
}
