import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Hobby } from './hobby.entity';

@Entity()
export class UserToHobby {
  @PrimaryGeneratedColumn()
  public userToHobbyId!: number;

  @Column()
  public userId!: string;

  @Column()
  public hobbyId!: string;

  @Column()
  public order!: number;

  @ManyToOne(
    () => User,
    (user) => user.userToHobbies,
  )
  public user!: User;

  @ManyToOne(
    () => Hobby,
    (hobby) => hobby.userToHobbies,
  )
  public hobby!: Hobby;
}
