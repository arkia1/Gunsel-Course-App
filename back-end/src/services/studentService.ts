import { Attributes, CreationAttributes } from "sequelize/types/model";
import { Fn, Col, Literal } from "sequelize/types/utils";
import { Student } from "../models/Student";
import { Class } from "../models/Class";
import { Course } from "../models/Course";
import { StudentCourse } from "../models/StudentCourse";

class StudentService {
  public async createStudent(values: CreationAttributes<Student>) {
    const student = await Student.create(values);

    values.courses.forEach(async (element: any) => {
      const course: any = await Course.findOne({
        where: {
          title: element,
        },
      });

      await StudentCourse.create({
        studentId: student.id,
        courseId: course.id,
      });

      console.log(course?.toJSON());
    });

    // console.log(student.toJSON());

    return student;
  }

  public async addStudentToCourse(studentId: number, courseId: number) {
    // return current combination if exists
    const existingCombination = await StudentCourse.findOne({
      where: {
        studentId,
        courseId,
      },
    });

    if (existingCombination) return existingCombination;

    // create new combination and return that

    return await StudentCourse.create({
      studentId,
      courseId,
    });
  }

  public getAllStudents() {
    return Student.findAll({
      include: [
        {
          model: Class,
        },
        {
          model: Course,
        },
      ],
    });
  }

  public getStudentById(id: number) {
    return Student.findByPk(id, {
      include: [Class, Course],
    });
  }

  public getStudentClass(id: number) {
    return Student.findByPk(id, { include: [Class] });
  }

  public async updateStudent(id: number, values: any) {
    const [rowsUpdated] = await Student.update(values, { where: { id } });
    values.courses?.forEach(async (courseId: number) => {
      await this.addStudentToCourse(id, courseId);
    });
    return rowsUpdated === 1;
  }

  public async deleteStudent(id: number) {
    const rowsDeleted = await Student.destroy({ where: { id } });
    return rowsDeleted === 1;
  }
}

export default new StudentService();
