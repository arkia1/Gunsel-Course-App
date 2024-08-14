import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";
import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Student } from "./Student";
import { StudentCourse } from "./StudentCourse";

export
@Table({ timestamps: false })
class Course extends Model<
  InferAttributes<Course>,
  InferCreationAttributes<Course>
> {
  @AllowNull(false)
  @Column
  title!: string;

  @Column
  description?: string;

  @BelongsToMany(() => Student, () => StudentCourse)
  students: Array<Student & { StudentCourse: StudentCourse }> = [];

  // @Unique
  // @AllowNull(false)
  // @Column
  // courseCode!: string;

  // @BelongsTo(() => Class)
  // class?: Class;

  // @ForeignKey(() => Class)
  // @Column
  // classId?: number;
}
