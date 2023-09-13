import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: false })
  id: number;

  @Column({ length: 20, charset: 'utf8' })
  name: string;

  @Column()
  email: string;

  @Column({ charset: 'utf8' })
  auth0_user_id: string;
}