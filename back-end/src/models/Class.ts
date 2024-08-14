import {
  Table,
  Column,
  Model,
  Unique,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Student } from "./Student";

export
@Table({ timestamps: false })
class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  @AllowNull(false)
  @Column
  name!: string;

  @HasMany(() => Student)
  students?: Student[] = [];

  // @Default("")
  // @AllowNull(false)
  // @Column
  // description!: string;

  // @HasMany(() => Course)
  // courses: Course[] = [];
}
