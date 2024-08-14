import { Sequelize } from "sequelize-typescript";
//new con
import { Student } from "../models/Student";
import { Course } from "../models/Course";
import { StudentCourse } from "../models/StudentCourse";

const sequelize = new Sequelize({
  database: "course-app",
  username: "root",
  password: "",
  host: "localhost",
  dialect: "mysql",
  models: [__dirname + "/../models"],
  logging: false,
});

export default sequelize;
