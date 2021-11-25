import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateTableStudent1637796786932 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'estudantes',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        isUnique: true,
        generationStrategy: 'increment'
      }, {
        name: 'cpf',
        type: 'text',
        isNullable: false,
        isUnique: true
      }, {
        name: 'email',
        type: 'text',
        isNullable: false,
        isUnique: true
      }, {
        name: 'nome',
        type: 'text',
        isNullable: false
      }]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('estudantes')
  }
}
