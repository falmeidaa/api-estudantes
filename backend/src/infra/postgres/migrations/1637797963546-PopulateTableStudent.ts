import { MigrationInterface, QueryRunner } from 'typeorm'

export class PopulateTableStudent1637797963546 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('INSERT INTO estudantes(cpf, email, nome) VALUES' +
    "('11110208090', 'estudant1e@gmail.com', 'Estudante 1'), " +
    "('62453996029', 'estudante2@gmail.com', 'Estudante 2'), " +
    "('69754493090', 'estudante3@gmail.com', 'Estudante 3'), " +
    "('14521867073', 'estudante4@gmail.com', 'Estudante 4'), " +
    "('38641846069', 'estudante5@gmail.com', 'Estudante 5'), " +
    "('38980384084', 'estudante6@gmail.com', 'Estudante 6');")
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager
      .query("DELETE FROM estudantes WHERE email in ('estudant1e@gmail.com', 'estudante2@gmail.com', 'estudante3@gmail.com', 'estudante4@gmail.com', 'estudante5@gmail.com', 'estudante6@gmail.com')")
  }
}
