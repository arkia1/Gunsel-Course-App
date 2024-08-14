import { Table, Column, Model, Unique, AllowNull } from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";

export
@Table({ timestamps: false })
class Account extends Model<
  InferAttributes<Account>,
  InferCreationAttributes<Account>
> {
  @Unique
  @AllowNull(false)
  @Column
  userName!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @AllowNull(false)
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  surname!: string;

  @Column
  bio?: string;

  @Column
  address?: string;

  @Column
  phoneNumber?: string;
}
