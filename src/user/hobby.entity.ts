import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserToHobby } from './user-to-hobby.entity';
@Entity({ orderBy: { createdAt: 'DESC' } })
export class Hobby {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => UserToHobby,
    (userToHobbies) => userToHobbies.hobby,
  )
  public userToHobbies!: UserToHobby[];
}
