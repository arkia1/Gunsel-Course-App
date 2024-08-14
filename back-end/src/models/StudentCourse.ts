import {
  Table,
  Column,
  Model,
  ForeignKey,
  AllowNull,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Course } from "./Course";
import { Student } from "./Student";

export
@Table({ timestamps: false })
class StudentCourse extends Model<
  InferAttributes<StudentCourse>,
  InferCreationAttributes<StudentCourse>
> {
  @AllowNull(false)
  @ForeignKey(() => Course)
  @Column
  courseId!: number;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column
  studentId!: number;
}
