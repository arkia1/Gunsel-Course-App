import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Course } from "./Course";
import { StudentCourse } from "./StudentCourse";
import { Class } from "./Class";

export
@Table({ timestamps: false })
class Student extends Model<
  InferAttributes<Student>,
  InferCreationAttributes<Student>
> {
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  age!: number;

  @BelongsToMany(() => Course, () => StudentCourse)
  courses: Array<Course & { StudentCourse: StudentCourse }> = [];

  @BelongsTo(() => Class)
  class: Class | null = null;

  @ForeignKey(() => Class)
  @Column
  classId?: number;
}
