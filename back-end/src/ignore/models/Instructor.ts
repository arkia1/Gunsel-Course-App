import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
  BelongsTo,
  Default,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Account } from "./Account";
import { Course } from "./Course";

export
@Table({ timestamps: false })
class Instructor extends Model<
  InferAttributes<Instructor>,
  InferCreationAttributes<Instructor>
> {
  @AllowNull(false)
  @Column
  key!: string;

  @BelongsTo(() => Course)
  course?: Course;

  @ForeignKey(() => Course)
  @Column
  courseId?: number;

  @BelongsTo(() => Account)
  account!: Account;

  @AllowNull(false)
  @ForeignKey(() => Account)
  @Column
  accountId!: number;
}
