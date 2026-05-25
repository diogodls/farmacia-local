import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cid } from '../../database/entities/cid.entity';

@Injectable()
export class CidsService {
  constructor(
    @InjectRepository(Cid)
    private readonly cidsRepository: Repository<Cid>,
  ) {}

  findAll() {
    return this.cidsRepository.find({
      order: {
        codigo: 'ASC',
      },
    });
  }
}
