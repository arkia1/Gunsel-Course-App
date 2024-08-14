import { Request } from "express";
import classService from "../services/classService";
import { validationResult } from "express-validator";
import { MyResponse } from "../types";

class ClassController {
  public getAllClasses = async (_req: Request, res: MyResponse) => {
    try {
      const classes = await classService.getAllClasses();
      res.status(200).json({ isSuccessful: true, data: classes });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public getClassById = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const classData = await classService.getClassById(Number(id));
      if (classData) {
        res.status(200).json({ isSuccessful: true, data: classData });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Class not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public getClassWithStudents = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const students = await classService.getClassWithStudents(Number(id));
      if (students) {
        res.status(200).json({ isSuccessful: true, data: students });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Class not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public createClass = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const classData = req.body;
      const createdClass = await classService.createClass(classData);
      res.status(201).json({ isSuccessful: true, data: createdClass });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public updateClass = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const classData = req.body;
      const updated = await classService.updateClass(Number(id), classData);
      if (updated) {
        res.status(200).json({ isSuccessful: true });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Class not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public deleteClass = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const deleted = await classService.deleteClass(Number(id));
      if (deleted) {
        res.status(200).json({ isSuccessful: true });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Class not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };
}

export default new ClassController();
