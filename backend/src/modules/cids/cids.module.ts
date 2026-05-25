import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cid } from '../../database/entities/cid.entity';
import { CidsController } from './cids.controller';
import { CidsService } from './cids.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cid])],
  controllers: [CidsController],
  providers: [CidsService],
})
export class CidsModule {}
