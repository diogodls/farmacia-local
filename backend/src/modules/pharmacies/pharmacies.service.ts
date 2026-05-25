import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Farmacia } from '../../database/entities/farmacia.entity';
import { PharmacyQueryDto } from './dto/pharmacy-query.dto';

type PharmacyMeta = {
  latitude: number;
  longitude: number;
  phone: string;
  openingHours: string;
  street?: string;
  district?: string;
};

const PHARMACY_META: Record<string, PharmacyMeta> = {
  'FARME - Farmácia Digital RS': {
    latitude: -29.6868,
    longitude: -53.8066,
    phone: '(55) 3222-1001',
    openingHours: 'Seg a Sex, 08h as 18h',
    street: 'Rua do Acampamento, 215',
    district: 'Centro',
  },
  'Farmácia Distrital Estação Dos Ventos': {
    latitude: -29.7214,
    longitude: -53.7174,
    phone: '(55) 3222-1002',
    openingHours: 'Seg a Sab, 07h as 20h',
    street: 'Faixa Nova de Camobi, 1450',
    district: 'Camobi',
  },
  'Farmácia Distrital Floriano Rocha': {
    latitude: -29.6998,
    longitude: -53.8093,
    phone: '(55) 3222-1003',
    openingHours: 'Todos os dias, 08h as 22h',
    street: 'Av. Presidente Vargas, 980',
    district: 'Nossa Senhora de Fatima',
  },
  Kennedy: {
    latitude: -29.7153,
    longitude: -53.8152,
    phone: '(55) 3222-1004',
    openingHours: 'Seg a Sex, 08h as 17h',
    street: 'Av. Medianeira, 1635',
    district: 'Medianeira',
  },
  'Farmácia Distrital Kennedy': {
    latitude: -29.7153,
    longitude: -53.8152,
    phone: '(55) 3222-1004',
    openingHours: 'Seg a Sex, 08h as 17h',
    street: 'Av. Medianeira, 1635',
    district: 'Medianeira',
  },
  'Farmácia Distrital São Francisco': {
    latitude: -29.694,
    longitude: -53.8311,
    phone: '(55) 3222-1005',
    openingHours: 'Seg a Sex, 08h as 17h',
    street: 'Rua Silva Jardim, 1540',
    district: 'São Francisco',
  },
  'Farmácia Municipal Central': {
    latitude: -29.6899,
    longitude: -53.8052,
    phone: '(55) 3222-1006',
    openingHours: 'Seg a Sex, 08h as 18h',
    street: 'Rua Doutor Bozano, 1225',
    district: 'Centro',
  },
};

@Injectable()
export class PharmaciesService {
  constructor(
    @InjectRepository(Farmacia)
    private readonly pharmaciesRepository: Repository<Farmacia>,
  ) {}

  async findAll(query: PharmacyQueryDto = {}) {
    const take = Math.min(query.limit ?? 100, 200);

    const qb = this.pharmaciesRepository
      .createQueryBuilder('farmacia')
      .leftJoinAndSelect('farmacia.instituicao', 'instituicao')
      .leftJoinAndSelect('farmacia.farmaciaMedicamentos', 'farmaciaMedicamento')
      .leftJoinAndSelect('farmaciaMedicamento.medicamento', 'medicamento')
      .orderBy('farmacia.nome', 'ASC')
      .take(take);

    if (query.search) {
      qb.andWhere('farmacia.nome ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.cidade) {
      qb.andWhere('farmacia.cidade ILIKE :cidade', { cidade: query.cidade });
    }

    if (query.medicineId) {
      qb.andWhere('medicamento.id = :medicineId', { medicineId: Number(query.medicineId) });
    }

    const pharmacies = await qb.getMany();
    return pharmacies.map((pharmacy) => this.toFrontendPharmacy(pharmacy));
  }

  async findOne(id: string) {
    const pharmacy = await this.pharmaciesRepository.findOne({
      where: { id: Number(id) },
      relations: {
        instituicao: true,
        farmaciaMedicamentos: {
          medicamento: true,
        },
      },
    });

    if (!pharmacy) {
      throw new NotFoundException('Farmacia nao encontrada.');
    }

    return this.toFrontendPharmacy(pharmacy);
  }

  private toFrontendPharmacy(pharmacy: Farmacia) {
    const meta =
      PHARMACY_META[pharmacy.nome] ??
      ({
        latitude: -29.6842,
        longitude: -53.8069,
        phone: '(55) 0000-0000',
        openingHours: 'Horario nao informado',
      } satisfies PharmacyMeta);

    const medicines = (pharmacy.farmaciaMedicamentos ?? []).map((item) => ({
      id: String(item.medicamento.id),
      name: item.medicamento.principioAtivo,
      category: item.medicamento.componenteAssistencial ?? item.medicamento.tipo,
      dosage: item.medicamento.concentracao ?? 'Nao informado',
      description: item.medicamento.observacao ?? item.medicamento.apresentacao ?? '',
      origem: item.origem,
    }));

    return {
      id: String(pharmacy.id),
      name: pharmacy.nome,
      latitude: meta.latitude,
      longitude: meta.longitude,
      street: pharmacy.endereco ?? meta.street ?? '',
      district: pharmacy.bairro ?? meta.district ?? '',
      city: pharmacy.cidade,
      state: pharmacy.instituicao?.uf ?? 'RS',
      phone: meta.phone,
      openingHours: meta.openingHours,
      medicineIds: medicines.map((medicine) => medicine.id),
      type: pharmacy.tipo,
      institution: pharmacy.instituicao?.nome ?? null,
      medicines,
    };
  }
}
