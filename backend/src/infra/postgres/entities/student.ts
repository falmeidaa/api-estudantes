import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'estudantes' })
export class PgStudent {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  cpf!: string

  @Column({ unique: true })
  email!: string

  @Column({ name: 'nome' })
  name!: string
}
