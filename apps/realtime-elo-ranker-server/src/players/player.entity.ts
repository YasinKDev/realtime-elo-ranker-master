import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryColumn()
  id: string; 

  // Le score ELO 
  @Column({ default: 0 }) 
  rank: number;
}