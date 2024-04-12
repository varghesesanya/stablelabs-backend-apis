import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column({select: false})
  password: string;

  @Column({unique: true})
  walletAddress :  string;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }

}