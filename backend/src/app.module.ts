import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cid } from './database/entities/cid.entity';
import { Farmacia } from './database/entities/farmacia.entity';
import { FarmaciaMedicamento } from './database/entities/farmacia-medicamento.entity';
import { Instituicao } from './database/entities/instituicao.entity';
import { Medicamento } from './database/entities/medicamento.entity';
import { MedicamentoCid } from './database/entities/medicamento-cid.entity';
import { CidsModule } from './modules/cids/cids.module';
import { MedicinesModule } from './modules/medicines/medicines.module';
import { PharmaciesModule } from './modules/pharmacies/pharmacies.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');

        if (databaseUrl) {
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: false,
          };
        }

        return {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: Number(configService.get<string>('DB_PORT', '5432')),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_NAME', 'farmacia'),
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([
      Instituicao,
      Farmacia,
      Medicamento,
      Cid,
      MedicamentoCid,
      FarmaciaMedicamento,
    ]),
    MedicinesModule,
    PharmaciesModule,
    CidsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
