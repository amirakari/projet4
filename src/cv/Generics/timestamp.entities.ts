import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
export class TimestampEntities {
  @UpdateDateColumn({ update: false })
  upadateAt: Date;
  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
}
