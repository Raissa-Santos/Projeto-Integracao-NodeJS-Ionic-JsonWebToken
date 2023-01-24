import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("conta")
export default class Conta {
  @PrimaryGeneratedColumn("increment") //autoincrement
  id: number;

  @Column()
  email: string;

  @Column()
  senha: string;
}
