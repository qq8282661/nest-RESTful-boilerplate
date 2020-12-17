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
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Cat } from '../cat/cat.entity';
import { Role } from './role.entity';
import { UserToHobby } from './user-to-hobby.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'bool', nullable: true })
  sex: boolean;

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

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(
    () => UserToHobby,
    (userToHobbies) => userToHobbies.user,
  )
  public userToHobbies!: UserToHobby[];
}
