import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { MedicamentoCid } from './medicamento-cid.entity';

@Entity({ name: 'cid' })
export class Cid {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  codigo!: string;

  @Column({ type: 'text' })
  descricao!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  categoria!: string | null;

  @CreateDateColumn({ name: 'criado_em' })
  createdAt!: Date;

  @OneToMany(() => MedicamentoCid, (medicamentoCid) => medicamentoCid.cid)
  medicamentoCids!: MedicamentoCid[];
}
