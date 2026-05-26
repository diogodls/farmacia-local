import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Farmacia } from './farmacia.entity';
import { Medicamento } from './medicamento.entity';

@Entity({ name: 'farmacia_medicamento' })
export class FarmaciaMedicamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_farmacia' })
  idFarmacia!: number;

  @Column({ name: 'id_medicamento' })
  idMedicamento!: number;

  @Column({ length: 20, default: 'MANUAL' })
  origem!: string;

  @CreateDateColumn({ name: 'criado_em' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  updatedAt!: Date;

  @ManyToOne(() => Farmacia, (farmacia) => farmacia.farmaciaMedicamentos, { eager: false })
  @JoinColumn({ name: 'id_farmacia' })
  farmacia!: Farmacia;

  @ManyToOne(() => Medicamento, (medicamento) => medicamento.farmaciaMedicamentos, { eager: false })
  @JoinColumn({ name: 'id_medicamento' })
  medicamento!: Medicamento;
}
