import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { FarmaciaMedicamento } from './farmacia-medicamento.entity';
import { MedicamentoCid } from './medicamento-cid.entity';

@Entity({ name: 'medicamento' })
export class Medicamento {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'principio_ativo', length: 250 })
  principioAtivo!: string;

  @Column({ length: 200, nullable: true })
  concentracao!: string | null;

  @Column({ name: 'forma_farmaceutica', length: 120, nullable: true })
  formaFarmaceutica!: string | null;

  @Column({ type: 'text', nullable: true })
  apresentacao!: string | null;

  @Column({ length: 30 })
  tipo!: string;

  @Column({ name: 'componente_assistencial', length: 80, nullable: true })
  componenteAssistencial!: string | null;

  @Column({ type: 'text', nullable: true })
  observacao!: string | null;

  @Column({ default: true })
  ativo!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => MedicamentoCid, (medicamentoCid) => medicamentoCid.medicamento)
  medicamentoCids!: MedicamentoCid[];

  @OneToMany(() => FarmaciaMedicamento, (farmaciaMedicamento) => farmaciaMedicamento.medicamento)
  farmaciaMedicamentos!: FarmaciaMedicamento[];
}
