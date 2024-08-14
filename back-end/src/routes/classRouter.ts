import { Router } from "express";
import ClassController from "../controllers/classController";
import * as express from "express-validator";

const router = Router();

const numeric = express.param("id").isNumeric;

router.get("/", ClassController.getAllClasses);

router.get("/:id", numeric(), ClassController.getClassById);

router.get("/:id/details", numeric(), ClassController.getClassWithStudents);

router.post(
  "/",
  express.body("name").isString().notEmpty(),
  ClassController.createClass
);

router.put(
  "/:id",
  numeric(),
  express.body("name").isString().optional(),
  ClassController.updateClass
);

router.delete("/:id", numeric(), ClassController.deleteClass);

export default router;
