import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateContaTable1666363957117 } from "./database/migrations/1666363957117-CreateContaTable";
import Conta from "./models/Conta";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "raissa",
  password: "Senha_123",
  database: "db_aula",
  synchronize: false,
  logging: false,
  entities: [Conta],
  migrations: [CreateContaTable1666363957117],
  subscribers: [],
});
