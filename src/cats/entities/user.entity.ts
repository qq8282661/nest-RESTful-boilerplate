import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationId,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Cat } from './cat.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne((type) => Profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  profile: Profile;

  @RelationId((user: User) => user.profile)
  profileId: string;

  @OneToMany(
    (type) => Cat,
    (cat) => cat.user,
  )
  cat: Cat;
}
