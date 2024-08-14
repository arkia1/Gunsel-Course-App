import { Router } from "express";
import CourseController from "../controllers/courseController";
import * as express from "express-validator";
import courseController from "../controllers/courseController";

const router = Router();

const numeric = express.param("id").isNumeric;

router.get("/", CourseController.getAllClasses);

router.get("/:id", numeric(), CourseController.getCourseById);

router.get("/:id/details", numeric(), CourseController.getCourseWithStudents);

router.post(
  "/",
  express.body("title").isString().notEmpty(),
  express.body("description").isString().optional(),
  CourseController.createCourse
);

router.put(
  "/:id",
  numeric(),
  express.body("name").isString().optional(),
  CourseController.updateCourse
);

router.delete("/:id", numeric(), courseController.deleteCourse);

export default router;
