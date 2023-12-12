import {
  AutoIncrement,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  last_name: string;

  @Column({ allowNull: true })
  document_type: string;

  @Column({ allowNull: true })
  document_number: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  license_expiration_date: Date;

  @Column({ allowNull: true })
  photo: string;

  @Column({ allowNull: true })
  gender: string;

  @Column({ allowNull: true })
  country: string;

  @Column({ allowNull: true })
  city: string;

  @Column({ allowNull: false })
  id_role: number;

  @Default(1)
  @Column({ allowNull: false })
  id_status: number;

  @Column({ allowNull: true })
  language: string;
}
