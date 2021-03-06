import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntities } from '../../cv/Generics/timestamp.entities';
import { CvEntity } from '../../cv/entities/cv.entity';
import { UserRoleEnum } from '../../enums/user.role.enum';
@Entity('user')
export class UserEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 50,
    unique: true,
  })
  username: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  password: string;
  @Column()
  salt: string;
  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: string;

  @OneToMany((type) => CvEntity, (cv) => cv.user, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  cvs: CvEntity;
}
