import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationId,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class Cat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int', default: 0 })
  age: number;

  @Column({ type: 'varchar', default: '' })
  breed: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(
    (type) => User,
    (user) => user.cats,
  )
  user: User;
  @RelationId((cat: Cat) => cat.user)
  userId: string;
}
