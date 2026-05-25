import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Farmacia } from './farmacia.entity';

@Entity({ name: 'instituicao' })
export class Instituicao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  nome!: string;

  @Column({ length: 20 })
  esfera!: string;

  @Column({ length: 2, default: 'RS' })
  uf!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(() => Farmacia, (farmacia) => farmacia.instituicao)
  farmacias!: Farmacia[];
}
