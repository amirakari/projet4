import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntities } from '../Generics/timestamp.entities';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('cv')
export class CvEntity extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: number;
  @Column()
  job: string;
  @Column()
  path: string;
  @ManyToOne((type) => UserEntity, (user) => user.cvs, {
    nullable: true
  })
  user: UserEntity;
}
