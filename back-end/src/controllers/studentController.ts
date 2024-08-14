import { Request } from "express";
import studentService from "../services/studentService";
import { validationResult } from "express-validator";
import { MyResponse } from "../types";

class StudentController {
  public getAllStudents = async (_req: Request, res: MyResponse) => {
    try {
      const students = await studentService.getAllStudents();
      res.status(200).json({ isSuccessful: true, data: students });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public getStudentById = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const studentData = await studentService.getStudentById(Number(id));
      if (studentData) {
        res.status(200).json({ isSuccessful: true, data: studentData });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Student not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public getStudentClass = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const students = await studentService.getStudentClass(Number(id));
      if (students) {
        res.status(200).json({ isSuccessful: true, data: students });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Student not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public createStudent = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const studentData = req.body;
      const createdStudent = await studentService.createStudent(studentData);
      res.status(201).json({ isSuccessful: true, data: createdStudent });
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public updateStudent = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const studentData = req.body;
      const updated = await studentService.updateStudent(
        Number(id),
        studentData
      );
      if (updated) {
        res.status(200).json({ isSuccessful: true });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Student not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };

  public deleteStudent = async (req: Request, res: MyResponse) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({
          isSuccessful: false,
          errors: result.array().map((error) => error.msg),
        });
      }

      const { id } = req.params;
      const deleted = await studentService.deleteStudent(Number(id));
      if (deleted) {
        res.status(200).json({ isSuccessful: true });
      } else {
        res
          .status(404)
          .json({ isSuccessful: false, errors: ["Student not found"] });
      }
    } catch (error) {
      res
        .status(500)
        .json({ isSuccessful: false, errors: ["Internal server error"] });
    }
  };
}

export default new StudentController();
