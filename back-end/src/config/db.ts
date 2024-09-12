import { Sequelize } from "sequelize-typescript";
//new con
import { Course } from "../models/Course";
import { StudentCourse } from "../models/StudentCourse";
import { Student } from "../models/Student";

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
