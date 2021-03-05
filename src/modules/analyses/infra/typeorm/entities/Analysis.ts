import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import IDocument from '@modules/analyses/types/IDocument';

import { Exclude } from 'class-transformer';

@Entity('analysis')
class Analysis {
  @PrimaryGeneratedColumn('uuid', { name: 'analysis_id' })
  analysisId: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column()
  cpf: string;

  @Column('timestamp with time zone')
  analyzedAt: Date;

  @Column('jsonb')
  documents: IDocument[];

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default Analysis;
