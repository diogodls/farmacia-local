import { Injectable } from '@nestjs/common';

import { MedicinesService } from './modules/medicines/medicines.service';
import { PharmaciesService } from './modules/pharmacies/pharmacies.service';

@Injectable()
export class AppService {
  constructor(
    private readonly medicinesService: MedicinesService,
    private readonly pharmaciesService: PharmaciesService,
  ) {}

  getHealth() {
    return {
      status: 'ok',
      service: 'pharmacy-backend',
      timestamp: new Date().toISOString(),
    };
  }

  async getBootstrap() {
    const [medicines, pharmacies] = await Promise.all([
      this.medicinesService.findAll({ limit: 500 }),
      this.pharmaciesService.findAll({ limit: 100 }),
    ]);

    return {
      medicines,
      pharmacies,
    };
  }
}
