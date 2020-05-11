import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ type: 'varchar', nullable: true })
  breed: string;
  @ManyToOne(
    (type) => User,
    (user) => user.cat,
  )
  user: User;
  @Column({ nullable: true })
  userId: string;
}
