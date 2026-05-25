import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { MedicamentoCid } from './medicamento-cid.entity';

@Entity({ name: 'cid' })
export class Cid {
  @PrimaryColumn({ length: 10 })
  codigo!: string;

  @Column({ type: 'text' })
  descricao!: string;

  @Column({ length: 100, nullable: true })
  categoria!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @OneToMany(() => MedicamentoCid, (medicamentoCid) => medicamentoCid.cid)
  medicamentoCids!: MedicamentoCid[];
}
