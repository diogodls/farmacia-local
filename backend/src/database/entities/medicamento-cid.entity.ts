import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Cid } from './cid.entity';
import { Medicamento } from './medicamento.entity';

@Entity({ name: 'medicamento_cid' })
export class MedicamentoCid {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_medicamento' })
  idMedicamento!: number;

  @Column({ name: 'codigo_cid', length: 10 })
  codigoCid!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @ManyToOne(() => Medicamento, (medicamento) => medicamento.medicamentoCids, { eager: false })
  @JoinColumn({ name: 'id_medicamento' })
  medicamento!: Medicamento;

  @ManyToOne(() => Cid, (cid) => cid.medicamentoCids, { eager: false })
  @JoinColumn({ name: 'codigo_cid', referencedColumnName: 'codigo' })
  cid!: Cid;
}
