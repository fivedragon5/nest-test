import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username'])
//배열로 들어가기 때문에 여러개의 값 선언 가능
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

}
