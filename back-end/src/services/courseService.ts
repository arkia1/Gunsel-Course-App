// import { Attributes, CreationAttributes } from "sequelize/types/model";
// import { Fn, Col, Literal } from "sequelize/types/utils";
// import { Student } from "../models/Student";
// import { Course } from "../models/Course";
// import { StudentCourse } from "../models/StudentCourse";

// class CourseService {
//   public async createCourse(values: CreationAttributes<Course>) {
//     const course = await Course.create(values);

//     values.students.forEach(async (element: any) => {
//       const student: any = await Student.findOne({
//         where: {
//           name: element,
//         },
//       });

//       await StudentCourse.create({
//         studentId: student.id,
//         courseId: course.id,
//       });

//       // console.log(student?.toJSON());
//     });
//     return course;
//   }

//   public async removeStudentFromCourse(studentId: number, courseId: number){
//     const existingCombination = await StudentCourse.findOne({
//       where: {
//         studentId,
//         courseId,
//       },
//     });

//     if (existingCombination){

//     // destroy combination and return that

//     return await StudentCourse.destroy({
//       studentId,
//       courseId,
//     });
//   }
//   }

//   public getAllCourses() {
//     return Course.findAll();
//   }

//   public getCourseById(id: number) {
//     // return Course.findByPk(id);
//     return Course.findByPk(id, { include: [Student] });
//   }

//   public getCourseWithStudents(id: number) {
//     return Course.findByPk(id, { include: [Student] });
//   }

//   public async updateCourse(
//     id: number,
//     values: any
//     // {
//     //   [key in keyof Attributes<Course>]?:
//     //     | Attributes<Course>[key]
//     //     | Fn
//     //     | Col
//     //     | Literal;
//     // }
//   ) {
//     const [rowsUpdated] = await Course.update(values, { where: { id } });
//     values.students?.forEach(async (studentId: number)=>{
//       await this.removeStudentFromCourse(id, studentId);
//     })
//     return rowsUpdated === 1;
//   }

//   public async deleteCourse(id: number) {
//     const rowsDeleted = await Course.destroy({ where: { id } });
//     return rowsDeleted === 1;
//   }
// }

// export default new CourseService();

import { CreationAttributes } from "sequelize/types/model";
import { Student } from "../models/Student";
import { Course } from "../models/Course";
import { StudentCourse } from "../models/StudentCourse";

class CourseService {
  public async createCourse(values: CreationAttributes<Course>) {
    const course = await Course.create(values);

    // Assign students to the course if provided in the values
    values.students?.forEach(async (element: any) => {
      const student = await Student.findOne({
        where: {
          name: element,
        },
      });

      if (student) {
        await StudentCourse.create({
          studentId: student.id,
          courseId: course.id,
        });
      }
    });

    return course;
  }

  public async removeStudentFromCourse(courseId: number, studentId: number) {
    // Check if the student-course combination exists
    const existingCombination = await StudentCourse.findOne({
      where: {
        courseId,
        studentId,
      },
    });

    // If the combination exists, delete it
    if (existingCombination) {
      const rowsDeleted = await StudentCourse.destroy({
        where: {
          courseId,
          studentId,
        },
      });

      return rowsDeleted === 1;
    }

    return false;
  }

  public getAllCourses() {
    return Course.findAll({
      include: [Student],
    });
  }

  public getCourseById(id: number) {
    return Course.findByPk(id, { include: [Student] });
  }

  public getCourseWithStudents(id: number) {
    return Course.findByPk(id, { include: [Student] });
  }

  public async updateCourse(id: number, values: any) {
    const [rowsUpdated] = await Course.update(values, { where: { id } });

    // Remove specific students from the course if provided in the values
    values.students?.forEach(async (studentId: number) => {
      await this.removeStudentFromCourse(id, studentId);
    });

    return rowsUpdated === 1;
  }

  public async deleteCourse(id: number) {
    const rowsDeleted = await Course.destroy({ where: { id } });
    return rowsDeleted === 1;
  }
}

export default new CourseService();
