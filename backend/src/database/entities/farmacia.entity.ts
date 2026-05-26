import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { FarmaciaMedicamento } from './farmacia-medicamento.entity';
import { Instituicao } from './instituicao.entity';

@Entity({ name: 'farmacia' })
export class Farmacia {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  nome!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo!: string | null;

  @Column({ type: 'text', nullable: true })
  endereco!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  bairro!: string | null;

  @Column({ type: 'varchar', length: 100, default: 'Santa Maria' })
  cidade!: string;

  @Column({ name: 'id_instituicao' })
  idInstituicao!: number;

  @CreateDateColumn({ name: 'criado_em' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  updatedAt!: Date;

  @ManyToOne(() => Instituicao, (instituicao) => instituicao.farmacias, { eager: false })
  @JoinColumn({ name: 'id_instituicao' })
  instituicao!: Instituicao;

  @OneToMany(() => FarmaciaMedicamento, (farmaciaMedicamento) => farmaciaMedicamento.farmacia)
  farmaciaMedicamentos!: FarmaciaMedicamento[];
}
