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
import { Profile } from '../profile/profile.entity';
import { Cat } from '../cat/cat.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class User {
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
  // cascade 是否级联
  @OneToOne((type) => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @RelationId((user: User) => user.profile)
  profileId: string;

  @OneToMany(
    (type) => Cat,
    (cat) => cat.user,
  )
  cats: Cat[];
}
