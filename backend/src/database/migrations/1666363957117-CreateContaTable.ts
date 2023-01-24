import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateContaTable1666363957117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Realizar alterações: criar tabela, criar um novo atributo, deletar um atributo
    await queryRunner.createTable(
      new Table({
        name: "conta",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "senha",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Defazer as ações realizadas em UP
    await queryRunner.dropTable("conta");
  }
}
