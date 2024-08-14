import { Router } from "express";
import classRouter from "./classRouter";
import courseRouter from "./courseRouter";
import studentRouter from "./studentRouter";

const router = Router();

// http://localhost:3000/api/student
router.use("/student", studentRouter);

// http://localhost:3000/api/class
router.use("/class", classRouter);

// http://localhost:3000/api/course
router.use("/course", courseRouter);

export default router;
