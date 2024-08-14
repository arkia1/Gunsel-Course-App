import { Router } from "express";
import StudentController from "../controllers/studentController";
import * as express from "express-validator";
import studentController from "../controllers/studentController";

const router = Router();

const numeric = express.param("id").isNumeric;

router.get("/", StudentController.getAllStudents);

router.get("/:id", numeric(), StudentController.getStudentById);

router.get("/:id/class", numeric(), StudentController.getStudentClass);

router.post(
  "/",
  express.body("name").isString().notEmpty(),
  express.body("age").isNumeric().notEmpty(),
  express.body("classId").isNumeric().optional(),
  express.body("courses").isArray().optional(),
  StudentController.createStudent
);

router.put(
  "/:id",
  numeric(),
  express.body("name").isString().optional(),
  express.body("age").isNumeric().optional(),
  express.body("classId").isNumeric().optional(),
  express.body("courses").isArray().optional(),
  StudentController.updateStudent
);

router.delete("/:id", numeric(), StudentController.deleteStudent);

export default router;
