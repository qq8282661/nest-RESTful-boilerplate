import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Cat } from './cat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Profile)
  @JoinColumn()
  profile: Profile;

  @Column({ nullable: true })
  profileId: string;

  @OneToMany(
    (type) => Cat,
    (cat) => cat.user,
  )
  cat: Cat;
}
