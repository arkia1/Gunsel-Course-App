import { Request } from "express";
import courseService from "../services/courseService";
import { validationResult } from "express-validator";
import { MyResponse } from "../types";

class courseController {
  public getAllClasses = async (_req: Request, res: MyResponse) => {
    try {
      const courses = await courseService.getAllCourses();
      res.status(200).json({ isSuccessful: true, data: courses });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public getCourseById = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const courseData = await courseService.getCourseById(Number(id));
      if (courseData) {
        res.status(200).json({ isSuccessful: true, data: courseData });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Course not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public getCourseWithStudents = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const students = await courseService.getCourseWithStudents(Number(id));
      if (students) {
        res.status(200).json({ isSuccessful: true, data: students });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Course not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public createCourse = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const courseData = req.body;
      const createdcourse = await courseService.createCourse(courseData);
      res.status(201).json({ isSuccessful: true, data: createdcourse });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public updateCourse = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const courseData = req.body;
      const updated = await courseService.updateCourse(Number(id), courseData);
      if (updated) {
        res.status(200).json({ isSuccessful: true });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Course not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public deleteCourse = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const deleted = await courseService.deleteCourse(Number(id));
      if (deleted) {
        res.status(200).json({ isSuccessful: true });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Course not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };
}

export default new courseController();
