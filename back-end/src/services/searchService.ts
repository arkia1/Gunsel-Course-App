import { Student } from "../models/Student";
import { Course } from "../models/Course";
import { Class } from "../models/Class";
import { Op } from "sequelize";

class SearchService {
  public async search(query: string) {
    try {
      // Perform a case-insensitive search across all models
      const students = await Student.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
      });

      const courses = await Course.findAll({
        where: {
          title: {
            [Op.like]: `%${query}%`,
          },
        },
      });

      const classes = await Class.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
      });

      // Add type to each result without altering the original structure
      const typedStudents = students.map((student) => ({
        ...student.get(),
        type: "Student",
      }));

      const typedCourses = courses.map((course) => ({
        ...course.get(),
        type: "Course",
      }));

      const typedClasses = classes.map((cls) => ({
        ...cls.get(),
        type: "Class",
      }));

      return {
        students: typedStudents,
        courses: typedCourses,
        classes: typedClasses,
      };
    } catch (error) {
      throw new Error(`Search failed: ${(error as any).message}`);
    }
  }
}

export default new SearchService();
