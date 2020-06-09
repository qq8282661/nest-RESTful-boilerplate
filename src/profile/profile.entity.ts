import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  gender: string;

  @Column()
  photo: string;

  @OneToOne(
    (type) => User,
    (user) => user.profile,
  )
  user: User;
}
