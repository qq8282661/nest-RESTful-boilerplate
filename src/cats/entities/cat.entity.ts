import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: true })
  age: number;
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
