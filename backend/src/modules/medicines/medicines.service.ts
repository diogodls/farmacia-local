import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Medicamento } from '../../database/entities/medicamento.entity';
import { MedicineQueryDto } from './dto/medicine-query.dto';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly medicinesRepository: Repository<Medicamento>,
  ) {}

  async findAll(query: MedicineQueryDto = {}) {
    const take = Math.min(query.limit ?? 200, 500);

    const qb = this.medicinesRepository
      .createQueryBuilder('medicamento')
      .leftJoinAndSelect('medicamento.medicamentoCids', 'medicamentoCid')
      .leftJoinAndSelect('medicamentoCid.cid', 'cid')
      .leftJoinAndSelect('medicamento.farmaciaMedicamentos', 'farmaciaMedicamento')
      .leftJoinAndSelect('farmaciaMedicamento.farmacia', 'farmacia')
      .leftJoinAndSelect('farmacia.instituicao', 'instituicao')
      .orderBy('medicamento.principioAtivo', 'ASC')
      .take(take);

    if (query.search) {
      qb.andWhere('medicamento.principioAtivo ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.tipo) {
      qb.andWhere('medicamento.tipo ILIKE :tipo', { tipo: query.tipo });
    }

    if (query.componente) {
      qb.andWhere('medicamento.componenteAssistencial ILIKE :componente', {
        componente: `%${query.componente}%`,
      });
    }

    if (query.cid) {
      qb.andWhere('cid.codigo = :cid', { cid: query.cid });
    }

    if (query.activeOnly !== 'false') {
      qb.andWhere('medicamento.ativo = :ativo', { ativo: true });
    }

    const medicines = await qb.getMany();
    return medicines.map((medicine) => this.toFrontendMedicine(medicine));
  }

  async findOne(id: string) {
    const medicine = await this.medicinesRepository.findOne({
      where: { id: Number(id) },
      relations: {
        medicamentoCids: { cid: true },
        farmaciaMedicamentos: { farmacia: { instituicao: true } },
      },
    });

    if (!medicine) {
      throw new NotFoundException('Medicamento nao encontrado.');
    }

    return this.toFrontendMedicine(medicine);
  }

  private toFrontendMedicine(medicine: Medicamento) {
    const cids = (medicine.medicamentoCids ?? []).map((item) => ({
      codigo: item.cid?.codigo ?? item.codigoCid,
      descricao: item.cid?.descricao ?? '',
      categoria: item.cid?.categoria ?? null,
    }));

    const pharmacies = (medicine.farmaciaMedicamentos ?? []).map((item) => ({
      id: String(item.farmacia.id),
      name: item.farmacia.nome,
      city: item.farmacia.cidade,
      state: item.farmacia.instituicao?.uf ?? 'RS',
      district: item.farmacia.bairro ?? '',
      street: item.farmacia.endereco ?? '',
      type: item.farmacia.tipo,
      institution: item.farmacia.instituicao?.nome ?? null,
      origem: item.origem,
    }));

    return {
      id: String(medicine.id),
      name: medicine.principioAtivo,
      category: medicine.componenteAssistencial ?? medicine.tipo,
      dosage: medicine.concentracao ?? 'Nao informado',
      description:
        medicine.observacao ??
        medicine.apresentacao ??
        medicine.formaFarmaceutica ??
        'Medicamento sem descricao detalhada cadastrada.',
      type: medicine.tipo,
      component: medicine.componenteAssistencial,
      pharmaceuticalForm: medicine.formaFarmaceutica,
      presentation: medicine.apresentacao,
      active: medicine.ativo,
      cids,
      pharmacyIds: pharmacies.map((pharmacy) => pharmacy.id),
      pharmacies,
    };
  }
}
